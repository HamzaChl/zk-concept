export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Legal
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Politique de confidentialite
        </h1>
        <p className="text-sm text-gray-600">
          Derniere mise a jour: 20 fevrier 2026
        </p>
      </header>

      <div className="space-y-6 text-sm leading-7 text-gray-700">
        <p>
          ZK Concept collecte uniquement les informations necessaires au
          traitement des demandes transmises via le site (nom, entreprise,
          email, telephone, details de la demande).
        </p>
        <p>
          Ces donnees sont utilisees exclusivement pour repondre aux demandes,
          etablir un contact commercial et assurer le suivi operationnel. Elles
          ne sont pas revendues a des tiers.
        </p>
        <p>
          Vous pouvez demander l'acces, la rectification ou la suppression de
          vos donnees a tout moment a l'adresse: zakaria@zkconcept.be.
        </p>
      </div>
    </section>
  );
}
