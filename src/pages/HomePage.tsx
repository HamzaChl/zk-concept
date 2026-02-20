import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeHeroImage from "../assets/home001.jpg";
import bpostLogo from "../assets/Bpost.png";
import colisPriveLogo from "../assets/Colis_Privé.svg.png";
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

const partners = [
  { name: "PacksNL", logo: packsLogo, href: "https://www.packs.nl/" },
  { name: "Bpost", logo: bpostLogo, href: "https://www.bpost.be/fr" },
  { name: "Colis Prive", logo: colisPriveLogo, href: "https://colisprive.be/" },
];

const features = [
  {
    to: "/livraison-colis",
    title: "Livraison de Colis",
    text: "ZK Concept assure la livraison rapide et fiable de colis à travers la Belgique. Forte de plusieurs années d'expérience auprès d'acteurs majeurs du secteur, l'entreprise garantit ponctualité, respect des procedures et qualité de service constante. Chaque tournée est optimisee afin d'assurer efficacité, traçabilité et satisfaction client.",
    image: colisImage,
  },
  {
    to: "/distribution-presse",
    title: "Distribution de Presse",
    text: "L'entreprise assure la distribution matinale de journaux et magazines avec précision et régularité. Grâce à une organisation structurée incluant le tri, la preparation et la gestion des tournées, ZK Concept garantit une exécution ponctuelle et conforme aux exigences des distributeurs et editeurs.",
    image: journauxImage,
  },
  {
    to: "/gestion-logistique",
    title: "Gestion Logistique et Coordination",
    text: "ZK Concept prend en charge la planification des tournées, la coordination des chauffeurs et le suivi opérationnel complet. Sa structure independante permet d'assurer continuité, réactivité et stabilité dans l'exécution des missions logistiques, même dans des environnements exigeants.",
    image: logisticsImage,
  },
];

const whyItems = [
  {
    value: "item-1",
    title: "Organisation opérationnelle claire",
    text: "Nos process sont structures pour reduire les frictions terrain, assurer des tournées fluides et maintenir un niveau de service constant, même sur des pics d'activite.",
  },
  {
    value: "item-2",
    title: "Execution ponctuelle et fiable",
    text: "Chaque mission est suivie avec rigueur, du depart a la livraison, afin de respecter les engagements horaires et les standards de qualité attendus.",
  },
  {
    value: "item-3",
    title: "Pilotage et suivi en continu",
    text: "Nous analysons les performances, ajustons les plans et coordonnons les ressources pour garantir stabilité, contrôle et réactivité sur la duree.",
  },
  {
    value: "item-4",
    title: "Equipe expérimentée",
    text: "Notre équipe combine expérience terrain et discipline opérationnelle pour répondre aux exigences logistiques des entreprises les plus exigeantes.",
  },
];

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".home-hero-anim",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        },
      );

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
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="space-y-20">
      <section className="relative overflow-hidden rounded-3xl bg-[#f0f4f8]">
        <div className="h-[520px] w-full md:h-[620px]">
          <img
            src={homeHeroImage}
            alt="ZK Concept transport hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.45),transparent_40%)]" />
        </div>

        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div className="max-w-2xl space-y-6">
            <span className="home-hero-anim inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              Partenaire logistique indépendant
            </span>
            <h1 className="home-hero-anim text-4xl font-semibold leading-tight text-white md:text-6xl">
              Performance, ponctualité et efficacité au quotidien.
            </h1>
            <p className="home-hero-anim max-w-xl text-base text-white/85 md:text-lg">
              Spécialiste en livraison de colis et distribution de presse, ZK
              Concept assure des tournées optimisées, fiables et conformes aux
              exigences du secteur.
            </p>
            <div className="home-hero-anim flex flex-wrap gap-3">
              <Link
                to="/travailler-ensemble"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                Travailler ensemble
              </Link>
              <Link
                to="/devis"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-section mx-auto max-w-xl space-y-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
          A travaillé avec{" "}
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
        <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Nos services
        </h2>
        <p className="max-w-3xl text-base text-gray-600 md:text-lg">
          Des solutions logistiques performantes, structurées et fiables,
          pensées pour garantir ponctualité, efficacité et continuité
          opérationnelle.
        </p>
        <div className="reveal-stagger grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="reveal-item space-y-4 rounded-2xl border border-gray-200 p-6"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-[5/3] w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {feature.text}
              </p>
              <Link
                to={feature.to}
                className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
              >
                + de details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal-section grid gap-6 rounded-2xl border border-gray-200 p-8 md:grid-cols-2 md:items-center md:p-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b5563]">
            POURQUOI ZK CONCEPT
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            Conçu pour les entreprises qui exigent rapidité, contrôle et
            fiabilité.
          </h2>
          <p className="text-base text-gray-600">
            Grâce à une organisation maîtrisée et une équipe expérimentée, ZK
            Concept garantit efficacité, ponctualité et stabilité
            opérationnelle.
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
            Prêt à optimiser vos opérations logistiques ?
          </h2>
          <p className="max-w-3xl text-sm text-gray-300 md:text-base">
            ZK Concept accompagne les entreprises dans la livraison de colis et
            la distribution de presse avec fiabilité, ponctualité et efficacité.
            Discutons de votre projet et mettons en place une solution adaptée à
            vos besoins.
          </p>
          <div className="reveal-item flex flex-wrap gap-3">
            <div className="home-hero-anim flex flex-wrap gap-3">
              <Link
                to="/travailler-ensemble"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                Travailler ensemble
              </Link>
              <Link
                to="/devis"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
