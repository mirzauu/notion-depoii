import { sendMail, smtpConfigured } from "@/lib/mail";

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

    if (smtpConfigured() && notifyTo) {
      try {
        const shortId = visitorId ? `#${visitorId.slice(0, 8)}` : "";
        const locationStr = "Dallas–Fort Worth, TX";

        if (isPartial) {
          // Instant alert in the visitor's thread when email is typed & Next is clicked
          await sendMail({
            to: notifyTo,
            replyTo: email,
            fromName: "Depoii Lead Radar",
            subject: visitorId ? `[Visitor Radar] ${shortId} · ${locationStr}` : `⚡ [Step 1 Lead Captured] ${email}`,
            visitorId: visitorId || undefined, // Threads into the same visitor conversation!
            text: [
              `⚠️ [Step 1 Email Captured] ${email} (${source})`,
              `Visitor ID: ${visitorId || "Unknown"}`,
              `A prospective contractor entered their email and clicked 'Next'.`,
              `If they leave without finishing Step 2, you can follow up with them immediately.`,
              `Email: ${email}`,
              `Timestamp: ${new Date().toISOString()}`,
            ].join("\n"),
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 20px; border: 2px solid #f59e0b; border-radius: 12px; background-color: #fffbeb;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <span style="background-color: #f59e0b; color: #ffffff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                    ⚡ Step 1 Lead Captured (Partial)
                  </span>
                  <span style="font-size: 11px; color: #92400e; font-family: monospace;">ID: ${shortId}</span>
                </div>
                <h3 style="margin: 0 0 8px 0; color: #78350f; font-size: 16px;">
                  Contractor entered email: <a href="mailto:${email}" style="color: #b45309; text-decoration: underline;">${email}</a>
                </h3>
                <p style="margin: 0; font-size: 13px; color: #92400e; line-height: 1.4;">
                  Tier selected: <strong>${source}</strong>. Territory target: <strong>${territory}</strong>.<br/>
                  If this user abandons the form before Step 2, you have their verified email ready for follow-up.
                </p>
              </div>
            `,
          });
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
