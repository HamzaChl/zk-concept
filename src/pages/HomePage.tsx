import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import homeHeroImage from "../assets/home001.jpg";
import anim001 from "../assets/anim001.jpg";
import anim002 from "../assets/anim002.jpg";
import anim003 from "../assets/anim003.jpg";
import logoZk from "../assets/logo-zk.png";
import bpostLogo from "../assets/Bpost.png";
import colisPriveLogo from "../assets/colis-prive-logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import colisImage from "../assets/colis.jpg";
import journauxImage from "../assets/journaux.jpg";
import logisticsImage from "../assets/logistics.jpg";
import packsLogo from "../assets/packs.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const partners = [
  { name: "PacksNL", logo: packsLogo, href: "https://www.packs.nl/" },
  { name: "Bpost", logo: bpostLogo, href: "https://www.bpost.be/fr" },
  { name: "Colis Prive", logo: colisPriveLogo, href: "https://colisprive.be/" },
];
const ENABLE_HERO_IMAGE_INTRO = false;

declare global {
  interface Window {
    __zkHomeIntroPlayed?: boolean;
    __zkLenis?: {
      stop: () => void;
      start: () => void;
    };
  }
}

export default function HomePage() {
  const { t } = useTranslation();
  const hasPlayedIntroInitially =
    typeof window !== "undefined" && window.__zkHomeIntroPlayed === true;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroHeaderRef = useRef<HTMLElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [loaderValue, setLoaderValue] = useState(
    hasPlayedIntroInitially ? 100 : 0,
  );
  const [isLoaderVisible, setIsLoaderVisible] = useState(
    !hasPlayedIntroInitially,
  );
  const [isIntroComplete, setIsIntroComplete] = useState(
    hasPlayedIntroInitially,
  );

  const features = [
    {
      to: "/livraison-colis",
      key: "parcel",
      image: colisImage,
    },
    {
      to: "/distribution-presse",
      key: "press",
      image: journauxImage,
    },
    {
      to: "/gestion-logistique",
      key: "logistics",
      image: logisticsImage,
    },
  ] as const;

  const whyItems = [
    {
      value: "item-1",
      title: t("home.why.items.item1.title"),
      text: t("home.why.items.item1.text"),
    },
    {
      value: "item-2",
      title: t("home.why.items.item2.title"),
      text: t("home.why.items.item2.text"),
    },
    {
      value: "item-3",
      title: t("home.why.items.item3.title"),
      text: t("home.why.items.item3.text"),
    },
    {
      value: "item-4",
      title: t("home.why.items.item4.title"),
      text: t("home.why.items.item4.text"),
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hasPlayedIntro = window.__zkHomeIntroPlayed === true;

    if (hasPlayedIntro) {
      setLoaderValue(100);
      setIsLoaderVisible(false);
      setIsIntroComplete(true);
      window.dispatchEvent(new Event("hero-intro-complete"));
    }

    const runHeroReveal = () => {
      if (!heroHeaderRef.current) return;

      const heroContentItems = gsap.utils.toArray<HTMLElement>(
        ".home-hero-anim",
        heroHeaderRef.current,
      );
      const sideImage =
        heroHeaderRef.current.querySelector<HTMLElement>(".hero-side-image");
      const mainImage =
        heroHeaderRef.current.querySelector<HTMLElement>(".hero-main-image");
      const accentImage =
        heroHeaderRef.current.querySelector<HTMLElement>(".hero-accent-image");
      const tertiaryImage = heroHeaderRef.current.querySelector<HTMLElement>(
        ".hero-tertiary-image",
      );

      if (!mainImage || !sideImage || !accentImage || !tertiaryImage) {
        return;
      }

      gsap.set(heroHeaderRef.current, { opacity: 1 });
      gsap.set(mainImage, { autoAlpha: 1, zIndex: 20 });
      gsap.set(heroContentItems, { autoAlpha: 0, y: 24 });
      gsap.set(sideImage, {
        zIndex: 47,
        autoAlpha: 1,
        display: "block",
        xPercent: 0,
        yPercent: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
      gsap.set(accentImage, {
        zIndex: 46,
        autoAlpha: 1,
        display: "block",
        xPercent: 0,
        yPercent: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
      gsap.set(tertiaryImage, {
        zIndex: 45,
        autoAlpha: 1,
        display: "block",
        xPercent: 0,
        yPercent: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });

      if (!ENABLE_HERO_IMAGE_INTRO) {
        gsap.set([sideImage, accentImage, tertiaryImage], {
          autoAlpha: 0,
          display: "none",
        });
        gsap.to(heroContentItems, {
          y: 0,
          autoAlpha: 1,
          delay: 0.5,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          onComplete: () => {
            window.__zkHomeIntroPlayed = true;
            setIsIntroComplete(true);
            window.dispatchEvent(new Event("hero-intro-complete"));
          },
        });
        return;
      }

      const sweepTl = gsap.timeline();

      sweepTl
        .to(sideImage, {
          yPercent: 115,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .set(sideImage, { display: "none" })
        .to(accentImage, {
          yPercent: 115,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .set(accentImage, { display: "none" })
        .to(tertiaryImage, {
          yPercent: 115,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .set(tertiaryImage, { display: "none" })
        .to(
          heroContentItems,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          },
          "+=0.05",
        );

      sweepTl.eventCallback("onComplete", () => {
        window.__zkHomeIntroPlayed = true;
        setIsIntroComplete(true);
        window.dispatchEvent(new Event("hero-intro-complete"));
      });
    };

    const fadeLoaderAndReveal = () => {
      window.__zkHomeIntroPlayed = true;

      if (!loaderRef.current) {
        setIsLoaderVisible(false);
        runHeroReveal();
        return;
      }

      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          runHeroReveal();
          setIsLoaderVisible(false);
        },
      });
    };

    const COUNTER_TICK_MS = 90;
    const COUNTER_MIN_STEP = 1;
    const COUNTER_MAX_STEP = 5;

    const tickCounter = (currentValue: number) => {
      const increment =
        Math.floor(Math.random() * (COUNTER_MAX_STEP - COUNTER_MIN_STEP + 1)) +
        COUNTER_MIN_STEP;
      const nextValue = Math.min(100, currentValue + increment);
      setLoaderValue(nextValue);

      if (nextValue >= 100) {
        fadeLoaderAndReveal();
        return;
      }

      timerRef.current = window.setTimeout(
        () => tickCounter(nextValue),
        COUNTER_TICK_MS,
      );
    };

    if (!hasPlayedIntro) {
      timerRef.current = window.setTimeout(
        () => tickCounter(0),
        COUNTER_TICK_MS,
      );
    }

    const ctx = gsap.context(() => {
      if (hasPlayedIntro) {
        gsap.set(heroHeaderRef.current, { opacity: 1 });
        gsap.set(".hero-main-image", { autoAlpha: 1, display: "block" });
        gsap.set(
          [".hero-side-image", ".hero-accent-image", ".hero-tertiary-image"],
          {
            autoAlpha: 0,
            display: "none",
          },
        );
        gsap.set(".home-hero-anim", { autoAlpha: 1, y: 0 });
      } else {
        gsap.set(".hero-image-layer", { autoAlpha: 0 });
        gsap.set(".home-hero-anim", { autoAlpha: 0, y: 24 });
      }

      const heroImages = gsap.utils.toArray<HTMLElement>(
        ".hero-image-layer",
        heroHeaderRef.current,
      );
      const heroContent = gsap.utils.toArray<HTMLElement>(
        ".home-hero-anim",
        heroHeaderRef.current,
      );

      if (heroHeaderRef.current && heroImages.length > 0) {
        gsap.to(heroImages, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroHeaderRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      if (heroHeaderRef.current && heroContent.length > 0) {
        gsap.to(heroContent, {
          yPercent: -22,
          ease: "none",
          stagger: 0.03,
          scrollTrigger: {
            trigger: heroHeaderRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.35,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".reveal-stagger")
        .forEach((container) => {
          const items = container.querySelectorAll(".reveal-item");
          if (items.length === 0) return;
          gsap.fromTo(
            items,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.to(section, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.45,
          },
        });
      });
    }, rootRef);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!isIntroComplete) {
      window.__zkLenis?.stop();
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        window.__zkLenis?.start();
        document.documentElement.style.overflow = "";
        document.documentElement.style.touchAction = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
      };
    }

    window.__zkLenis?.start();
    document.documentElement.style.overflow = "";
    document.documentElement.style.touchAction = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isIntroComplete]);

  return (
    <div ref={rootRef} className="w-full">
      {isLoaderVisible ? (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-[#f0f4f8]"
        >
          <div className="flex flex-col items-center gap-2">
            <img
              src={logoZk}
              alt="ZK Concept"
              className="h-10 w-auto object-contain"
            />
            <p className="text-[9px] font-light uppercase tracking-[0.22em] text-[#0f0f0f]">
              Chargement {loaderValue}%
            </p>
          </div>
        </div>
      ) : null}

      <section
        ref={heroHeaderRef}
        className="hero-flip-container relative h-screen w-screen overflow-hidden bg-white opacity-0"
      >
        <div className="absolute inset-0 z-0 bg-white" />
        <div className="hero-image-layer hero-main-image hero-flip-image absolute inset-0 z-20 h-full w-full">
          <img
            src={homeHeroImage}
            alt={t("home.hero.imageAlt")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.45),transparent_40%)]" />
        </div>
        <div className="hero-image-layer hero-side-image hero-flip-image absolute z-20 overflow-hidden rounded-2xl border border-white/30 shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
          <img
            src={anim001}
            alt={t("home.hero.imageAlt")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/35" />
        </div>
        <div className="hero-image-layer hero-accent-image hero-flip-image absolute z-20 overflow-hidden rounded-2xl border border-white/30 shadow-[0_20px_45px_rgba(0,0,0,0.24)]">
          <img
            src={anim002}
            alt={t("home.hero.imageAlt")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/35" />
        </div>
        <div className="hero-image-layer hero-tertiary-image hero-flip-image absolute z-20 overflow-hidden rounded-2xl border border-white/30 shadow-[0_20px_45px_rgba(0,0,0,0.24)]">
          <img
            src={anim003}
            alt={t("home.hero.imageAlt")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/35" />
        </div>
        <div className="absolute inset-0 z-30 flex items-center px-6 pt-20 md:px-12 md:pt-28">
          <div className="max-w-2xl space-y-6">
            <span className="home-hero-anim inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              {t("home.hero.badge")}
            </span>
            <h1 className="home-hero-anim text-4xl font-semibold leading-tight text-white md:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="home-hero-anim max-w-xl text-base text-white/85 md:text-lg">
              {t("home.hero.description")}
            </p>
            <div className="home-hero-anim flex flex-wrap gap-3">
              <Link
                to="/travailler-ensemble"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                {t("common.workTogether")}
              </Link>
              <Link
                to="/devis"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
              >
                {t("common.quote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full space-y-20 px-4 pt-16 md:px-[50px]">
        <section className="reveal-section mx-auto max-w-xl space-y-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
            {t("home.partners.title")}
          </p>
          <div className="reveal-stagger grid gap-2 sm:grid-cols-3">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="reveal-item group flex h-[90px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`mx-auto w-auto object-contain ${
                    partner.name === "Bpost"
                      ? "h-12 transition-transform duration-300 group-hover:scale-105"
                      : partner.name === "Colis Prive"
                        ? "h-[56px] transition-transform duration-300 group-hover:scale-105"
                        : "h-8 transition-transform duration-300 group-hover:scale-105"
                  }`}
                />
              </a>
            ))}
          </div>
        </section>

        <section className="reveal-section space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t("home.services.title")}
          </h2>
          <p className="mb-6 max-w-3xl text-base text-gray-600 md:text-lg">
            {t("home.services.description")}
          </p>
          <div className="reveal-stagger grid gap-4 md:auto-rows-fr md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.key}
                className="reveal-item flex h-full flex-col"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={feature.image}
                    alt={t(`services.${feature.key}.title`)}
                    className="aspect-[5/3] w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {t(`services.${feature.key}.title`)}
                </h3>
                <p className="mt-3 mb-4 text-sm leading-6 text-gray-600">
                  {t(`services.${feature.key}.description`)}
                </p>
                <Link
                  to={feature.to}
                  className="mt-auto inline-flex w-fit rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  {t("common.moreDetails")}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal-section">
          <div className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-gray-900 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
            <div className="space-y-2">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {t("home.recruitment.kicker")}
              </span>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {t("home.recruitment.title")}
              </h2>
              <p className="max-w-xl text-sm leading-6 text-white/60">
                {t("home.recruitment.description")}
              </p>
            </div>
            <Link
              to="/recrutement"
              className="inline-flex shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              <span className="inline-flex items-center gap-2">
                {t("home.recruitment.cta")}
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </section>

        <section className="reveal-section grid gap-6 rounded-2xl border border-gray-200 p-8 md:grid-cols-2 md:items-center md:p-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b5563]">
              {t("home.why.kicker")}
            </p>
            <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
              {t("home.why.title")}
            </h2>
            <p className="text-base text-gray-600">
              {t("home.why.description")}
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full max-w-lg md:justify-self-end"
          >
            {whyItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.text}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="reveal-section rounded-3xl bg-[#1f2937] p-8 text-white md:p-12">
          <div className="reveal-stagger space-y-5">
            <h2 className="text-3xl font-semibold md:text-5xl">
              {t("home.bottomCta.title")}
            </h2>
            <p className="max-w-3xl text-sm text-gray-300 md:text-base">
              {t("home.bottomCta.description")}
            </p>
            <div className="reveal-item flex flex-wrap gap-3">
              <div className="home-hero-anim flex flex-wrap gap-3">
                <Link
                  to="/travailler-ensemble"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                >
                  {t("common.workTogether")}
                </Link>
                <Link
                  to="/devis"
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
                >
                  {t("common.quote")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
