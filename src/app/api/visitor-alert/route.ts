import { NextRequest, NextResponse } from "next/server";
import { sendMail, smtpConfigured } from "@/lib/mail";

export const dynamic = "force-dynamic";

const TARGET_EMAIL = process.env.PILOT_NOTIFY_EMAIL || "mirzamailbox0@gmail.com";
const COOLDOWN_MS = 20 * 60 * 1000; // 20 minutes cooldown for standard re-visits
const recentAlerts = new Map<string, number>();

function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  const botRegex =
    /bot|crawler|spider|googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|curl|wget|python|headless|lighthouse|uptime|pingdom|facebookexternalhit|whatsapp|telegrambot|twitterbot|slackbot|discordbot/i;
  return botRegex.test(userAgent);
}

function parseDevice(userAgent: string): string {
  if (!userAgent) return "Unknown Device";
  const isMobile = /mobile|iphone|ipod|android.*mobile|windows phone/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);

  let os = "Unknown OS";
  if (/windows/i.test(userAgent)) os = "Windows";
  else if (/macintosh|mac os x/i.test(userAgent)) os = "macOS";
  else if (/iphone|ipad|ipod/i.test(userAgent)) os = "iOS";
  else if (/android/i.test(userAgent)) os = "Android";
  else if (/linux/i.test(userAgent)) os = "Linux";

  let browser = "Browser";
  if (/edg\//i.test(userAgent)) browser = "Edge";
  else if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
  else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
  else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) browser = "Safari";

  const formFactor = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";
  return `${formFactor} (${os} · ${browser})`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      eventType?: "visit" | "dwell" | "interaction" | "form_intent";
      visitorId?: string;
      visitCount?: number;
      dwellSeconds?: number;
      actionDetail?: string;
      path?: string;
      referrer?: string;
      screen?: string;
    };

    const userAgent = req.headers.get("user-agent") || "";
    if (isBot(userAgent)) {
      return NextResponse.json({ ok: true, ignored: "bot" });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown IP";

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "US";
    const region =
      req.headers.get("x-vercel-ip-country-region") ||
      req.headers.get("cf-region") ||
      "TX";
    const city =
      req.headers.get("x-vercel-ip-city") ||
      req.headers.get("cf-ipcity") ||
      "Dallas–Fort Worth";

    const visitorId = (body.visitorId || "anon").trim();
    const eventType = body.eventType || "visit";
    const visitCount = Number(body.visitCount || 1);
    const dwellSeconds = Number(body.dwellSeconds || 0);
    const actionDetail = body.actionDetail || "";
    const pageVisited = body.path || "/";
    const referrer = body.referrer || "Direct";
    const screenRes = body.screen || "Unknown";
    const device = parseDevice(userAgent);
    const now = Date.now();

    // Check cooldown ONLY for generic repeat visits in the same session
    if (eventType === "visit") {
      const cooldownKey = `${visitorId}_${ip}_visit`;
      const lastVisit = recentAlerts.get(cooldownKey);
      if (lastVisit && now - lastVisit < COOLDOWN_MS) {
        return NextResponse.json({ ok: true, ignored: "cooldown" });
      }
      recentAlerts.set(cooldownKey, now);
    }

    // High-value interactions or dwell milestones bypass or have short cooldown
    if (eventType === "dwell" && dwellSeconds < 30) {
      // Don't report micro bounces
      return NextResponse.json({ ok: true, ignored: "too_short" });
    }

    const shortId = visitorId.slice(0, 8);
    const locationStr = `${city}, ${region} (${country})`;

    // Standard Thread Subject: All events for this visitor ID will stay grouped in this exact thread
    const threadSubject = `[Visitor Radar] #${shortId} · ${locationStr}`;

    let badgeText = "👀 New Visitor";
    let badgeColor = "#2563eb"; // Blue
    let eventSummary = `Landed on page <code>${pageVisited}</code>`;

    if (eventType === "visit" && visitCount > 1) {
      badgeText = `🔄 Returning Visitor (Visit #${visitCount})`;
      badgeColor = "#7c3aed"; // Purple
      eventSummary = `Returned to landing page (Visit #${visitCount}) from <strong>${referrer}</strong>`;
    } else if (eventType === "dwell") {
      const mins = Math.floor(dwellSeconds / 60);
      const secs = dwellSeconds % 60;
      const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      badgeText = `⏱️ Dwell Time Milestone: ${timeStr}`;
      badgeColor = "#059669"; // Emerald
      eventSummary = `Engaged with landing page for <strong>${timeStr}</strong> continuously.`;
    } else if (eventType === "interaction") {
      badgeText = `🎯 Key Interaction`;
      badgeColor = "#ea580c"; // Orange
      eventSummary = `<strong>Action:</strong> ${actionDetail}`;
    } else if (eventType === "form_intent") {
      badgeText = `⚡ High Intent: Opened Application Form`;
      badgeColor = "#dc2626"; // Red
      eventSummary = `Clicked to claim territory zone / open pricing modal: <strong>${actionDetail}</strong>`;
    }

    const formattedDate = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }) + " CT";

    const text = [
      `[Depoii Radar Event: ${badgeText}]`,
      `Visitor ID: ${visitorId}`,
      `Event: ${eventSummary}`,
      `Location: ${locationStr} (IP: ${ip})`,
      `Device: ${device}`,
      `Screen: ${screenRes}`,
      `Referrer: ${referrer}`,
      `Time: ${formattedDate}`,
    ].join("\n");

    const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
        <span style="display: inline-block; background-color: ${badgeColor}; color: #ffffff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">
          ${badgeText}
        </span>
        <span style="font-size: 11px; color: #64748b; font-family: monospace;">ID: #${shortId}</span>
      </div>

      <div style="padding: 12px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
        <p style="margin: 0; font-size: 14px; color: #0f172a; line-height: 1.5;">
          ${eventSummary}
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tbody>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 6px; font-weight: 600; color: #64748b; width: 130px;">Visitor Status</td>
            <td style="padding: 8px 6px; color: #0f172a; font-weight: 600;">
              ${visitCount > 1 ? `Returning Visitor (Visit #${visitCount})` : "First-time visitor"}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 6px; font-weight: 600; color: #64748b;">Location</td>
            <td style="padding: 8px 6px; color: #0f172a;">
              <strong>${locationStr}</strong> <span style="font-size: 11px; color: #94a3b8;">(${ip})</span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 6px; font-weight: 600; color: #64748b;">Device / OS</td>
            <td style="padding: 8px 6px; color: #0f172a;">${device} · ${screenRes}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 6px; font-weight: 600; color: #64748b;">Traffic Origin</td>
            <td style="padding: 8px 6px; color: #0f172a;">${referrer}</td>
          </tr>
          <tr>
            <td style="padding: 8px 6px; font-weight: 600; color: #64748b;">Time (Central)</td>
            <td style="padding: 8px 6px; color: #0f172a;">${formattedDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
    `.trim();

    if (smtpConfigured()) {
      await sendMail({
        to: TARGET_EMAIL,
        subject: threadSubject,
        text,
        html,
        fromName: "Depoii Visitor Radar",
        visitorId, // Binds into single thread
      });
    }

    return NextResponse.json({ ok: true, sent: true });
  } catch (error) {
    console.error("Failed to process visitor alert:", error);
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }
}

