import nodemailer from "nodemailer";

export function smtpConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_HOST);
}

export async function sendMail(input: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
  visitorId?: string; // Used for thread conversation binding
}) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error("Email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const headers: Record<string, string> = {};

  // Standard RFC email threading headers to bundle all events for a visitor into one thread
  if (input.visitorId) {
    const threadRootId = `<visitor-${input.visitorId}@depoii.com>`;
    headers["Message-ID"] = `<evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@depoii.com>`;
    headers["In-Reply-To"] = threadRootId;
    headers["References"] = threadRootId;
  }

  await transporter.sendMail({
    from: `"${input.fromName || "Depoii Radar"}" <${smtpUser}>`,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
    headers,
  });
}
