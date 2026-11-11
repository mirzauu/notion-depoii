import nodemailer from "nodemailer";

function isLocalHostname(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.split(",")[0]?.trim().toLowerCase() ?? "";
  // Strip IPv6 brackets or :port
  const hostname = host.startsWith("[")
    ? host.slice(1, host.indexOf("]") > -1 ? host.indexOf("]") : undefined)
    : host.split(":")[0];

  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local") ||
    /^192\.168\./.test(hostname) ||
    /^10\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
}

/** Returns true when running in local development or served from a local host. */
export function isLocalRuntime(req?: Request): boolean {
  if (process.env.ENABLE_LOCAL_EMAIL === "true") return false;
  if (process.env.NODE_ENV !== "production") return true;
  if (!req) return false;

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return isLocalHostname(host);
}

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
  if (isLocalRuntime()) {
    return;
  }

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
