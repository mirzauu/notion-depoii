import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isLocalRuntime, sendMail, smtpConfigured } from "@/lib/mail";

export const dynamic = "force-dynamic";

const TARGET_EMAIL = process.env.PILOT_NOTIFY_EMAIL || "mirzamailbox0@gmail.com";
const COOLDOWN_MS = 15 * 60 * 1000;
const recentAlerts = new Map<string, number>();

// In-memory ring buffer of recent micro actions for quick inspection
interface StoredAction {
  id: string;
  visitorId: string;
  timeOffsetSec: number;
  timeFormatted: string;
  timestamp: string;
  category: string;
  label: string;
  detail?: string;
  location?: string;
  ip?: string;
  path?: string;
}

const actionLogBuffer: StoredAction[] = [];
const DATA_DIR = path.join(process.cwd(), "data");
const LOG_FILE = path.join(DATA_DIR, "visitor_actions.jsonl");

function persistActions(actions: StoredAction[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const lines = actions.map((a) => JSON.stringify(a)).join("\n") + "\n";
    fs.appendFileSync(LOG_FILE, lines, "utf8");
  } catch (err) {
    console.error("Failed to persist visitor action:", err);
  }
}

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

// =========================================================================
// GET: Live Inspection Feed of all visitor actions
// =========================================================================
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const format = url.searchParams.get("format");

  // Read latest records from disk if buffer is empty
  if (actionLogBuffer.length === 0 && fs.existsSync(LOG_FILE)) {
    try {
      const fileContent = fs.readFileSync(LOG_FILE, "utf8");
      const lines = fileContent.trim().split("\n").filter(Boolean);
      for (const line of lines.slice(-200)) {
        try {
          actionLogBuffer.push(JSON.parse(line));
        } catch {}
      }
    } catch {}
  }

  if (format === "json") {
    return NextResponse.json({
      total: actionLogBuffer.length,
      actions: actionLogBuffer.slice().reverse(),
    });
  }

  // Modern HTML Live Feed
  const recentActions = actionLogBuffer.slice().reverse();
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Depoii Radar · Live Visitor Action Stream</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0c0d0e; color: #f1f5f9; margin: 0; padding: 24px; }
        .container { max-width: 980px; margin: 0 auto; }
        .header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid #27272a; margin-bottom: 24px; }
        .title { font-size: 20px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px; }
        .badge { background: #10b981; color: #000; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; }
        .stats { font-size: 13px; color: #94a3b8; }
        .feed { display: flex; flex-direction: column; gap: 10px; }
        .card { background: #18181b; border: 1px solid #27272a; border-radius: 10px; padding: 14px 18px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; transition: border 0.15s; }
        .card:hover { border-color: #3f3f46; }
        .cat { font-size: 10px; text-transform: uppercase; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 4px; }
        .cat-click { background: #3b82f6; color: #fff; }
        .cat-scroll { background: #6366f1; color: #fff; }
        .cat-section { background: #8b5cf6; color: #fff; }
        .cat-input { background: #f59e0b; color: #000; }
        .cat-copy { background: #ec4899; color: #fff; }
        .cat-modal { background: #ef4444; color: #fff; }
        .label { font-size: 14px; font-weight: 600; color: #f8fafc; margin: 0 0 4px 0; }
        .detail { font-size: 12px; color: #a1a1aa; font-family: monospace; }
        .meta { text-align: right; font-size: 11px; color: #71717a; white-space: nowrap; }
        .offset { font-weight: 700; color: #34d399; font-size: 12px; margin-bottom: 2px; }
        .empty { text-align: center; padding: 60px 20px; color: #71717a; }
        a { color: #FF9C6D; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
      <script>
        // Auto refresh every 5 seconds
        setTimeout(() => window.location.reload(), 5000);
      </script>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div>
            <div class="title">
              <span>🎯 Depoii Radar</span>
              <span class="badge">LIVE STREAM</span>
            </div>
            <div class="stats" style="margin-top: 4px;">
              Auto-updating every 5s · <a href="/">← Return to landing page</a> · <a href="?format=json">View JSON</a>
            </div>
          </div>
          <div class="meta" style="text-align: right;">
            <div style="font-size: 15px; font-weight: 700; color: #fff;">${recentActions.length} Actions</div>
            <div>Persisted in data/visitor_actions.jsonl</div>
          </div>
        </div>

        <div class="feed">
          ${
            recentActions.length === 0
              ? '<div class="empty">No visitor actions recorded yet. Open the landing page, click around, and refresh!</div>'
              : recentActions
                  .map((act) => {
                    const catClass = `cat cat-${act.category || "click"}`;
                    return `
                    <div class="card">
                      <div>
                        <span class="${catClass}">${act.category}</span>
                        <div class="label">${escapeHtml(act.label)}</div>
                        ${act.detail ? `<div class="detail">↳ ${escapeHtml(act.detail)}</div>` : ""}
                      </div>
                      <div class="meta">
                        <div class="offset">${act.timeFormatted || "+00s"}</div>
                        <div>#${act.visitorId?.slice(0, 8) || "anon"}</div>
                        <div style="color: #52525b;">${new Date(act.timestamp).toLocaleTimeString()}</div>
                      </div>
                    </div>
                  `;
                  })
                  .join("")
          }
        </div>
      </div>
    </body>
  </html>
  `;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =========================================================================
// POST: Record Micro-Actions & Send Milestone Lead Alerts
// =========================================================================
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
      actions?: Array<{
        id: string;
        timeOffsetSec: number;
        timeFormatted: string;
        timestamp: string;
        category: string;
        label: string;
        detail?: string;
      }>;
    };

    const userAgent = req.headers.get("user-agent") || "";
    if (isBot(userAgent)) {
      return NextResponse.json({ ok: true, ignored: "bot" });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

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
    const locationStr = `${city}, ${region} (${country})`;

    // 1. Process and Store Micro-Actions
    const incomingActions = body.actions || [];
    const storedBatch: StoredAction[] = [];

    // If a single action detail was sent without array, wrap it
    if (incomingActions.length === 0 && body.actionDetail) {
      incomingActions.push({
        id: `act_${Date.now()}`,
        timeOffsetSec: Number(body.dwellSeconds || 0),
        timeFormatted: `+${body.dwellSeconds || 0}s`,
        timestamp: new Date().toISOString(),
        category: body.eventType === "form_intent" ? "modal" : "click",
        label: body.actionDetail,
      });
    }

    for (const act of incomingActions) {
      const storedItem: StoredAction = {
        ...act,
        visitorId,
        location: locationStr,
        ip,
        path: body.path || "/",
      };
      storedBatch.push(storedItem);
      actionLogBuffer.push(storedItem);
      if (actionLogBuffer.length > 300) {
        actionLogBuffer.shift();
      }
    }

    if (storedBatch.length > 0) {
      persistActions(storedBatch);
    }

    // 2. Decide whether to dispatch an Email Alert
    const eventType = body.eventType || "interaction";
    const visitCount = Number(body.visitCount || 1);
    const dwellSeconds = Number(body.dwellSeconds || 0);
    const now = Date.now();

    // Check cooldown ONLY for generic repeat visits in the same session
    if (eventType === "visit") {
      const cooldownKey = `${visitorId}_${ip}_visit`;
      const lastVisit = recentAlerts.get(cooldownKey);
      if (lastVisit && now - lastVisit < COOLDOWN_MS) {
        return NextResponse.json({ ok: true, stored: storedBatch.length, ignored: "cooldown" });
      }
      recentAlerts.set(cooldownKey, now);
    }

    const isHighIntent =
      eventType === "form_intent" ||
      body.actionDetail?.includes("Start free trial") ||
      body.actionDetail?.includes("Get a demo") ||
      body.actionDetail?.includes("Typed in email") ||
      storedBatch.some(
        (a) =>
          a.category === "input" ||
          a.label.includes("Start free trial") ||
          a.label.includes("Get a demo")
      );

    // Only email on high intent or significant dwell milestones
    if (!isHighIntent && eventType !== "visit" && (eventType !== "dwell" || dwellSeconds < 45)) {
      return NextResponse.json({ ok: true, stored: storedBatch.length, sent: false });
    }

    const shortId = visitorId.slice(0, 8);
    const threadSubject = `[Visitor Radar] #${shortId} · ${locationStr}`;

    let badgeText = "👀 New Visitor";
    let badgeColor = "#2563eb"; // Blue
    let eventSummary = `Landed on page <code>${body.path || "/"}</code>`;

    if (isHighIntent) {
      badgeText = `⚡ High Intent: User Interaction`;
      badgeColor = "#dc2626"; // Red
      eventSummary = `High-intent action detected: <strong>${escapeHtml(body.actionDetail || "Engaged with trial / demo CTA")}</strong>`;
    } else if (eventType === "visit" && visitCount > 1) {
      badgeText = `🔄 Returning Visitor (Visit #${visitCount})`;
      badgeColor = "#7c3aed";
      eventSummary = `Returned to landing page (Visit #${visitCount}) from <strong>${body.referrer || "Direct"}</strong>`;
    } else if (eventType === "dwell") {
      badgeText = `⏱️ Dwell Time Milestone: ${dwellSeconds}s`;
      badgeColor = "#059669";
      eventSummary = `Active on landing page for <strong>${dwellSeconds}s</strong> continuously.`;
    }

    // Format Chronological Action Trail Table
    const recentVisitorActions = actionLogBuffer
      .filter((a) => a.visitorId === visitorId)
      .slice(-15);

    const actionRowsHtml =
      recentVisitorActions.length > 0
        ? recentVisitorActions
            .map(
              (a) => `
          <tr style="border-bottom: 1px solid #f1f5f9; font-size: 12px;">
            <td style="padding: 6px 8px; font-weight: 700; color: #059669; font-family: monospace; white-space: nowrap;">
              ${a.timeFormatted}
            </td>
            <td style="padding: 6px 8px; color: #0f172a;">
              <strong>${escapeHtml(a.label)}</strong>
              ${a.detail ? `<div style="color: #64748b; font-size: 11px;">↳ ${escapeHtml(a.detail)}</div>` : ""}
            </td>
          </tr>`
            )
            .join("")
        : `<tr><td colspan="2" style="padding: 8px; color: #94a3b8; font-style: italic;">No earlier actions recorded in this session.</td></tr>`;

    const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
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

      <!-- Action Trail Timeline -->
      <div style="margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
          Chronological Micro-Action Trail (${recentVisitorActions.length} actions)
        </div>
        <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
          <tbody>
            ${actionRowsHtml}
          </tbody>
        </table>
      </div>

      <!-- Visitor Details -->
      <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
        <tbody>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 6px 8px; font-weight: 600; color: #64748b; width: 130px;">Visitor Status</td>
            <td style="padding: 6px 8px; color: #0f172a; font-weight: 600;">
              ${visitCount > 1 ? `Returning Visitor (Visit #${visitCount})` : "First-time visitor"}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 6px 8px; font-weight: 600; color: #64748b;">Location</td>
            <td style="padding: 6px 8px; color: #0f172a;">
              <strong>${locationStr}</strong> <span style="font-size: 11px; color: #94a3b8;">(${ip})</span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 6px 8px; font-weight: 600; color: #64748b;">Device / Screen</td>
            <td style="padding: 6px 8px; color: #0f172a;">${parseDevice(userAgent)} · ${body.screen || "Unknown"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 8px; font-weight: 600; color: #64748b;">Live Radar Feed</td>
            <td style="padding: 6px 8px; color: #0f172a;"><a href="http://localhost:3001/api/visitor-alert" style="color: #FF9C6D; text-decoration: underline;">Open Live Action Stream →</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    `.trim();

    const text = [
      `[Depoii Radar: ${badgeText}]`,
      `Visitor ID: ${visitorId}`,
      `Event: ${body.actionDetail || eventSummary}`,
      `Location: ${locationStr}`,
      `Actions Recorded: ${recentVisitorActions.length}`,
    ].join("\n");

    if (smtpConfigured() && !isLocalRuntime(req)) {
      await sendMail({
        to: TARGET_EMAIL,
        subject: threadSubject,
        text,
        html,
        fromName: "Depoii Visitor Radar",
        visitorId,
      });
    }

    return NextResponse.json({ ok: true, stored: storedBatch.length, sent: true });
  } catch (error) {
    console.error("Failed to process visitor actions:", error);
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
  }
}
