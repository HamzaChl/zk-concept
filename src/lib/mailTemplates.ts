export type ContactPayload = {
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

export type MailTemplateOptions = {
  logoUrl?: string;
  privacyUrl?: string;
  legalUrl?: string;
  companyEmail?: string;
  companyPhone?: string;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const sanitizeContactPayload = (body: ContactPayload) => ({
  fullName: escapeHtml(body.fullName || ""),
  company: escapeHtml(body.company || ""),
  email: escapeHtml(body.email || ""),
  phone: escapeHtml(body.phone || ""),
  service: escapeHtml(body.service || ""),
  monthlyVolume: escapeHtml(body.monthlyVolume || "-"),
  startDate: escapeHtml(body.startDate || "-"),
  budget: escapeHtml(body.budget || "-"),
  message: escapeHtml(body.message || "").replace(/\n/g, "<br/>"),
});

export const buildInternalEmailHtml = (safeBody: ReturnType<typeof sanitizeContactPayload>) => `
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

export const buildClientEmailHtml = (
  safeBody: ReturnType<typeof sanitizeContactPayload>,
  options: MailTemplateOptions = {},
) => {
  const logoBlock = options.logoUrl
    ? `<img src="${options.logoUrl}" alt="ZK Concept" style="height:34px;width:auto;display:block" />`
    : `<h1 style="margin:0;font-size:22px;letter-spacing:0.5px">ZK Concept</h1>`;

  const privacyUrl = options.privacyUrl || "#";
  const legalUrl = options.legalUrl || "#";
  const companyEmail = options.companyEmail || "zakaria@zkconcept.be";
  const companyPhone =
    options.companyPhone || "+32 489 39 57 80 | +32 486 92 31 82";

  return `
  <div style="background:#f3f4f6;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111827">
    <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:#f0f4f8;padding:20px 24px;color:#111827;border-bottom:1px solid #e5e7eb">
        ${logoBlock}
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
      <div style="background:#1f2937;color:#d1d5db;padding:16px 24px">
        <p style="margin:0 0 8px;font-size:12px;line-height:1.6">
          ${companyEmail} - ${companyPhone}
        </p>
        <p style="margin:0;font-size:12px;line-height:1.6">
          <a href="${privacyUrl}" style="color:#f3f4f6;text-decoration:underline">Politique de confidentialite</a>
          &nbsp;•&nbsp;
          <a href="${legalUrl}" style="color:#f3f4f6;text-decoration:underline">Mentions legales</a>
        </p>
      </div>
    </div>
  </div>
`;
};
