import { useTranslation } from "react-i18next";
import {
  buildClientEmailHtml,
  buildInternalEmailHtml,
  sanitizeContactPayload,
} from "../lib/mailTemplates";

const sampleWorkTogether = sanitizeContactPayload({
  formType: "work_together",
  fullName: "Jean Dupont",
  company: "ZK Logistics",
  email: "jean.dupont@exemple.com",
  phone: "+32 489 39 57 80 | +32 486 92 31 82",
  service: "Livraison de colis",
  monthlyVolume: "1200 livraisons / mois",
  startDate: "2026-03-15",
  budget: "6 000 EUR / mois",
  message:
    "Bonjour,\nNous cherchons un partenaire fiable pour nos livraisons en Belgique, avec un démarrage rapide.",
});

const sampleContact = sanitizeContactPayload({
  formType: "contact",
  fullName: "Sophie Martin",
  company: "Demande via page Contact",
  email: "sophie.martin@exemple.com",
  phone: "+32 489 39 57 80 | +32 486 92 31 82",
  subject: "Demande d'information",
  service: "Contact - Demande d'information",
  message: "Bonjour, je souhaite etre recontactee pour discuter de vos services.",
});

const sampleDevis = sanitizeContactPayload({
  formType: "devis",
  fullName: "Marc Leroy",
  company: "FastRetail SA",
  email: "marc.leroy@fastretail.be",
  phone: "+32 471 00 11 22",
  role: "Responsable logistique",
  activitySector: "E-commerce",
  service: "Livraison de colis",
  monthlyVolume: "2400",
  averageWeight: "2.8 kg",
  packageType: "Standard",
  pickupAddress: "Rue Exemple 12, Bruxelles",
  deliveryArea: "Belgique",
  city: "Bruxelles",
  postalCode: "1000",
  frequency: "quotidien",
  urgency: "prioritaire",
  pickupWindow: "08:00 - 11:00",
  deliveryWindow: "09:00 - 18:00",
  startDate: "2026-04-01",
  budget: "7500 EUR / mois",
  message: "Nous cherchons un partenaire pour absorber un volume croissant.",
});

const internalWorkTogetherHtml = buildInternalEmailHtml(sampleWorkTogether, {
  logoUrl: "/logo-zk.png",
  privacyUrl: "https://zkconcept.be/politique-de-confidentialite",
  legalUrl: "https://zkconcept.be/mentions-legales",
  companyEmail: "zakaria@zkconcept.be",
  companyPhone: "+32 489 39 57 80 | +32 486 92 31 82",
});
const internalContactHtml = buildInternalEmailHtml(sampleContact, {
  logoUrl: "/logo-zk.png",
  privacyUrl: "https://zkconcept.be/politique-de-confidentialite",
  legalUrl: "https://zkconcept.be/mentions-legales",
  companyEmail: "zakaria@zkconcept.be",
  companyPhone: "+32 489 39 57 80 | +32 486 92 31 82",
});
const internalDevisHtml = buildInternalEmailHtml(sampleDevis, {
  logoUrl: "/logo-zk.png",
  privacyUrl: "https://zkconcept.be/politique-de-confidentialite",
  legalUrl: "https://zkconcept.be/mentions-legales",
  companyEmail: "zakaria@zkconcept.be",
  companyPhone: "+32 489 39 57 80 | +32 486 92 31 82",
});
const clientHtml = buildClientEmailHtml(sampleWorkTogether, {
  logoUrl: "/logo-zk.png",
  privacyUrl: "https://zkconcept.be/privacy",
  legalUrl: "https://zkconcept.be/mentions-legales",
  companyEmail: "zakaria@zkconcept.be",
  companyPhone: "+32 489 39 57 80 | +32 486 92 31 82",
});

export default function TempMailsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 pt-6">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">{t("tempMails.title")}</h1>
        <p className="max-w-3xl text-sm text-gray-600">{t("tempMails.description")}</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">{t("tempMails.clientEmail")}</h2>
          <iframe
            title="Preview email client"
            srcDoc={clientHtml}
            className="h-[720px] w-full rounded-xl border border-gray-200 bg-white"
          />
        </article>

        <article className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("tempMails.internalWorkTogether")}
          </h2>
          <iframe
            title="Preview email interne travailler ensemble"
            srcDoc={internalWorkTogetherHtml}
            className="h-[720px] w-full rounded-xl border border-gray-200 bg-white"
          />
        </article>

        <article className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">{t("tempMails.internalContact")}</h2>
          <iframe
            title="Preview email interne contact"
            srcDoc={internalContactHtml}
            className="h-[720px] w-full rounded-xl border border-gray-200 bg-white"
          />
        </article>

        <article className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">{t("tempMails.internalQuote")}</h2>
          <iframe
            title="Preview email interne devis"
            srcDoc={internalDevisHtml}
            className="h-[720px] w-full rounded-xl border border-gray-200 bg-white"
          />
        </article>
      </section>
    </div>
  );
}
