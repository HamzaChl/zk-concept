import { Resend } from "resend";

type ContactPayload = {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  monthlyVolume?: string;
  startDate?: string;
  budget?: string;
  message?: string;
};

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message;
  return "Unknown error";
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: ContactPayload = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const required = [
    "fullName",
    "company",
    "email",
    "phone",
    "service",
    "message",
  ] as const;
  for (const key of required) {
    if (!body[key] || String(body[key]).trim() === "") {
      return res.status(400).json({ error: `Missing required field: ${key}` });
    }
  }

  const from = process.env.CONTACT_FROM || "no-reply@zkconcept.be";
  const internalRecipient = "zakaria@zkconcept.be";

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeBody = {
      fullName: escapeHtml(body.fullName || ""),
      company: escapeHtml(body.company || ""),
      email: escapeHtml(body.email || ""),
      phone: escapeHtml(body.phone || ""),
      service: escapeHtml(body.service || ""),
      monthlyVolume: escapeHtml(body.monthlyVolume || "-"),
      startDate: escapeHtml(body.startDate || "-"),
      budget: escapeHtml(body.budget || "-"),
      message: escapeHtml(body.message || "").replace(/\n/g, "<br/>"),
    };

    const internalHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827">
        <h2 style="margin:0 0 16px">Nouvelle demande - Travailler ensemble</h2>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
          <tr><td style="border:1px solid #e5e7eb"><strong>Nom</strong></td><td style="border:1px solid #e5e7eb">${safeBody.fullName}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Societe</strong></td><td style="border:1px solid #e5e7eb">${safeBody.company}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Email</strong></td><td style="border:1px solid #e5e7eb">${safeBody.email}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Telephone</strong></td><td style="border:1px solid #e5e7eb">${safeBody.phone}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Service</strong></td><td style="border:1px solid #e5e7eb">${safeBody.service}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Volume mensuel</strong></td><td style="border:1px solid #e5e7eb">${safeBody.monthlyVolume}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Date de demarrage</strong></td><td style="border:1px solid #e5e7eb">${safeBody.startDate}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Budget</strong></td><td style="border:1px solid #e5e7eb">${safeBody.budget}</td></tr>
          <tr><td style="border:1px solid #e5e7eb"><strong>Message</strong></td><td style="border:1px solid #e5e7eb">${safeBody.message}</td></tr>
        </table>
      </div>
    `;

    const clientHtml = `
      <div style="background:#f3f4f6;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111827">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
          <div style="background:#1f2937;padding:20px 24px;color:#fff">
            <h1 style="margin:0;font-size:22px;letter-spacing:0.5px">ZK Concept</h1>
          </div>
          <div style="padding:24px">
            <h2 style="margin:0 0 12px;font-size:20px">Merci pour votre demande</h2>
            <p style="margin:0 0 12px;line-height:1.6">
              Bonjour ${safeBody.fullName}, nous avons bien recu votre formulaire.
              Notre equipe va traiter votre demande dans les plus brefs delais.
            </p>
            <p style="margin:0 0 18px;line-height:1.6">
              Service demande: <strong>${safeBody.service}</strong>
            </p>
            <div style="margin-top:18px;padding:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px">
              <p style="margin:0 0 6px"><strong>Rappel de vos informations</strong></p>
              <p style="margin:0;line-height:1.6">${safeBody.company} - ${safeBody.email} - ${safeBody.phone}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    await Promise.all([
      resend.emails.send({
        from: `ZK Concept <${from}>`,
        to: [internalRecipient],
        replyTo: body.email,
        subject: `Nouvelle demande - ${body.fullName}`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: `ZK Concept <${from}>`,
        to: [body.email as string],
        subject: "Merci pour votre demande - ZK Concept",
        html: clientHtml,
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (error: unknown) {
    return res.status(500).json({
      error: "Unable to send email",
      details: getErrorMessage(error),
    });
  }
}
