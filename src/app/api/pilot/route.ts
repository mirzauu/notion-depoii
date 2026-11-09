import { sendMail, smtpConfigured } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    const email = (body.email || "").trim();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "A valid email is required." }, { status: 400 });
    }

    const isPartial = Boolean(body.isPartial);
    const name = (body.name || (isPartial ? "Partial Lead (Step 1)" : "Commercial Contractor")).trim();
    const company = (body.company || (isPartial ? "Incomplete Form" : "Commercial Roofing Contractor")).trim();
    const territory = (body.territory || "Dallas–Fort Worth, TX").trim();
    const sizeRange = (body.sizeRange || (isPartial ? "Pending Step 2" : "Commercial 25k+ sq ft")).trim();
    const source = (body.source || "Landing Page Cohort Pricing").trim();

    console.log("[pilot] Received submission:", {
      name,
      company,
      email,
      territory,
      sizeRange,
      source,
      isPartial,
      timestamp: new Date().toISOString(),
    });

    const notifyTo = process.env.PILOT_NOTIFY_EMAIL || "mirzamailbox0@gmail.com";

    if (smtpConfigured() && notifyTo) {
      try {
        if (isPartial) {
          // Instant alert when user types email and clicks Next
          await sendMail({
            to: notifyTo,
            replyTo: email,
            fromName: "Depoii Lead Radar",
            subject: `⚡ [Step 1 Lead Captured] ${email} (${source})`,
            text: [
              "⚠️ Partial Lead Captured (Step 1 Submitted)",
              "------------------------------------------",
              "A prospective commercial contractor entered their email and clicked 'Next'.",
              "If they abandon Step 2 without finishing, you can follow up with them immediately.",
              "",
              `Email: ${email}`,
              `Selected Tier: ${source}`,
              `Timestamp: ${new Date().toISOString()}`,
            ].join("\n"),
          });
        } else {
          // Full completion alert
          await sendMail({
            to: notifyTo,
            replyTo: email,
            fromName: "Depoii Pilot",
            subject: `🔥 [Full Pilot Lead] ${email} - ${company} (${territory})`,
            text: [
              "✅ Full Depoii Pilot / Lead Submission Completed",
              "------------------------------------------------",
              `Email: ${email}`,
              `Name: ${name}`,
              `Company: ${company}`,
              `Territory: ${territory}`,
              `Roof sizes: ${sizeRange}`,
              `Source: ${source}`,
              `Submitted at: ${new Date().toISOString()}`,
            ].join("\n"),
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
