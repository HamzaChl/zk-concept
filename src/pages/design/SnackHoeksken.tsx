import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import snackLogo from "../../assets/logo-partners/logo-Snack-t-Hoeksken-1.png";

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
const STORAGE_KEY = "zk-snack-hoeksken-brief";
const ACCENT = "#c0392b";
const HERO_BG = "#c0392b";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadChecked(): Set<TaskId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as TaskId[]);
  } catch {
    // ignore
  }
  // Project is done — pre-check everything on first visit
  const all = new Set(ALL_TASK_IDS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(all)));
  } catch {
    // ignore
  }
  return all;
}

function saveChecked(next: Set<TaskId>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  } catch {
    // ignore
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SnackHoekskenPage() {
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
        ".snack-hero-anim",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1 },
      );

      gsap.utils.toArray<HTMLElement>(".snack-reveal-card").forEach((card) => {
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

        const items = card.querySelectorAll(".snack-reveal-item");
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

      {/* ── STATUS BANNER — TERMINÉ ────────────────────────────────────── */}
      <div className="snack-hero-anim flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
            <svg viewBox="0 0 10 8" fill="none" className="h-3 w-3">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-green-800">{t("snackHoeksken.status.label")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-green-600">
            {t("snackHoeksken.status.deadline")}
          </span>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 line-through decoration-green-500">
            {t("snackHoeksken.status.deadlineDate")}
          </span>
          <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            {t("snackHoeksken.status.respected")}
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
            <p className="snack-hero-anim text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              {t("snackHoeksken.hero.kicker")}
            </p>
            <h1 className="snack-hero-anim text-4xl leading-tight text-white line-through decoration-white/40 md:text-5xl">
              Snack 't Hoeksken
            </h1>
            <div className="snack-hero-anim flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {t("snackHoeksken.hero.deliveredBadge")}
              </span>
              <span className="text-sm text-white/60">{t("snackHoeksken.hero.url")}</span>
            </div>
            <p className="snack-hero-anim text-base leading-7 text-white/70 md:text-lg">
              {t("snackHoeksken.hero.description")}
            </p>
          </div>

          {/* Logo card */}
          <div className="snack-hero-anim shrink-0 self-center [perspective:800px]">
            <div
              className="group relative rounded-2xl border border-white/20 bg-white p-6 shadow-sm transition-transform duration-300 ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.06)] md:p-8"
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
                src={snackLogo}
                alt="Logo Snack 't Hoeksken"
                className="h-20 w-auto object-contain md:h-28"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(192,57,43,0.08)_20%,transparent_80%)]" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-black/[0.08]" />
        <div className="pointer-events-none absolute -bottom-12 right-12 h-56 w-56 rounded-full bg-black/[0.08]" />
        <div className="pointer-events-none absolute bottom-6 left-8 h-24 w-24 rounded-full bg-black/[0.05]" />
      </div>

      {/* ── CONTEXTE ──────────────────────────────────────────────────── */}
      <div className="snack-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="snack-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("snackHoeksken.context.sectionTitle")}
        </p>

        <div className="snack-reveal-item mb-6 flex items-center gap-3">
          <span
            className="inline-block rounded-md px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-white"
            style={{ backgroundColor: ACCENT }}
          >
            Snack Pitta 't Hoeksken
          </span>
          <p className="text-xs italic text-gray-400">
            {t("snackHoeksken.context.tagline")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Direction artistique */}
          <div className="snack-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("snackHoeksken.context.direction.label")}
            </p>
            <ul className="space-y-2">
              {(["item1", "item2", "item3"] as const).map((key, i) => (
                <li key={key} className="flex items-center gap-2.5">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: i === 2 ? ACCENT : "#d1d5db" }}
                  />
                  <span className={`text-sm ${i === 2 ? "font-medium text-gray-900" : "text-gray-700"}`}>
                    {t(`snackHoeksken.context.direction.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Langue */}
          <div className="snack-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("snackHoeksken.context.langue.label")}
            </p>
            <p className="text-sm leading-6 text-gray-700">{t("snackHoeksken.context.langue.note")}</p>
          </div>

          {/* Cible */}
          <div className="snack-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("snackHoeksken.context.target.label")}
            </p>
            <ul className="space-y-2">
              {(["item1", "item2"] as const).map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-700">{t(`snackHoeksken.context.target.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* À propos + Objectifs */}
        <div className="snack-reveal-item mt-8 border-t border-gray-100 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("snackHoeksken.about.title")}
              </p>
              <p className="text-sm leading-7 text-gray-700">
                <Trans
                  i18nKey="snackHoeksken.about.paragraph1"
                  components={{ bold: <strong className="font-semibold text-gray-900" /> }}
                />
              </p>
              <p className="text-sm leading-7 text-gray-700">
                <Trans
                  i18nKey="snackHoeksken.about.paragraph2"
                  components={{ bold: <strong className="font-semibold text-gray-900" /> }}
                />
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("snackHoeksken.objectives.title")}
              </p>
              <ul className="space-y-2.5">
                {(["item1", "item2", "item3", "item4"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span className="text-sm text-gray-700">{t(`snackHoeksken.objectives.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── STRUCTURE DES PAGES ───────────────────────────────────────── */}
      <div className="snack-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="snack-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("snackHoeksken.pages.sectionTitle")}
        </p>
        <div className="snack-reveal-item flex flex-wrap gap-3">
          {(["hero", "menu", "about", "footer"] as const).map((key) => (
            <div
              key={key}
              className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-4 py-2.5"
            >
              <div
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-sm text-gray-800">{t(`snackHoeksken.pages.${key}.label`)}</span>
              <span className="text-xs text-gray-400">{t(`snackHoeksken.pages.${key}.sub`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHECKLIST ─────────────────────────────────────────────────── */}
      <div className="snack-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <div className="snack-reveal-item mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            {t("snackHoeksken.checklist.sectionTitle")}
          </p>
          <span className="text-xs font-semibold text-green-600">
            {t("snackHoeksken.checklist.counter", { done, total })}
          </span>
        </div>

        <div className="snack-reveal-item mb-8 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-8">
          {CHECKLIST_SECTIONS.map((section) => (
            <div key={section.id} className="snack-reveal-item space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t(`snackHoeksken.checklist.sections.${section.id}.title`)}
              </p>
              <div className="space-y-2">
                {section.tasks.map((task) => {
                  const isChecked = checked.has(task.id);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggle(task.id)}
                      className="group flex w-full items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-left transition-all duration-200"
                    >
                      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-green-500 bg-green-500 transition-all duration-200">
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

                      <span className="flex-1 text-sm text-gray-400 line-through">
                        {t(`snackHoeksken.checklist.sections.${section.id}.${task.id}`)}
                      </span>

                      <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        {t("snackHoeksken.checklist.badgeDone")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {done === total && total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4"
            >
              <p className="text-sm font-semibold text-green-800">
                {t("snackHoeksken.checklist.completionMessage")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DIRECTION ARTISTIQUE & RÉSULTAT FINAL ─────────────────────── */}
      <div className="snack-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="snack-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("snackHoeksken.result.sectionTitle")}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* DA appliquée */}
          <div className="snack-reveal-item space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("snackHoeksken.result.styleLabel")}
              </p>
              <ul className="space-y-2">
                {(["style1", "style2", "style3"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span className="text-sm text-gray-700">{t(`snackHoeksken.result.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("snackHoeksken.result.paletteLabel")}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg shadow-sm" style={{ backgroundColor: "#c0392b" }} />
                <div className="h-8 w-8 rounded-lg border border-gray-200 shadow-sm" style={{ backgroundColor: "#ffffff" }} />
                <div className="h-8 w-8 rounded-lg shadow-sm" style={{ backgroundColor: "#1a1a1a" }} />
              </div>
              <p className="text-xs text-gray-400">{t("snackHoeksken.result.paletteNote")}</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("snackHoeksken.result.typoLabel")}
              </p>
              <div className="space-y-1.5">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{t("snackHoeksken.result.typoHeadings")}</span> Bebas Neue / Anton
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{t("snackHoeksken.result.typoBody")}</span> Inter / Open Sans
                </p>
              </div>
            </div>
          </div>

          {/* Structure livrée */}
          <div className="snack-reveal-item space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("snackHoeksken.result.structureLabel")}
            </p>
            <div className="space-y-3">
              {(["structureHero", "structureMenu", "structureAbout", "structureFooter"] as const).map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <p className="mb-1 text-xs font-semibold text-gray-900">
                    {t(`snackHoeksken.result.${key}.section`)}
                  </p>
                  <p className="text-xs leading-5 text-gray-500">
                    {t(`snackHoeksken.result.${key}.detail`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Intégration + site live */}
        <div className="snack-reveal-item mt-6 border-t border-gray-100 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("snackHoeksken.result.integrationLabel")}
              </p>
              <p className="text-sm text-gray-700">
                {t("snackHoeksken.result.integrationNote")}
              </p>
            </div>
            <a
              href="https://snack-thoeksen.be"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all hover:shadow-md"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              {t("snackHoeksken.result.viewSite")}
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Screenshot placeholder */}
        <div className="snack-reveal-item mt-6 overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-gray-50">
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: ACCENT + "15" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" style={{ color: ACCENT }}>
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7" cy="6" r="1" fill="currentColor" />
                <circle cx="10" cy="6" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-700">{t("snackHoeksken.result.screenshotTitle")}</p>
              <p className="text-xs text-gray-400">
                {t("snackHoeksken.result.screenshotNote")}{" "}
                <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs">
                  src/assets/logo-partners/
                </code>
              </p>
            </div>
            <a
              href="https://snack-thoeksen.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold underline underline-offset-2"
              style={{ color: ACCENT }}
            >
              {t("snackHoeksken.result.visitSite")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
