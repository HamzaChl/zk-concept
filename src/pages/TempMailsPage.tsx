import {
  buildClientEmailHtml,
  buildInternalEmailHtml,
  sanitizeContactPayload,
} from "../lib/mailTemplates";

const sampleData = sanitizeContactPayload({
  fullName: "Jean Dupont",
  company: "ZK Logistics",
  email: "jean.dupont@exemple.com",
  phone: "+32 489 39 57 80 | +32 486 92 31 82",
  service: "Livraison de colis",
  monthlyVolume: "1200 livraisons / mois",
  startDate: "2026-03-15",
  budget: "6 000 EUR / mois",
  message:
    "Bonjour,\nNous cherchons un partenaire fiable pour nos livraisons en Belgique, avec un demarrage rapide.",
});

const internalHtml = buildInternalEmailHtml(sampleData);
const clientHtml = buildClientEmailHtml(sampleData, {
  logoUrl: "/logo-zk.png",
  privacyUrl: "https://zkconcept.be/privacy",
  legalUrl: "https://zkconcept.be/mentions-legales",
  companyEmail: "zakaria@zkconcept.be",
  companyPhone: "+32 489 39 57 80 | +32 486 92 31 82",
});

export default function TempMailsPage() {
  return (
    <div className="space-y-8 pt-6">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">Temp Mails Preview</h1>
        <p className="max-w-3xl text-sm text-gray-600">
          Cette page affiche les templates HTML actuellement utilises pour
          l&apos;envoi des emails. Toute modification visuelle ici impacte aussi
          les emails reels envoyes par `/api/contact`.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">Email Client</h2>
          <iframe
            title="Preview email client"
            srcDoc={clientHtml}
            className="h-[720px] w-full rounded-xl border border-gray-200 bg-white"
          />
        </article>

        <article className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">Email Interne</h2>
          <iframe
            title="Preview email interne"
            srcDoc={internalHtml}
            className="h-[720px] w-full rounded-xl border border-gray-200 bg-white"
          />
        </article>
      </section>
    </div>
  );
}
