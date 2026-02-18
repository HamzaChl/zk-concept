import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logoZk from "../assets/logo-zk.png";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/flotte", label: "Flotte" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-black" : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b px-4 transition-all duration-300 md:px-[50px] ${
        isScrolled
          ? "border-gray-200/80 bg-white/70 backdrop-blur-xl"
          : "border-transparent bg-white/95"
      }`}
    >
      <div className="relative mx-auto flex h-20 w-full items-center">
        <NavLink to="/" aria-label="ZK Concept - Accueil">
          <img src={logoZk} alt="ZK Concept" className="h-9 w-auto object-contain" />
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="ml-auto hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 md:inline-flex"
        >
          Contact
        </NavLink>

        <button
          type="button"
          className="ml-auto rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {isMenuOpen ? (
        <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="mt-1 inline-flex w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
