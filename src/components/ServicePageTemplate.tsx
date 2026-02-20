import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Link } from "react-router-dom";

type ServiceDetail = {
  title: string;
  text: string;
};

type ServicePageTemplateProps = {
  title: string;
  image: string;
  secondaryImage?: string;
  description: string;
  details: ServiceDetail[];
};

export default function ServicePageTemplate({
  title,
  image,
  secondaryImage,
  description,
  details,
}: ServicePageTemplateProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

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
        const imageEl = card.querySelector(".service-image");
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

        if (imageEl) {
          gsap.fromTo(
            imageEl,
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
          {title}
        </h2>
        <p className="services-hero-anim mx-auto max-w-3xl text-base text-gray-600 md:text-lg">
          Une exécution claire, structurée et fiable, adaptée a vos exigences
          opérationnelles.
        </p>
      </section>

      <section className="space-y-6">
        <article className="service-card grid gap-6 rounded-2xl border border-gray-200 p-5 md:p-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <img
              src={image}
              alt={title}
              className="service-image aspect-[5/3] w-full rounded-xl object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="service-reveal text-2xl font-semibold text-gray-900 md:text-3xl">
              {title}
            </h3>
            <p className="service-reveal text-sm leading-7 text-gray-600 md:text-base">
              {description}
            </p>
            <Accordion
              type="single"
              collapsible
              defaultValue={details[0]?.title}
              className="service-reveal w-full rounded-xl border border-gray-200 px-4"
            >
              {details.map((detail) => (
                <AccordionItem key={detail.title} value={detail.title}>
                  <AccordionTrigger>{detail.title}</AccordionTrigger>
                  <AccordionContent>{detail.text}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </article>
      </section>

      <section className="service-card grid gap-6 rounded-2xl border border-gray-200 p-5 md:p-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <h3 className="service-reveal text-2xl font-semibold text-gray-900 md:text-3xl">
            Intéressé ? Complétez nos formulaires.
          </h3>
          <p className="service-reveal text-sm leading-7 text-gray-600 md:text-base">
            Vous avez un besoin en livraison, distribution ou coordination
            logistique ? Envoyez votre demande via nos formulaires pour recevoir
            une reponse rapide et une proposition adaptée a votre activite.
          </p>
          <div className="service-reveal flex flex-wrap gap-3 pt-1">
            <Link
              to="/devis"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Demander un devis
            </Link>
            <Link
              to="/travailler-ensemble"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
            >
              Travailler ensemble
            </Link>
          </div>
        </div>

        <div>
          <img
            src={secondaryImage ?? image}
            alt={`${title} illustration`}
            className="service-image aspect-[5/3] w-full rounded-xl object-cover"
          />
        </div>
      </section>
    </div>
  );
}
