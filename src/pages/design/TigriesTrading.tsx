import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import tigrieLogo from "../../assets/logo-partners/logo-tigries.png";

// ─── Types ───────────────────────────────────────────────────────────────────

type TaskId = string;

interface Task {
  id: TaskId;
  badge: "essentiel" | "bonus";
}

interface ChecklistSection {
  id: string;
  tasks: Task[];
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    id: "direction",
    tasks: [
      { id: "d1", badge: "essentiel" },
      { id: "d2", badge: "essentiel" },
      { id: "d3", badge: "essentiel" },
    ],
  },
  {
    id: "livrables",
    tasks: [
      { id: "l1", badge: "essentiel" },
      { id: "l2", badge: "essentiel" },
      { id: "l3", badge: "essentiel" },
    ],
  },
];

const ALL_TASK_IDS = CHECKLIST_SECTIONS.flatMap((s) => s.tasks.map((t) => t.id));
const STORAGE_KEY = "zk-tigries-trading-brief";
const ACCENT = "#0f172a";
const HERO_BG = "#f7af2f";

const RESOURCES = [
  { key: "dribbble", url: "https://dribbble.com" },
  { key: "behance", url: "https://behance.net" },
  { key: "awwwards", url: "https://awwwards.com" },
  { key: "googleFonts", url: "https://fonts.google.com" },
  { key: "coolors", url: "https://coolors.co" },
  { key: "unsplash", url: "https://unsplash.com" },
  { key: "pexels", url: "https://pexels.com" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadChecked(): Set<TaskId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as TaskId[]);
  } catch {
    // ignore
  }
  return new Set();
}

