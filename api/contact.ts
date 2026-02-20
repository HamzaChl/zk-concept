import { Resend } from "resend";
import {
  buildClientEmailHtml,
  buildInternalEmailHtml,
  sanitizeContactPayload,
} from "../src/lib/mailTemplates";
import type { ContactPayload } from "../src/lib/mailTemplates";

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

const formatResendError = (value: unknown): string => {
  if (!value) return "Unknown Resend error";
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message;
  if (typeof value === "object" && "message" in value) {
    return String((value as { message?: unknown }).message || "Resend error");
  }
  return "Resend error";
};

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
  const internalRecipient =
    process.env.CONTACT_INTERNAL_TO ||
    process.env.CONTACT_COMPANY_EMAIL ||
    "zakaria@zkconcept.be";
  const logoUrl = process.env.CONTACT_LOGO_URL || "https://zkconcept.be/logo-zk.png";
  const privacyUrl = process.env.CONTACT_PRIVACY_URL || "https://zkconcept.be/privacy";
  const legalUrl = process.env.CONTACT_LEGAL_URL || "https://zkconcept.be/mentions-legales";
  const companyEmail = process.env.CONTACT_COMPANY_EMAIL || "zakaria@zkconcept.be";
  const companyPhone =
    process.env.CONTACT_COMPANY_PHONE || "+32 489 39 57 80 | +32 486 92 31 82";

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeBody = sanitizeContactPayload(body);
    const internalHtml = buildInternalEmailHtml(safeBody);
    const clientHtml = buildClientEmailHtml(safeBody, {
      logoUrl,
      privacyUrl,
      legalUrl,
      companyEmail,
      companyPhone,
    });

    const internalResult = await resend.emails.send({
      from: `ZK Concept <${from}>`,
      to: [internalRecipient],
      replyTo: body.email,
      subject: `Nouvelle demande - ${body.fullName}`,
      html: internalHtml,
    });

    if (internalResult.error) {
      return res.status(502).json({
        error: "Internal email failed",
        details: formatResendError(internalResult.error),
      });
    }

    const clientResult = await resend.emails.send({
      from: `ZK Concept <${from}>`,
      to: [body.email as string],
      subject: "Merci pour votre demande - ZK Concept",
      html: clientHtml,
    });

    if (clientResult.error) {
      return res.status(502).json({
        error: "Client confirmation email failed",
        details: formatResendError(clientResult.error),
      });
    }

    return res.status(200).json({
      ok: true,
      internalId: internalResult.data?.id ?? null,
      clientId: clientResult.data?.id ?? null,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      error: "Unable to send email",
      details: getErrorMessage(error),
    });
  }
}
