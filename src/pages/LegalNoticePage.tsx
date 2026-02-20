export default function LegalNoticePage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Legal
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Mentions legales
        </h1>
      </header>

      <div className="space-y-5 text-sm leading-7 text-gray-700">
        <p>
          <strong>Editeur:</strong> ZK Concept
        </p>
        <p>
          <strong>Adresse:</strong> Romeinsesteenweg 200, 1800 Vilvoorde,
          Belgique
        </p>
        <p>
          <strong>Email:</strong> zakaria@zkconcept.be
        </p>
        <p>
          <strong>Telephone:</strong> +32 489 39 57 80 | +32 486 92 31 82
        </p>
        <p>
          Le site presente les activites de ZK Concept en livraison de colis,
          distribution de presse et coordination logistique.
        </p>
      </div>
    </section>
  );
}
