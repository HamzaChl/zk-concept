import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PrivacyPolicyPage() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".legal-hero-anim",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
      );

      gsap.fromTo(
        ".legal-reveal-item",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.15,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="mx-auto max-w-4xl space-y-8 py-12">
      <header className="space-y-3">
        <p className="legal-hero-anim text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Legal
        </p>
        <h1 className="legal-hero-anim text-3xl font-semibold text-gray-900 md:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="legal-hero-anim text-sm text-gray-600">
          Dernière mise à jour: 20 février 2026
        </p>
      </header>

      <div className="space-y-6 text-sm leading-7 text-gray-700">
        <p className="legal-reveal-item">
          ZK Concept collecte uniquement les informations nécessaires au
          traitement des demandes transmises via les formulaires du site: nom,
          entreprise, email, téléphone et détails du besoin.
        </p>
        <p className="legal-reveal-item">
          Ces données sont utilisees exclusivement pour répondre aux demandes,
          etablir un contact commercial et assurer le suivi opérationnel. Elles
          ne sont ni revendues ni louées à des tiers.
        </p>
        <p className="legal-reveal-item">
          Le site n'utilise pas de collecte cachée de données personnelles à des
          fins de profilage. Les informations sont fournies volontairement par
          l'utilisateur lorsqu'il remplit un formulaire.
        </p>
        <p className="legal-reveal-item">
          Vous pouvez demander l'accès, la rectification ou la suppression de
          vos données à tout moment à l'adresse: zakaria@zkconcept.be.
        </p>
        <p className="legal-reveal-item">
          En cas de mise à jour importante de cette politique, la date de
          revision sera modifiée sur cette page.
        </p>
      </div>
    </section>
  );
}
