import homeHeroImage from "../assets/home001.jpg";
import bpostLogo from "../assets/Bpost.png";
import colisPriveLogo from "../assets/Colis_Privé.svg.png";
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
    anchor: "livraison-colis",
    title: "Livraison de Colis",
    text: "ZK Concept assure la livraison rapide et fiable de colis a travers la Belgique. Forte de plusieurs annees d'experience aupres d'acteurs majeurs du secteur, l'entreprise garantit ponctualite, respect des procedures et qualite de service constante. Chaque tournee est optimisee afin d'assurer efficacite, tracabilite et satisfaction client.",
    image: colisImage,
  },
  {
    anchor: "distribution-presse",
    title: "Distribution de Presse",
    text: "L'entreprise assure la distribution matinale de journaux et magazines avec precision et regularite. Grace a une organisation structuree incluant le tri, la preparation et la gestion des tournees, ZK Concept garantit une execution ponctuelle et conforme aux exigences des distributeurs et editeurs.",
    image: journauxImage,
  },
  {
    anchor: "gestion-logistique",
    title: "Gestion Logistique et Coordination",
    text: "ZK Concept prend en charge la planification des tournees, la coordination des chauffeurs et le suivi operationnel complet. Sa structure independante permet d'assurer continuite, reactivite et stabilite dans l'execution des missions logistiques, meme dans des environnements exigeants.",
    image: logisticsImage,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-20">
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
            <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              Partenaire logistique indépendant
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Performance, ponctualité et efficacité au quotidien.
            </h1>
            <p className="max-w-xl text-base text-white/85 md:text-lg">
              Spécialiste en livraison de colis et distribution de presse, ZK
              Concept assure des tournées optimisées, fiables et conformes aux
              exigences du secteur.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                Nous contacter
              </button>
              <button
                type="button"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
              >
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xl space-y-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
          A travaillé avec{" "}
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-[90px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 transition-transform duration-300 hover:scale-[1.03]"
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

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Nos services
        </h2>
        <p className="max-w-3xl text-base text-gray-600 md:text-lg">
          Des solutions logistiques performantes, structurées et fiables,
          pensées pour garantir ponctualité, efficacité et continuité
          opérationnelle.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="space-y-4 rounded-2xl border border-gray-200 p-6"
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
                to={`/services#${feature.anchor}`}
                className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
              >
                + de details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border border-gray-200 p-8 md:grid-cols-2 md:items-center md:p-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">
            Why ZK Concept
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            Built for teams that need speed, control and reliability.
          </h2>
          <p className="text-base text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio praesent libero sed cursus ante dapibus diam.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="rounded-lg bg-gray-50 px-4 py-3">
            Real-time trip tracking
          </li>
          <li className="rounded-lg bg-gray-50 px-4 py-3">
            Automated client notifications
          </li>
          <li className="rounded-lg bg-gray-50 px-4 py-3">
            Dedicated account support
          </li>
          <li className="rounded-lg bg-gray-50 px-4 py-3">
            Transparent pricing engine
          </li>
        </ul>
      </section>

      <section className="rounded-3xl bg-gray-900 p-8 text-white md:p-12">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold md:text-5xl">
            Ready to launch your next transport project?
          </h2>
          <p className="max-w-3xl text-sm text-gray-300 md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Start now
            </button>
            <button
              type="button"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gray-900"
            >
              Request demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
