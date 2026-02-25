import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

export default function LegalNoticePage() {
  const { t } = useTranslation();
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
          {t("legal.kicker")}
        </p>
        <h1 className="legal-hero-anim text-3xl font-semibold text-gray-900 md:text-4xl">
          {t("legal.legalNotice.title")}
        </h1>
        <p className="legal-hero-anim text-sm text-gray-600">{t("legal.updatedAt")}</p>
      </header>

      <div className="space-y-5 text-sm leading-7 text-gray-700">
        <p className="legal-reveal-item">
          <strong>{t("legal.labels.publisher")}</strong> ZK Concept
        </p>
        <p className="legal-reveal-item">
          <strong>{t("legal.labels.address")}</strong> Romeinsesteenweg 200,
          1800 Vilvoorde, Belgique
        </p>
        <p className="legal-reveal-item">
          <strong>{t("legal.labels.email")}</strong> zakaria@zkconcept.be
        </p>
        <p className="legal-reveal-item">
          <strong>{t("legal.labels.phone")}</strong> +32 489 39 57 80 | +32 486
          92 31 82
        </p>
        <p className="legal-reveal-item">{t("legal.legalNotice.description1")}</p>
        <p className="legal-reveal-item">{t("legal.legalNotice.description2")}</p>
      </div>
    </section>
  );
}
