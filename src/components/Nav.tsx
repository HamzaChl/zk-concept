import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import logoZk from "../assets/logo-zk.png";

export default function Nav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavReady, setIsNavReady] = useState(pathname !== "/");
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/livraison-colis", label: t("nav.parcelDelivery") },
    { to: "/distribution-presse", label: t("nav.pressDistribution") },
    { to: "/gestion-logistique", label: t("nav.logisticsManagement") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setIsNavReady(true);
      return;
    }

    setIsNavReady(false);
    const handleHeroIntroDone = () => setIsNavReady(true);
    window.addEventListener("hero-intro-complete", handleHeroIntroDone);
    return () =>
      window.removeEventListener("hero-intro-complete", handleHeroIntroDone);
  }, [pathname]);

  useEffect(() => {
    if (!navRef.current) return;
    if (!isNavReady) {
      gsap.set(navRef.current, { y: -90, opacity: 0, autoAlpha: 0 });
      return;
    }

    gsap.fromTo(
      navRef.current,
      { y: -90, opacity: 0, autoAlpha: 1 },
      { y: 0, opacity: 1, autoAlpha: 1, duration: 0.75, ease: "power3.out" },
    );
  }, [isNavReady]);

  useEffect(() => {
    if (!navRef.current || !isNavReady) return;

    gsap.set(navRef.current, {
      y: 0,
      opacity: 1,
      width: "100%",
      maxWidth: "100%",
      borderRadius: 0,
      top: 0,
    });
  }, [isNavReady]);

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
    `relative inline-flex pb-1.5 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:transition-transform after:duration-300 ${
      isActive
        ? "text-gray-950 after:scale-x-100 after:bg-gray-950"
        : "text-gray-700 after:scale-x-0 after:bg-gray-950 hover:text-gray-950 hover:after:scale-x-100"
    }`;

  return (
    <header
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 w-full overflow-hidden border-none px-0 shadow-none isolate"
      style={{
        backdropFilter: "blur(14px) saturate(165%)",
        WebkitBackdropFilter: "blur(14px) saturate(165%)",
        background: scrolled ? "rgba(255,255,255,0.55)" : "#ffffff",
        transition: "background 0.4s ease",
        width: "100%",
        opacity: 1,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-transparent"
      />
      <div className="relative flex w-full flex-row items-center gap-6 overflow-hidden px-6 py-3 min-[1070px]:px-10">
        <NavLink
          to="/"
          aria-label={t("nav.homeAriaLabel")}
          className="shrink-0"
        >
          <img
            src={logoZk}
            alt="ZK Concept"
            className="h-9 w-auto object-contain"
          />
        </NavLink>

        <nav className="ml-auto hidden items-center gap-6 min-[1070px]:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="hidden rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 min-[1070px]:inline-flex"
        >
          {t("nav.contact")}
        </NavLink>

        <button
          type="button"
          className="ml-auto rounded-full px-4 py-2 text-sm font-semibold text-gray-900 min-[1070px]:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {t("nav.menu")}
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
                {t("nav.contact")}
              </NavLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
