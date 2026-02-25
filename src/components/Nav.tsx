import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import logoZk from "../assets/logo-zk.png";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/livraison-colis", label: "Livraison colis" },
  { to: "/distribution-presse", label: "Distribution presse" },
  { to: "/gestion-logistique", label: "Gestion logistique" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.95, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return;

    const panel = mobileMenuRef.current;
    const items = panel.querySelectorAll(".mobile-menu-item");

    gsap.fromTo(
      panel,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
    );

    gsap.fromTo(
      items,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.08 },
    );
  }, [isMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex pb-1.5 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-[#6b7280] after:transition-transform after:duration-300 ${
      isActive
        ? "text-black after:scale-x-100"
        : "text-gray-500 after:scale-x-0 hover:text-gray-900 hover:after:scale-x-100"
    }`;

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 border-b px-4 transition-all duration-300 min-[1070px]:px-[50px] ${
        isScrolled
          ? "border-gray-200/80 bg-white/70 backdrop-blur-xl"
          : "border-transparent bg-white/95"
      }`}
    >
      <div className="relative mx-auto flex h-20 w-full items-center">
        <NavLink to="/" aria-label="ZK Concept - Accueil">
          <img
            src={logoZk}
            alt="ZK Concept"
            className="h-9 w-auto object-contain"
          />
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 min-[1070px]:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="ml-auto hidden rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 min-[1070px]:inline-flex"
        >
          Contact
        </NavLink>

        <button
          type="button"
          className="ml-auto rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 min-[1070px]:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {isMenuOpen ? (
        <div
          ref={mobileMenuRef}
          className="mb-3 min-h-[70vh] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm min-[1070px]:hidden"
        >
          <nav className="flex min-h-[calc(70vh-3rem)] flex-col justify-between">
            <div className="flex flex-col pt-4">
              {links.map((link, index) => (
                <div key={link.to} className="mobile-menu-item py-4">
                  {index > 0 ? (
                    <span className="mb-4 block h-px w-[86%] bg-gray-200" />
                  ) : null}
                  <NavLink
                    to={link.to}
                    className={`${linkClass} w-fit text-lg`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="mobile-menu-item border-t border-gray-200 pt-6">
              <NavLink
                to="/contact"
                className="inline-flex w-fit rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
