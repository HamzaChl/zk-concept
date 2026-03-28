import { useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HoverLabel({ text }: { text: string }) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  const chars = Array.from(text);

  const animate = (to: number) => {
    if (!rootRef.current) return;
    const topChars = rootRef.current.querySelectorAll<HTMLElement>(".top-char");
    const bottomChars = rootRef.current.querySelectorAll<HTMLElement>(".bottom-char");
    gsap.to(topChars, {
      yPercent: to,
      duration: 0.36,
      stagger: 0.016,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(bottomChars, {
      yPercent: to,
      duration: 0.36,
      stagger: 0.016,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <span
      ref={rootRef}
      className="relative block h-[1.15em] overflow-hidden"
      aria-label={text}
      onMouseEnter={() => animate(-100)}
      onMouseLeave={() => animate(0)}
    >
      <span className="pointer-events-none block whitespace-pre">
        {chars.map((char, index) => (
          <span
            key={`top-${index}-${char}`}
            className="top-char inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="pointer-events-none absolute inset-0 translate-y-full whitespace-pre">
        {chars.map((char, index) => (
          <span
            key={`bottom-${index}-${char}`}
            className="bottom-char inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const subtleUnderlineClass =
    "relative block w-fit text-[18px] leading-tight text-gray-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-gray-500/70 after:transition-transform after:duration-300 hover:after:scale-x-100";
  const quickLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/livraison-colis", label: t("nav.parcelDelivery") },
    { to: "/distribution-presse", label: t("nav.pressDistribution") },
    { to: "/gestion-logistique", label: t("nav.logisticsManagement") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-white px-4 pt-8 text-gray-900 md:px-[50px]">
      <div className="border-t border-gray-300/80 pt-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={`footer-link-${link.to}`}
                to={link.to}
                className={subtleUnderlineClass}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <a
              href="mailto:hamza@zkconcept.be"
              className={subtleUnderlineClass}
            >
              hamza@zkconcept.be
            </a>
            <a
              href="mailto:zakaria@zkconcept.be"
              className={subtleUnderlineClass}
            >
              zakaria@zkconcept.be
            </a>
            <a
              href="tel:+32489395780"
              className={subtleUnderlineClass}
            >
              +32 489 39 57 80
            </a>
            <a
              href="tel:+32486923182"
              className={subtleUnderlineClass}
            >
              +32 486 92 31 82
            </a>
          </div>

          <div className="space-y-4">
            <nav className="space-y-2 text-[18px] leading-tight">
              <Link
                to="/politique-de-confidentialite"
                className="block w-fit text-gray-900 transition-colors hover:text-black"
              >
                <HoverLabel text={t("footer.privacyPolicy")} />
              </Link>
              <Link
                to="/mentions-legales"
                className="block w-fit text-gray-900 transition-colors hover:text-black"
              >
                <HoverLabel text={t("footer.legalNotice")} />
              </Link>
              <Link
                to="/imprint"
                className="block w-fit text-gray-900 transition-colors hover:text-black"
              >
                <HoverLabel text={t("footer.imprint")} />
              </Link>
            </nav>
            <p className="pt-4 text-[15px] leading-tight text-gray-500 md:text-[16px]">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-12 h-[170px] md:h-[230px]">
        <p className="pointer-events-none absolute bottom-[-8px] left-0 w-full select-none whitespace-nowrap text-center text-[19vw] font-bold uppercase leading-none tracking-[-0.03em] text-gray-900/35 md:bottom-[-14px] md:text-[15vw]">
          ZK Concept
        </p>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent md:h-24"
        />
      </div>
    </footer>
  );
}
