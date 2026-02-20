import { Link } from "react-router-dom";
import logoZkWhite from "../assets/logo-zk-w.png";

const quickLinks = [
  { to: "/", label: "Accueil" },
  { to: "/livraison-colis", label: "Livraison colis" },
  { to: "/distribution-presse", label: "Distribution presse" },
  { to: "/gestion-logistique", label: "Gestion logistique" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-[#1f2937] px-4 pb-6 pt-10 text-white md:px-[50px]">
      <div className="relative z-10 border-b border-white/15 pb-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="space-y-3">
            <img
              src={logoZkWhite}
              alt="ZK Concept"
              className="h-8 w-auto object-contain"
            />
            <div className="space-y-1 text-sm text-gray-300">
              <p>zakaria@zkconcept.be</p>
              <p>
                +32 489 39 57 80 <br /> +32 486 92 31 82
              </p>
            </div>
          </div>

          <div className="hidden lg:block" />

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Liens rapides
            </p>
            <nav className="space-y-2">
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

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Mentions légales
            </p>
            <nav className="space-y-2">
              <Link
                to="/politique-de-confidentialite"
                className="block text-sm text-gray-200 transition-colors hover:text-white"
              >
                Politique de confidentialité
              </Link>
              <Link
                to="/mentions-legales"
                className="block text-sm text-gray-200 transition-colors hover:text-white"
              >
                Mentions légales
              </Link>
              <Link
                to="/imprint"
                className="block text-sm text-gray-200 transition-colors hover:text-white"
              >
                Imprint
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2 pt-4 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 ZK Concept. Tous droits reserves.</p>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-28px] left-4 h-[140px] w-[92%] md:left-[50px] md:h-[180px]"
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
