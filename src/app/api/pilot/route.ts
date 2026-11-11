import { isLocalRuntime, sendMail, smtpConfigured } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const email = (typeof body.email === "string" ? body.email : "").trim();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "A valid email is required." }, { status: 400 });
    }

    const visitorId = (typeof body.visitorId === "string" ? body.visitorId : "").trim();
    const isPartial = Boolean(body.isPartial);
    const name = (typeof body.name === "string" ? body.name : isPartial ? "Partial Lead (Step 1)" : "Commercial Contractor").trim();
    const company = (typeof body.company === "string" ? body.company : isPartial ? "Incomplete Form" : "Commercial Roofing Contractor").trim();
    const territory = (typeof body.territory === "string" ? body.territory : "Dallas–Fort Worth, TX").trim();
    const sizeRange = (typeof body.sizeRange === "string" ? body.sizeRange : isPartial ? "Pending Step 2" : "Commercial 25k+ sq ft").trim();
    const source = (typeof body.source === "string" ? body.source : "Landing Page Cohort Pricing").trim();

    console.log("[pilot] Received submission:", {
      visitorId,
      name,
      company,
      email,
      territory,
      sizeRange,
      source,
      isPartial,
      timestamp: new Date().toISOString(),
    });

    const notifyTo = process.env.PILOT_NOTIFY_EMAIL || "";

    if (!isLocalRuntime(req) && smtpConfigured() && notifyTo) {
      try {
        const shortId = visitorId ? `#${visitorId.slice(0, 8)}` : "";
        const locationStr = "Dallas–Fort Worth, TX";

        const isDemo = source.toLowerCase().includes("demo");

        if (isPartial) {
          // Instant alert in the visitor's thread when email is typed
          await sendMail({
            to: notifyTo,
            replyTo: email,
            fromName: "Depoii Lead Radar",
            subject: visitorId ? `[Visitor Radar] ${shortId} · ${locationStr}` : `⚡ [Step 1 Lead Captured] ${email}`,
            visitorId: visitorId || undefined, // Threads into the same visitor conversation!
            text: [
              `⚠️ [Email Captured] ${email} (${source})`,
              `Visitor ID: ${visitorId || "Unknown"}`,
              `A contractor typed their email into the ${isDemo ? "Live Demo Preview Modal" : "Application Form"}.`,
              `Follow up immediately: ${email}`,
              `Timestamp: ${new Date().toISOString()}`,
            ].join("\n"),
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; border: 2px solid #f59e0b; border-radius: 12px; background-color: #fffbeb;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <span style="background-color: #f59e0b; color: #ffffff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                    ${isDemo ? "⚡ Demo Email Captured" : "⚡ Step 1 Lead Captured (Partial)"}
                  </span>
                  <span style="font-size: 11px; color: #92400e; font-family: monospace;">ID: ${shortId}</span>
                </div>
                <h3 style="margin: 0 0 8px 0; color: #78350f; font-size: 16px;">
                  Contractor entered email: <a href="mailto:${email}" style="color: #b45309; text-decoration: underline;">${email}</a>
                </h3>
                <p style="margin: 0; font-size: 13px; color: #92400e; line-height: 1.4;">
                  Source: <strong>${source}</strong>.<br/>
                  Contractor typed this into the ${isDemo ? "Navbar Live Demo modal" : "cohort checkout"}. Reach out to lock in their walkthrough.
                </p>
              </div>
            `,
          });
        } else if (isDemo) {
          // Specialized High-Value Live Demo Request Alert
          await sendMail({
            to: notifyTo,
            replyTo: email,
            fromName: "Depoii Demo Radar",
            subject: visitorId ? `[Visitor Radar] ${shortId} · ${locationStr}` : `🎯 [Live Demo Request] ${email}`,
            visitorId: visitorId || undefined,
            text: [
              `🎯 [Live Demo Request] ${email}`,
              `Origin: Navbar Software Preview Modal`,
              `Territory Zone: ${territory}`,
              `Visitor ID: ${visitorId}`,
              `Contractor Promise: Our team will contact you in 24 hours.`,
              `Submitted: ${new Date().toISOString()}`,
            ].join("\n"),
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 22px; border: 2px solid #FF9C6D; border-radius: 14px; background-color: #ffffff;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px;">
                  <span style="background-color: #191918; color: #ffffff; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: inline-flex; items-center; gap: 6px;">
                    🎯 Live Demo Requested (24hr SLA)
                  </span>
                  <span style="font-size: 11px; color: #6b7280; font-family: monospace;">ID: ${shortId}</span>
                </div>
                <h2 style="margin: 0 0 10px 0; color: #111827; font-size: 20px;">
                  Contractor requested a live software walkthrough
                </h2>
                <p style="margin: 0 0 16px 0; font-size: 14px; color: #4b5563; line-height: 1.5;">
                  The contractor viewed the Depoii software preview in the modal and submitted their email. They have been informed: <strong>"Our team will contact you in 24 hours."</strong>
                </p>
                <div style="background-color: #fafaf9; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <tbody>
                      <tr>
                        <td style="padding: 6px 0; color: #6b7280; font-weight: 600; width: 130px;">Email:</td>
                        <td style="padding: 6px 0; color: #111827;"><a href="mailto:${email}" style="color: #111827; font-weight: 700; text-decoration: underline;">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Target Territory:</td>
                        <td style="padding: 6px 0; color: #111827; font-weight: 600;">Dallas–Fort Worth, TX (12,400+ roofs)</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Lockout Status:</td>
                        <td style="padding: 6px 0; color: #b45309; font-weight: 600;">Held for 24 Hours</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #6b7280; font-weight: 600;">Follow-up Window:</td>
                        <td style="padding: 6px 0; color: #047857; font-weight: 700;">Within 24 Hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                  Depoii Commercial Intelligence System · Automated territory alert
                </p>
              </div>
            `,
          });

          // Send confirmation to the applicant
          try {
            await sendMail({
              to: email,
              replyTo: notifyTo,
              fromName: "Depoii Team",
              subject: "Depoii Live Demo Request Confirmed",
              text: [
                `Hello,`,
                ``,
                `Thank you for requesting a live walkthrough of the Depoii Commercial Roofing Intelligence platform.`,
                ``,
                `We have received your request for ${email}. A Dallas–Fort Worth commercial intelligence specialist will contact you within 24 hours to schedule your walkthrough and verify unpermitted reroof opportunities in your primary territory corridor.`,
                ``,
                `Your corridor lockout availability is temporarily held for 24 hours.`,
                ``,
                `Best regards,`,
                `The Depoii Team`,
                `hello@depoii.com`,
              ].join("\n"),
            });
          } catch (replyErr) {
            console.warn("[pilot] Could not send confirmation to user:", replyErr);
          }
        } else {
          // Full completion alert (also nested in the same thread!)
          await sendMail({
            to: notifyTo,
            replyTo: email,
            fromName: "Depoii Pilot",
            subject: visitorId ? `[Visitor Radar] ${shortId} · ${locationStr}` : `🔥 [Full Pilot Lead] ${email} - ${company}`,
            visitorId: visitorId || undefined,
            text: [
              `🔥 [Full Pilot Lead] ${email} - ${company} (${territory})`,
              `Name: ${name}`,
              `Company: ${company}`,
              `Territory Zone: ${territory}`,
              `Roof sizes: ${sizeRange}`,
              `Source: ${source}`,
              `Visitor ID: ${visitorId}`,
              `Submitted: ${new Date().toISOString()}`,
            ].join("\n"),
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; border: 2px solid #10b981; border-radius: 12px; background-color: #ecfdf5;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <span style="background-color: #10b981; color: #ffffff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                    🔥 Full Application Submitted
                  </span>
                  <span style="font-size: 11px; color: #065f46; font-family: monospace;">ID: ${shortId}</span>
                </div>
                <h2 style="margin: 0 0 12px 0; color: #064e3b; font-size: 18px;">
                  ${company} — ${name}
                </h2>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tbody>
                    <tr><td style="padding: 6px 0; font-weight: 600; color: #047857; width: 120px;">Email:</td><td style="padding: 6px 0; color: #064e3b;"><strong>${email}</strong></td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 600; color: #047857;">Territory Zone:</td><td style="padding: 6px 0; color: #064e3b;">${territory}</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 600; color: #047857;">Roof Sizes:</td><td style="padding: 6px 0; color: #064e3b;">${sizeRange}</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 600; color: #047857;">Plan Choice:</td><td style="padding: 6px 0; color: #064e3b;">${source}</td></tr>
                  </tbody>
                </table>
              </div>
            `,
          });

          // Send confirmation to the applicant
          try {
            await sendMail({
              to: email,
              replyTo: notifyTo,
              fromName: "Depoii Team",
              subject: "Your Depoii Territory Access Request",
              text: [
                `Hello ${name || "there"},`,
                ``,
                `Thank you for requesting territory access to Depoii for ${territory}.`,
                ``,
                `To protect contractor margins and lead exclusivity, Depoii caps active workspace access to a maximum of 2 commercial contractors per DFW territory zone.`,
                ``,
                `Our team has received your request and is checking availability for your bidding area. We will follow up with you within 1 business day.`,
                ``,
                `Best regards,`,
                `The Depoii Team`,
                `https://depoii.com`,
              ].join("\n"),
            });
          } catch (replyErr) {
            console.warn("[pilot] Could not send confirmation to user:", replyErr);
          }
        }
      } catch (mailErr) {
        console.error("[pilot] Mail sending error:", mailErr);
      }
    }

    return Response.json({ ok: true, message: "Submission processed successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process request.";
    console.error("[pilot] Error handling submission:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
