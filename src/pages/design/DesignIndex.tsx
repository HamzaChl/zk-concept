import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import comptaLogo from "../../assets/logo-partners/Outlook-qhbk4leg.png";
import tigrieLogo from "../../assets/logo-partners/logo-tigries.png";
import snackLogo from "../../assets/logo-partners/logo-Snack-t-Hoeksken-1.png";
import zkLogo from "../../assets/logo-zk.png";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    slug: "compta-partners",
    client: "SRL COMPTA-PARTNERS",
    type: "Site web · Identité digitale",
    status: "En cours",
    deadline: "26 mars 2025",
    accent: "#25408f",
    logo: comptaLogo,
    done: false,
  },
  {
    slug: "tigries-trading",
    client: "Tigries Trading BV",
    type: "Site web · Marché espagnol",
    status: "En cours",
    deadline: "23 mars 2025",
    accent: "#f7af2f",
    logo: tigrieLogo,
    done: false,
  },
  {
    slug: "snack-hoeksken",
    client: "Snack Pitta 't Hoeksken",
    type: "Site web · Fast-food",
    status: "Livré",
    deadline: "19 mars 2025",
    accent: "#c0392b",
    logo: snackLogo,
    done: true,
  },
  {
    slug: "zk-concept",
    client: "ZK Concept",
    type: "Interne · Lancement",
    status: "En cours",
    deadline: "—",
    accent: "#111827",
    logo: zkLogo,
    logoSize: "h-6",
    done: false,
  },
  {
    slug: "route-zk",
    client: "RouteZK",
    type: "App web · Optimisation de tournées",
    status: "En développement",
    deadline: "—",
    accent: "#1e3a5f",
    logo: zkLogo,
    logoSize: "h-6",
    done: false,
  },
];

function StatusBadge({ status, done }: { status: string; done: boolean }) {
  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs text-gray-400">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs text-green-700">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      {status}
    </span>
  );
}

export default function DesignIndex() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".design-hero-anim", {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.from(".design-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".design-cards-grid",
          start: "top 85%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <p className="design-hero-anim mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          ZK Studio · Design
        </p>
        <h1 className="design-hero-anim text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Projets
        </h1>
        <p className="design-hero-anim mt-3 max-w-xl text-base text-gray-500">
          Briefs interactifs et suivis de conception pour chaque client.
        </p>
      </div>

      {/* Grid */}
      <div className="design-cards-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            to={`/design/${project.slug}`}
            className="design-card reveal-item group block rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Accent bar */}
            <div
              className="h-1.5 w-full rounded-t-2xl"
              style={{ backgroundColor: project.accent }}
            />

            <div className="p-6">
              {/* Logo area */}
              <div
                className="mb-5 flex h-16 w-full items-center justify-center rounded-xl px-4"
                style={{ backgroundColor: project.accent + "12" }}
              >
                <img
                  src={project.logo}
                  alt={project.client}
                  className={`${(project as typeof project & { logoSize?: string }).logoSize ?? "h-10"} max-w-full object-contain`}
                />
              </div>

              {/* Info */}
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {project.type}
              </p>
              <h2 className="mb-3 text-base font-bold leading-snug text-gray-900">
                {project.client}
              </h2>

              <div className="flex items-center justify-between">
                <StatusBadge status={project.status} done={project.done} />
                <span className={`text-xs ${project.done ? "text-gray-400 line-through" : "text-gray-400"}`}>
                  {project.deadline}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-end border-t border-gray-100 px-6 py-3">
              <span className="text-xs font-medium text-gray-400 transition-colors duration-150 group-hover:text-gray-700">
                Voir le brief
              </span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="ml-1.5 h-3.5 w-3.5 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        ))}

        {/* Placeholder — prochain projet */}
        <div className="design-card flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-gray-300 text-gray-300">
              <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
                <path
                  d="M8 3v10M3 8h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-400">Prochain projet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
