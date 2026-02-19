import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import colisImage from "../assets/colis.jpg";
import journauxImage from "../assets/journaux.jpg";
import logisticsImage from "../assets/logistics.jpg";

const services = [
  {
    id: "01",
    anchor: "livraison-colis",
    title: "Livraison de Colis",
    image: colisImage,
    description:
      "ZK Concept assure la livraison rapide et fiable de colis a travers la Belgique. Forte de plusieurs annees d'experience aupres d'acteurs majeurs du secteur, l'entreprise garantit ponctualite, respect des procedures et qualite de service constante. Chaque tournee est optimisee afin d'assurer efficacite, tracabilite et satisfaction client.",
    points: [
      "Tournees optimisees selon les zones et contraintes horaires",
      "Gestion rigoureuse des procedures et du suivi de livraison",
      "Niveau de service stable sur des volumes variables",
    ],
  },
  {
    id: "02",
    anchor: "distribution-presse",
    title: "Distribution de Presse",
    image: journauxImage,
    description:
      "L'entreprise assure la distribution matinale de journaux et magazines avec precision et regularite. Grace a une organisation structuree incluant le tri, la preparation et la gestion des tournees, ZK Concept garantit une execution ponctuelle et conforme aux exigences des distributeurs et editeurs.",
    points: [
      "Preparation en amont et tri des supports",
      "Distribution matinale avec fenetres de livraison strictes",
      "Regularite quotidienne et conformite editeur/distributeur",
    ],
  },
  {
    id: "03",
    anchor: "gestion-logistique",
    title: "Gestion Logistique et Coordination",
    image: logisticsImage,
    description:
      "ZK Concept prend en charge la planification des tournees, la coordination des chauffeurs et le suivi operationnel complet. Sa structure independante permet d'assurer continuite, reactivite et stabilite dans l'execution des missions logistiques, meme dans des environnements exigeants.",
    points: [
      "Planification operationnelle des tournees",
      "Coordination terrain et adaptation en temps reel",
      "Suivi global des performances et de la qualite de service",
    ],
  },
];

export default function ServicesPage() {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }, [location.hash]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-hero-anim",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
      );

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
        const image = card.querySelector(".service-image");
        const contentItems = card.querySelectorAll(".service-reveal");

        gsap.fromTo(
          card,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.06, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (contentItems.length > 0) {
          gsap.fromTo(
            contentItems,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="space-y-12">
      <section className="space-y-4 pt-[40px] text-center">
        <h2 className="services-hero-anim text-2xl font-bold text-gray-900 md:text-3xl">
          Trois services, une execution claire et fiable.
        </h2>
        <p className="services-hero-anim mx-auto max-w-3xl text-base text-gray-600 md:text-lg">
          Chaque mission est structuree autour d'une methode simple: preparer,
          executer, suivre. Cette organisation permet d'assurer la regularite
          des operations, la transparence et une qualite de service constante.
        </p>
      </section>

      <section className="space-y-6">
        {services.map((service, index) => (
          <article
            key={service.title}
            id={service.anchor}
            className="service-card scroll-mt-28 grid gap-6 rounded-2xl border border-gray-200 p-5 md:p-6 lg:grid-cols-[1.1fr_1fr]"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <img
                src={service.image}
                alt={service.title}
                className="service-image aspect-[5/3] w-full rounded-xl object-cover"
              />
            </div>

            <div
              className={index % 2 === 1 ? "space-y-4 lg:order-1" : "space-y-4"}
            >
              <p className="service-reveal text-xs font-semibold uppercase tracking-[0.2em] text-[#4b5563]">
                Service {service.id}
              </p>
              <h2 className="service-reveal text-2xl font-semibold text-gray-900 md:text-3xl">
                {service.title}
              </h2>
              <p className="service-reveal text-sm leading-7 text-gray-600 md:text-base">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="service-reveal rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
