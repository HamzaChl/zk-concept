export type ContactPayload = {
  formType?: "contact" | "devis" | "work_together";
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  service?: string;
  monthlyVolume?: string;
  startDate?: string;
  budget?: string;
  message?: string;
  role?: string;
  activitySector?: string;
  averageWeight?: string;
  packageType?: string;
  pickupAddress?: string;
  deliveryArea?: string;
  city?: string;
  postalCode?: string;
  frequency?: string;
  urgency?: string;
  pickupWindow?: string;
  deliveryWindow?: string;
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
  formType: body.formType || "work_together",
  fullName: escapeHtml(body.fullName || ""),
  company: escapeHtml(body.company || ""),
  email: escapeHtml(body.email || ""),
  phone: escapeHtml(body.phone || ""),
  subject: escapeHtml(body.subject || ""),
  service: escapeHtml(body.service || ""),
  monthlyVolume: escapeHtml(body.monthlyVolume || "-"),
  startDate: escapeHtml(body.startDate || "-"),
  budget: escapeHtml(body.budget || "-"),
  message: escapeHtml(body.message || "").replace(/\n/g, "<br/>"),
  role: escapeHtml(body.role || "-"),
  activitySector: escapeHtml(body.activitySector || "-"),
  averageWeight: escapeHtml(body.averageWeight || "-"),
  packageType: escapeHtml(body.packageType || "-"),
  pickupAddress: escapeHtml(body.pickupAddress || "-"),
  deliveryArea: escapeHtml(body.deliveryArea || "-"),
  city: escapeHtml(body.city || "-"),
  postalCode: escapeHtml(body.postalCode || "-"),
  frequency: escapeHtml(body.frequency || "-"),
  urgency: escapeHtml(body.urgency || "-"),
  pickupWindow: escapeHtml(body.pickupWindow || "-"),
  deliveryWindow: escapeHtml(body.deliveryWindow || "-"),
});

const row = (label: string, value: string) =>
  `<tr><td style="border:1px solid #e5e7eb;background:#f9fafb"><strong>${label}</strong></td><td style="border:1px solid #e5e7eb">${value}</td></tr>`;

const buildMailShell = (
  title: string,
  bodyHtml: string,
  options: MailTemplateOptions = {},
) => {
  const logoBlock = options.logoUrl
    ? `<img src="${options.logoUrl}" alt="ZK Concept" style="height:34px;width:auto;display:block" />`
    : `<h1 style="margin:0;font-size:22px;letter-spacing:0.5px">ZK Concept</h1>`;
  const privacyUrl =
    options.privacyUrl || "https://zkconcept.be/politique-de-confidentialite";
  const legalUrl =
    options.legalUrl || "https://zkconcept.be/mentions-legales";
  const companyEmail = options.companyEmail || "zakaria@zkconcept.be";
  const companyPhone =
    options.companyPhone || "+32 489 39 57 80 | +32 486 92 31 82";

  return `
  <div style="background:#f3f4f6;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111827">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:#f0f4f8;padding:20px 24px;color:#111827;border-bottom:1px solid #e5e7eb">
        ${logoBlock}
      </div>
      <div style="padding:24px">
        <h2 style="margin:0 0 14px;font-size:20px">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="background:#1f2937;color:#d1d5db;padding:16px 24px">
        <p style="margin:0 0 8px;font-size:12px;line-height:1.6">
          ${companyEmail} - ${companyPhone}
        </p>
        <p style="margin:0;font-size:12px;line-height:1.6">
          <a href="${privacyUrl}" style="color:#f3f4f6;text-decoration:underline">Politique de confidentialité</a>
          &nbsp;•&nbsp;
          <a href="${legalUrl}" style="color:#f3f4f6;text-decoration:underline">Mentions légales</a>
        </p>
      </div>
    </div>
  </div>
`;
};

export const buildInternalEmailHtml = (
  safeBody: ReturnType<typeof sanitizeContactPayload>,
  options: MailTemplateOptions = {},
) => {
  if (safeBody.formType === "contact") {
    return buildMailShell(
      "Nouveau message - Page Contact",
      `
      <p style="margin:0 0 14px;line-height:1.6;color:#374151">
        Un nouveau message a ete soumis depuis la page Contact.
      </p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${row("Nom", safeBody.fullName)}
        ${row("Email", safeBody.email)}
        ${row("Sujet", safeBody.subject || safeBody.service)}
        ${row("Message", safeBody.message)}
      </table>
      `,
      options,
    );
  }

  if (safeBody.formType === "devis") {
    return buildMailShell(
      "Nouvelle demande de devis",
      `
      <p style="margin:0 0 14px;line-height:1.6;color:#374151">
        Une nouvelle demande de devis detaillee à ete soumise.
      </p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
        ${row("Nom", safeBody.fullName)}
        ${row("Société", safeBody.company)}
        ${row("Fonction", safeBody.role)}
        ${row("Secteur d'activite", safeBody.activitySector)}
        ${row("Email", safeBody.email)}
        ${row("Telephone", safeBody.phone)}
        ${row("Service", safeBody.service)}
        ${row("Volume mensuel", safeBody.monthlyVolume)}
        ${row("Poids moyen", safeBody.averageWeight)}
        ${row("Type de colis", safeBody.packageType)}
        ${row("Adresse de collecte", safeBody.pickupAddress)}
        ${row("Zone de livraison", safeBody.deliveryArea)}
        ${row("Ville", safeBody.city)}
        ${row("Code postal", safeBody.postalCode)}
        ${row("Frequence", safeBody.frequency)}
        ${row("Urgence", safeBody.urgency)}
        ${row("Creneau collecte", safeBody.pickupWindow)}
        ${row("Creneau livraison", safeBody.deliveryWindow)}
        ${row("Date de démarrage", safeBody.startDate)}
        ${row("Budget", safeBody.budget)}
        ${row("Message", safeBody.message)}
      </table>
      `,
      options,
    );
  }

  return buildMailShell(
    "Nouvelle demande - Travailler ensemble",
    `
    <p style="margin:0 0 14px;line-height:1.6;color:#374151">
      Une nouvelle demande à ete soumise depuis la page Travailler ensemble.
    </p>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      ${row("Nom", safeBody.fullName)}
      ${row("Société", safeBody.company)}
      ${row("Email", safeBody.email)}
      ${row("Telephone", safeBody.phone)}
      ${row("Service", safeBody.service)}
      ${row("Volume mensuel", safeBody.monthlyVolume)}
      ${row("Date de démarrage", safeBody.startDate)}
      ${row("Budget", safeBody.budget)}
      ${row("Message", safeBody.message)}
    </table>
    `,
    options,
  );
};

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
          Notre équipe va traiter votre demande dans les plus brefs délais.
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
          <a href="${privacyUrl}" style="color:#f3f4f6;text-decoration:underline">Politique de confidentialité</a>
          &nbsp;•&nbsp;
          <a href="${legalUrl}" style="color:#f3f4f6;text-decoration:underline">Mentions légales</a>
        </p>
      </div>
    </div>
  </div>
`;
};
