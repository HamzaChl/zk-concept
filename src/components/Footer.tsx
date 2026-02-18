import { Link } from "react-router-dom";
import logoZkWhite from "../assets/logo-zk-w.png";

const quickLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/flotte", label: "Flotte" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#1f2937] px-[50px] pb-8 pt-14 text-white">
      <div className="relative z-10 grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <img
            src={logoZkWhite}
            alt="ZK Concept"
            className="h-10 w-auto object-contain"
          />
          <div className="space-y-2 text-sm text-gray-300">
            <p>contact@zkconcept.com</p>
            <p>+33 6 00 00 00 00</p>
          </div>
          <button
            type="button"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
          >
            Demarrer un projet
          </button>
        </div>

        <div className="space-y-4 lg:justify-self-end">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Liens rapides
          </p>
          <nav className="space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={`right-${link.to}`}
                to={link.to}
                className="block text-sm text-gray-200 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3 pt-6 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 ZK Concept. Tous droits reserves.</p>
        <p>Politique de confidentialite • Mentions legales</p>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-28px] left-[50px] h-[140px] w-[92%] md:h-[180px]"
        viewBox="0 0 1600 240"
        preserveAspectRatio="xMinYMid meet"
      >
        <text
          x="0"
          y="200"
          fill="rgba(255,255,255,0.06)"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="170"
          fontWeight="700"
          letterSpacing="8"
        >
          ZKCONCEPT
        </text>
      </svg>
    </footer>
  );
}
