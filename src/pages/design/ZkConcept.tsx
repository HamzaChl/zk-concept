import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import zkLogo from "../../assets/logo-zk-w.png";

// ─── Types ───────────────────────────────────────────────────────────────────

type TaskId = string;

interface Task {
  id: TaskId;
  badge: "urgent" | "important" | "bonus";
  descKey?: string;
  dateKey?: string;
  done?: boolean;
}

interface TodoSection {
  id: string;
  icon: string;
  tasks: Task[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TODO_SECTIONS: TodoSection[] = [
  {
    id: "legal",
    icon: "",
    tasks: [
      { id: "bail", badge: "urgent", descKey: "zkConcept.todo.sections.legal.bail_desc" },
      { id: "contrat", badge: "urgent", descKey: "zkConcept.todo.sections.legal.contrat_desc" },
    ],
  },
  {
    id: "operations",
    icon: "",
    tasks: [
      {
        id: "visite",
        badge: "important",
        descKey: "zkConcept.todo.sections.operations.visite_desc",
        dateKey: "20 mars 2025",
        done: true,
      },
      {
        id: "planning-semaine",
        badge: "urgent",
        descKey: "zkConcept.todo.sections.operations.planningWeek_desc",
        dateKey: "Semaine",
      },
      {
        id: "planning-weekend",
        badge: "urgent",
        descKey: "zkConcept.todo.sections.operations.planningWeekend_desc",
        dateKey: "Week-end",
      },
    ],
  },
  {
    id: "tech",
    icon: "",
    tasks: [
      {
        id: "app-route",
        badge: "important",
        descKey: "zkConcept.todo.sections.tech.appRoute_desc",
      },
      {
        id: "app-planning",
        badge: "bonus",
        descKey: "zkConcept.todo.sections.tech.appPlanning_desc",
      },
    ],
  },
];

const ALL_TASK_IDS = TODO_SECTIONS.flatMap((s) => s.tasks.map((t) => t.id));
const PRE_DONE_IDS = TODO_SECTIONS.flatMap((s) =>
  s.tasks.filter((t) => t.done).map((t) => t.id),
);
const STORAGE_KEY = "zk-concept-internal-todo";
const ACCENT = "#111827";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadChecked(): Set<TaskId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as TaskId[]);
  } catch {
    // ignore
  }
  // Pre-check tasks marked as done by default
  const initial = new Set(PRE_DONE_IDS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(initial)));
  } catch {
    // ignore
  }
  return initial;
}

function saveChecked(next: Set<TaskId>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  } catch {
    // ignore
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ZkConceptPage() {
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
        ".zk-hero-anim",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1 },
      );

      gsap.utils.toArray<HTMLElement>(".zk-reveal-card").forEach((card) => {
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

        const items = card.querySelectorAll(".zk-reveal-item");
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
      <div className="zk-hero-anim flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-sm font-semibold text-gray-900">{t("zkConcept.status.label")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
            {t("zkConcept.status.counter", { done, total })}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
            {progress}%
          </span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-14 md:py-20"
        style={{ backgroundColor: ACCENT }}
      >
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="max-w-xl space-y-5">
            <p className="zk-hero-anim text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              {t("zkConcept.hero.kicker")}
            </p>
            <h1 className="zk-hero-anim text-4xl leading-tight text-white md:text-5xl">
              {t("zkConcept.hero.title").split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="zk-hero-anim text-base leading-7 text-white/70 md:text-lg">
              {t("zkConcept.hero.description")}
            </p>
          </div>

          {/* Logo card */}
          <div className="zk-hero-anim shrink-0 self-center [perspective:800px]">
            <div
              className="group relative rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition-transform duration-300 ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.06)] md:p-8"
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
                src={zkLogo}
                alt="ZK Studio"
                className="h-16 w-auto object-contain md:h-20"
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.03]" />
        <div className="pointer-events-none absolute -bottom-12 right-12 h-56 w-56 rounded-full bg-white/[0.03]" />
        <div className="pointer-events-none absolute bottom-6 left-8 h-24 w-24 rounded-full bg-white/[0.02]" />
      </div>

      {/* ── TODO LIST ─────────────────────────────────────────────────── */}
      <div className="zk-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        {/* Header + progress */}
        <div className="zk-reveal-item mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            {t("zkConcept.todo.sectionTitle")}
          </p>
          <span className="text-xs font-semibold text-gray-400">
            {t("zkConcept.todo.counter", { done, total })}
          </span>
        </div>

        <div className="zk-reveal-item mb-10 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: ACCENT }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {TODO_SECTIONS.map((section) => (
            <div key={section.id} className="zk-reveal-item space-y-3">
              {/* Section title */}
              <div className="flex items-center gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                  {t(`zkConcept.todo.sections.${section.id}.title`)}
                </p>
              </div>

              <div className="space-y-2">
                {section.tasks.map((task) => {
                  const isChecked = checked.has(task.id);
                  const labelKey = `zkConcept.todo.sections.${section.id}.${
                    task.id === "planning-semaine" ? "planningWeek" :
                    task.id === "planning-weekend" ? "planningWeekend" :
                    task.id === "app-route" ? "appRoute" :
                    task.id === "app-planning" ? "appPlanning" :
                    task.id
                  }`;
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggle(task.id)}
                      className={`group flex w-full items-start gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                        isChecked
                          ? "border-gray-100 bg-gray-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                          isChecked
                            ? "border-gray-800 bg-gray-800"
                            : "border-gray-300 bg-white group-hover:border-gray-400"
                        }`}
                      >
                        <AnimatePresence>
                          {isChecked && (
                            <motion.svg
                              key="check"
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

                      {/* Content */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-sm font-medium transition-all duration-200 ${
                              isChecked ? "text-gray-400 line-through" : "text-gray-900"
                            }`}
                          >
                            {t(labelKey)}
                          </span>
                          {task.dateKey && (
                            <span
                              className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                                isChecked
                                  ? "bg-gray-100 text-gray-400 line-through"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {task.dateKey}
                            </span>
                          )}
                        </div>
                        {task.descKey && (
                          <p
                            className={`text-xs leading-5 transition-all duration-200 ${
                              isChecked ? "text-gray-300" : "text-gray-500"
                            }`}
                          >
                            {t(task.descKey)}
                          </p>
                        )}
                      </div>

                      {/* Badge */}
                      {task.badge === "urgent" && !isChecked && (
                        <span className="mt-0.5 shrink-0 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                          {t("zkConcept.todo.badges.urgent")}
                        </span>
                      )}
                      {task.badge === "important" && !isChecked && (
                        <span className="mt-0.5 shrink-0 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600">
                          {t("zkConcept.todo.badges.important")}
                        </span>
                      )}
                      {task.badge === "bonus" && !isChecked && (
                        <span className="mt-0.5 shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                          {t("zkConcept.todo.badges.bonus")}
                        </span>
                      )}
                      {isChecked && (
                        <span className="mt-0.5 shrink-0 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-600">
                          {t("zkConcept.todo.badges.done")}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Completion message */}
        <AnimatePresence>
          {done === total && total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-8 rounded-xl border border-gray-200 bg-gray-900 px-5 py-4"
            >
              <p className="text-sm font-semibold text-white">
                {t("zkConcept.todo.completionMessage")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