function saveChecked(next: Set<TaskId>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  } catch {
    // ignore
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TigriestTradingPage() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const [checked, setChecked] = useState<Set<TaskId>>(() => loadChecked());

  const done = Array.from(checked).filter((id) => ALL_TASK_IDS.includes(id)).length;
  const total = ALL_TASK_IDS.length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggle = (id: TaskId) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveChecked(next);
      return next;
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tigries-hero-anim",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1 },
      );

      gsap.utils.toArray<HTMLElement>(".tigries-reveal-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          },
        );

        const items = card.querySelectorAll(".tigries-reveal-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
            },
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="space-y-4">
      {/* ── BACK LINK ─────────────────────────────────────────────────── */}
      <div className="flex justify-start">
        <Link to="/design" className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-700">
          {t("design.common.back")}
        </Link>
      </div>

      {/* ── STATUS BANNER ─────────────────────────────────────────────── */}
      <div className="tigries-hero-anim flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm font-semibold text-gray-900">{t("tigriesTrading.status.label")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{t("tigriesTrading.status.deadline")}</span>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            {t("tigriesTrading.status.date")}
          </span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-14 md:py-20"
        style={{ backgroundColor: HERO_BG }}
      >
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="max-w-xl space-y-5">
            <h1 className="tigries-hero-anim text-4xl leading-tight text-white md:text-5xl">
              {t("tigriesTrading.hero.title").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="tigries-hero-anim text-base leading-7 text-white/70 md:text-lg">
              {t("tigriesTrading.hero.description")}
            </p>
          </div>

          {/* Logo card — CSS perspective tilt */}
          <div className="tigries-hero-anim shrink-0 self-center [perspective:800px]">
            <div
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform duration-300 ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.06)] md:p-8"
              onMouseEnter={(ev) => {
                boundingRef.current = ev.currentTarget.getBoundingClientRect();
              }}
              onMouseLeave={() => {
                boundingRef.current = null;
              }}
              onMouseMove={(ev) => {
                if (!boundingRef.current) return;
                const xPct = (ev.clientX - boundingRef.current.left) / boundingRef.current.width;
                const yPct = (ev.clientY - boundingRef.current.top) / boundingRef.current.height;
                ev.currentTarget.style.setProperty("--x-rotation", `${(0.5 - yPct) * 20}deg`);
                ev.currentTarget.style.setProperty("--y-rotation", `${(xPct - 0.5) * 20}deg`);
                ev.currentTarget.style.setProperty("--x", `${xPct * 100}%`);
                ev.currentTarget.style.setProperty("--y", `${yPct * 100}%`);
              }}
            >
              <img
                src={tigrieLogo}
                alt="Logo Tigries Trading"
                className="h-20 w-auto object-contain md:h-28"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(247,175,47,0.12)_20%,transparent_80%)]" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-black/[0.08]" />
        <div className="pointer-events-none absolute -bottom-12 right-12 h-56 w-56 rounded-full bg-black/[0.08]" />
        <div className="pointer-events-none absolute bottom-6 left-8 h-24 w-24 rounded-full bg-black/[0.05]" />
      </div>

      {/* ── CONTEXTE ──────────────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.context.sectionTitle")}
        </p>

        <div className="tigries-reveal-item mb-6 flex items-center gap-3">
          <span
            className="inline-block rounded-md px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-white"
            style={{ backgroundColor: ACCENT }}
          >
            Tigries Trading BV
          </span>
          <p className="text-xs italic text-gray-400">
            {t("tigriesTrading.context.tagline")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Direction artistique */}
          <div className="tigries-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.direction.label")}
            </p>
            <ul className="space-y-2">
              {(["item1", "item2", "item3"] as const).map((key, i) => (
                <li key={key} className="flex items-center gap-2.5">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: i === 2 ? ACCENT : "#d1d5db" }}
                  />
                  <span className={`text-sm ${i === 2 ? "font-medium text-gray-900" : "text-gray-700"}`}>
                    {t(`tigriesTrading.context.direction.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sites de référence */}
          <div className="tigries-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.refs.label")}
            </p>
            <div className="space-y-2">
              {[
                { label: "milwaukee.es", url: "https://milwaukee.es" },
                { label: "dewalt.es", url: "https://dewalt.es" },
                { label: "leroymerlin.es", url: "https://leroymerlin.es" },
              ].map((ref) => (
                <a
                  key={ref.label}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium transition-all hover:border-gray-400/40 hover:bg-gray-50/50"
                  style={{ color: ACCENT }}
                >
                  {ref.label}
                  <span className="text-xs text-gray-400">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Cible */}
          <div className="tigries-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.target.label")}
            </p>
            <ul className="space-y-2">
              {(["item1", "item2"] as const).map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-700">{t(`tigriesTrading.context.target.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photos + Langue */}
        <div className="tigries-reveal-item mt-6 grid gap-6 border-t border-gray-100 pt-6 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.photos.label")}
            </p>
            <p className="text-sm leading-6 text-gray-700">
              {t("tigriesTrading.context.photos.note")}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.langue.label")}
            </p>
            <p className="text-sm leading-6 text-gray-700">{t("tigriesTrading.context.langue.note")}</p>
          </div>
        </div>

        {/* À propos + Objectifs */}
        <div className="tigries-reveal-item mt-8 border-t border-gray-100 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("tigriesTrading.about.title")}
              </p>
              <p className="text-sm leading-7 text-gray-700">
                <Trans
                  i18nKey="tigriesTrading.about.paragraph1"
                  components={{ bold: <strong className="font-semibold text-gray-900" /> }}
                />
              </p>
              <p className="text-sm leading-7 text-gray-700">
                <Trans
                  i18nKey="tigriesTrading.about.paragraph2"
                  components={{ bold: <strong className="font-semibold text-gray-900" /> }}
                />
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("tigriesTrading.objectives.title")}
              </p>
              <ul className="space-y-2.5">
                {(["item1", "item2", "item3", "item4"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span className="text-sm text-gray-700">{t(`tigriesTrading.objectives.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── STRUCTURE DES PAGES ───────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.pages.sectionTitle")}
        </p>
        <div className="tigries-reveal-item flex flex-wrap gap-3">
          {(["inicio", "productos", "nosotros", "contacto", "faq"] as const).map((key) => {
            const optional = key === "faq";
            return (
              <div
                key={key}
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-4 py-2.5"
              >
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: optional ? "#9ca3af" : ACCENT }}
                />
                <span className={`text-sm ${optional ? "text-gray-400" : "text-gray-800"}`}>
                  {t(`tigriesTrading.pages.${key}.label`)}
                </span>
                <span className="text-xs text-gray-400">{t(`tigriesTrading.pages.${key}.sub`)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CHECKLIST ─────────────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <div className="tigries-reveal-item mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            {t("tigriesTrading.checklist.sectionTitle")}
          </p>
          <span className="text-xs font-semibold text-gray-400">
            {t("tigriesTrading.checklist.counter", { done, total })}
          </span>
        </div>

        <div className="tigries-reveal-item mb-8 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: ACCENT }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-8">
          {CHECKLIST_SECTIONS.map((section) => (
            <div key={section.id} className="tigries-reveal-item space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t(`tigriesTrading.checklist.sections.${section.id}.title`)}
              </p>
              <div className="space-y-2">
                {section.tasks.map((task) => {
                  const isChecked = checked.has(task.id);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggle(task.id)}
                      className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                        isChecked
                          ? "border-gray-100 bg-gray-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                          isChecked
                            ? "border-[#0f172a] bg-[#0f172a]"
                            : "border-gray-300 bg-white group-hover:border-gray-400"
                        }`}
                      >
                        <AnimatePresence>
                          {isChecked && (
                            <motion.svg
                              key="check-icon"
                              initial={{ opacity: 0, scale: 0.4 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.4 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              viewBox="0 0 10 8"
                              fill="none"
                              className="h-3 w-3"
                            >
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </div>

                      <span
                        className={`flex-1 text-sm transition-all duration-200 ${
                          isChecked ? "text-gray-400 line-through" : "text-gray-800"
                        }`}
                      >
                        {t(`tigriesTrading.checklist.sections.${section.id}.${task.id}`)}
                      </span>

                      <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {t("tigriesTrading.checklist.badgeEssentiel")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Livrable note */}
        <div className="tigries-reveal-item mt-6 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3">
          <p className="text-xs leading-5 text-amber-800">
            {t("tigriesTrading.checklist.livrableNote")}
          </p>
        </div>

        <AnimatePresence>
          {done === total && total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-8 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4"
            >
              <p className="text-sm font-semibold text-gray-900">
                {t("tigriesTrading.checklist.completionMessage")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RESSOURCES ────────────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.resources.sectionTitle")}
        </p>
        <div className="tigries-reveal-item grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r) => (
            <a
              key={r.key}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1.5 rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-gray-300/60 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                {t(`tigriesTrading.resources.items.${r.key}.label`)}
                <span className="ml-1 text-gray-400">↗</span>
              </span>
              <span className="text-xs leading-5 text-gray-500">
                {t(`tigriesTrading.resources.items.${r.key}.desc`)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
