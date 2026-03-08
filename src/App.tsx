import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "./components/Footer";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Nav from "./components/Nav";
import ContactPage from "./pages/ContactPage";
import DevisPage from "./pages/DevisPage";
import DistributionPressePage from "./pages/DistributionPressePage";
import GestionLogistiquePage from "./pages/GestionLogistiquePage";
import AmpPresentationPage from "./pages/AmpPresentationPage";
import HomePage from "./pages/HomePage";
import ImprintPage from "./pages/ImprintPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import LivraisonColisPage from "./pages/LivraisonColisPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TempMailsPage from "./pages/TempMailsPage";
import WorkTogetherPage from "./pages/WorkTogetherPage";

const LOADING_ENABLED = false;

type FlairCleanup = () => void;
const flairRegistry = new Map<HTMLElement, FlairCleanup>();

function parseRgb(color: string) {
  const match = color.match(/\d+(\.\d+)?/g);
  if (!match || match.length < 3) return null;
  return {
    r: Number(match[0]),
    g: Number(match[1]),
    b: Number(match[2]),
  };
}

function initFlairButton(button: HTMLElement): FlairCleanup | null {
  if (button.dataset.zkFlairReady === "true") return null;
  button.dataset.zkFlairReady = "true";
  button.classList.add("zk-flair-button");

  let flair = button.querySelector<HTMLElement>(":scope > .zk-button__flair");
  if (!flair) {
    flair = document.createElement("span");
    flair.className = "zk-button__flair";
    flair.setAttribute("aria-hidden", "true");
    button.insertBefore(flair, button.firstChild);
  }

  let label = button.querySelector<HTMLElement>(":scope > .zk-button__label");
  if (!label) {
    label = document.createElement("span");
    label.className = "zk-button__label";
    const nodesToMove = Array.from(button.childNodes).filter(
      (node) => node !== flair,
    );
    nodesToMove.forEach((node) => label?.appendChild(node));
    button.appendChild(label);
  }

  const bgRgb = parseRgb(window.getComputedStyle(button).backgroundColor);
  const luminance = bgRgb
    ? (0.2126 * bgRgb.r + 0.7152 * bgRgb.g + 0.0722 * bgRgb.b) / 255
    : 1;
  button.style.setProperty(
    "--zk-flair-bg",
    luminance < 0.5 ? "rgba(255,255,255,0.34)" : "rgba(17,24,39,0.14)",
  );

  const xSet = gsap.quickSetter(flair, "xPercent");
  const ySet = gsap.quickSetter(flair, "yPercent");

  const getXY = (event: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = gsap.utils.clamp(
      0,
      100,
      gsap.utils.mapRange(0, rect.width, 0, 100, event.clientX - rect.left),
    );
    const y = gsap.utils.clamp(
      0,
      100,
      gsap.utils.mapRange(0, rect.height, 0, 100, event.clientY - rect.top),
    );
    return { x, y };
  };

  const onEnter = (event: MouseEvent) => {
    const { x, y } = getXY(event);
    xSet(x);
    ySet(y);
    gsap.to(flair, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = (event: MouseEvent) => {
    const { x, y } = getXY(event);
    gsap.killTweensOf(flair);
    gsap.to(flair, {
      xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
      yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
      scale: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onMove = (event: MouseEvent) => {
    const { x, y } = getXY(event);
    gsap.to(flair, {
      xPercent: x,
      yPercent: y,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  button.addEventListener("mouseenter", onEnter);
  button.addEventListener("mouseleave", onLeave);
  button.addEventListener("mousemove", onMove);

  return () => {
    button.removeEventListener("mouseenter", onEnter);
    button.removeEventListener("mouseleave", onLeave);
    button.removeEventListener("mousemove", onMove);
    const flairNode = button.querySelector<HTMLElement>(":scope > .zk-button__flair");
    if (flairNode) flairNode.remove();
    const labelNode = button.querySelector<HTMLElement>(":scope > .zk-button__label");
    if (labelNode) {
      while (labelNode.firstChild) {
        button.insertBefore(labelNode.firstChild, labelNode);
      }
      labelNode.remove();
    }
    button.classList.remove("zk-flair-button");
    button.style.removeProperty("--zk-flair-bg");
    delete button.dataset.zkFlairReady;
  };
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function RouteTransitionVeil() {
  const { pathname } = useLocation();
  const fullVeilRef = useRef<HTMLDivElement | null>(null);
  const topVeilRef = useRef<HTMLDivElement | null>(null);
  const bottomVeilRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (!fullVeilRef.current || !topVeilRef.current || !bottomVeilRef.current) {
      return;
    }

    if (isFirstRender.current) {
      gsap.set(fullVeilRef.current, { autoAlpha: 0 });
      gsap.set(topVeilRef.current, { yPercent: -100, autoAlpha: 1 });
      gsap.set(bottomVeilRef.current, { yPercent: 100, autoAlpha: 1 });
      isFirstRender.current = false;
      return;
    }

    const tl = gsap.timeline();
    tl.set(fullVeilRef.current, { autoAlpha: 1 })
      .set(topVeilRef.current, { yPercent: -100, autoAlpha: 1 }, 0)
      .set(bottomVeilRef.current, { yPercent: 100, autoAlpha: 1 }, 0)
      .to(
        topVeilRef.current,
        {
          yPercent: 0,
          duration: 0.42,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        bottomVeilRef.current,
        {
          yPercent: 0,
          duration: 0.42,
          ease: "power3.inOut",
        },
        0,
      )
      .set(fullVeilRef.current, { autoAlpha: 0 })
      .to(
        topVeilRef.current,
        {
          yPercent: -100,
          duration: 0.56,
          ease: "expo.inOut",
        },
        0.44,
      )
      .to(
        bottomVeilRef.current,
        {
          yPercent: 100,
          duration: 0.56,
          ease: "expo.inOut",
        },
        0.44,
      );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={fullVeilRef}
        className="pointer-events-none fixed inset-0 z-[96] bg-[#f0f4f8]"
      />
      <div
        ref={topVeilRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-1/2 bg-[#f0f4f8]"
      />
      <div
        ref={bottomVeilRef}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] h-1/2 bg-[#f0f4f8]"
      />
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(LOADING_ENABLED);
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!LOADING_ENABLED) return;

    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return current + 1;
      });
    }, 20);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!supportsHover.matches) return;

    flairRegistry.forEach((cleanup) => cleanup());
    flairRegistry.clear();

    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(
        "a[class*='rounded-full'], button[class*='rounded-full']",
      ),
    ).filter(
      (el) =>
        !el.className.includes("after:rounded-full") &&
        !el.closest("footer") &&
        !el.closest(".mobile-menu-item"),
    );

    buttons.forEach((button) => {
      const cleanup = initFlairButton(button);
      if (cleanup) flairRegistry.set(button, cleanup);
    });

    return () => {
      flairRegistry.forEach((cleanup) => cleanup());
      flairRegistry.clear();
    };
  }, [pathname]);

  if (LOADING_ENABLED && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
            Chargement
          </p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-right text-2xl font-bold text-gray-900">
            {progress}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-gray-900">
      <div aria-hidden className="global-grid-overlay" />
      <div className="relative z-10">
        <ScrollToTop />
        <RouteTransitionVeil />
        <Nav />
        <main
          className={
            isHomePage
              ? "w-full pb-16 pt-0"
              : "mx-auto w-full px-4 pb-16 pt-28 md:px-[50px]"
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/amp-presentation" element={<AmpPresentationPage />} />
            <Route path="/livraison-colis" element={<LivraisonColisPage />} />
            <Route
              path="/distribution-presse"
              element={<DistributionPressePage />}
            />
            <Route
              path="/gestion-logistique"
              element={<GestionLogistiquePage />}
            />
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/travailler-ensemble" element={<WorkTogetherPage />} />
            <Route path="/temp-mails" element={<TempMailsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/politique-de-confidentialite"
              element={<PrivacyPolicyPage />}
            />
            <Route path="/mentions-legales" element={<LegalNoticePage />} />
            <Route path="/imprint" element={<ImprintPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
