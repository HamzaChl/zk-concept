import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  Clock,
  Handshake,
  Newspaper,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
  Users,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import viewImage from "../assets/view.jpg";
import { useTranslation } from "react-i18next";

export default function AmpPresentationPage() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const experienceCards = [
    {
      key: "tienen",
      badgeClass: "bg-gray-100 text-gray-700",
    },
    {
      key: "rotselaar",
      badgeClass: "bg-emerald-100 text-emerald-700",
    },
    {
      key: "objectif",
      badgeClass: "bg-gray-900 text-white",
    },
  ] as const;

  const teamItems = ["item1", "item2", "item3", "item4"] as const;

  const commitmentItems = [
    {
      key: "item1",
      icon: Clock,
    },
    {
      key: "item2",
      icon: AlertCircle,
    },
    {
      key: "item3",
      icon: Building2,
    },
    {
      key: "item4",
      icon: Users,
    },
    {
      key: "item5",
      icon: Zap,
    },
    {
      key: "item6",
      icon: Handshake,
    },
  ] as const;

  const flowSteps = [
    {
      key: "step1",
      icon: Newspaper,
    },
    {
      key: "step2",
      icon: PackageCheck,
    },
    {
      key: "step3",
      icon: Users,
    },
    {
      key: "step4",
      icon: ShieldCheck,
    },
  ] as const;

  const trainingItems = [
    {
      key: "item1",
      icon: BookOpen,
    },
    {
      key: "item2",
      icon: Smartphone,
    },
    {
      key: "item3",
      icon: UserRoundCheck,
    },
  ] as const;

  const zoneRows = [
    {
      key: "row1",
      printer: true,
      wifi: true,
      transpallet: true,
      experience: true,
    },
    {
      key: "row2",
      printer: true,
      wifi: true,
      transpallet: true,
      experience: true,
    },
    {
      key: "row3",
      printer: true,
      wifi: true,
      transpallet: true,
      experience: true,
    },
  ] as const;

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
      <section className="relative overflow-hidden rounded-3xl bg-[#1f2937]">
        <div className="h-[520px] w-full md:h-[620px]">
          <img
            src={viewImage}
            alt={t("ampPresentation.hero.title")}
            className="h-full w-full scale-105 object-cover blur-[4px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.12),transparent_40%)]" />
        </div>
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div className="max-w-3xl space-y-6">
            <span className="home-hero-anim inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              {t("ampPresentation.hero.badge")}
            </span>
            <h1 className="home-hero-anim text-4xl font-semibold leading-tight text-white md:text-6xl">
              {t("ampPresentation.hero.title")}
            </h1>
            <p className="home-hero-anim max-w-2xl text-base text-white/85 md:text-lg">
              {t("ampPresentation.hero.subtitle")}
            </p>
            <p className="home-hero-anim text-sm text-gray-300 md:text-base">
              {t("ampPresentation.hero.detail")}
            </p>
          </div>
        </div>
      </section>

      <section className="reveal-section grid gap-6 rounded-2xl border border-gray-200 p-8 md:grid-cols-2 md:items-center md:p-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b5563]">
            {t("ampPresentation.background.kicker")}
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("ampPresentation.background.title")}
          </h2>
          <p className="text-base text-gray-600">
            {t("ampPresentation.background.description")}
          </p>
        </div>
        <div className="reveal-stagger grid gap-4">
          {(["item1", "item2", "item3"] as const).map((item) => (
            <article
              key={item}
              className="reveal-item rounded-2xl border border-gray-200 p-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(`ampPresentation.background.items.${item}.title`)}
                </h3>
                <p className="text-sm leading-6 text-gray-600">
                  {t(`ampPresentation.background.items.${item}.text`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal-section space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          {t("ampPresentation.experience.title")}
        </h2>
        <div className="reveal-stagger grid gap-4 md:grid-cols-3">
          {experienceCards.map((card) => (
            <article
              key={card.key}
              className="reveal-item space-y-4 rounded-2xl border border-gray-200 p-8 md:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {t(`ampPresentation.experience.cards.${card.key}.title`)}
                </h3>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${card.badgeClass}`}
                >
                  {t(`ampPresentation.experience.cards.${card.key}.badge`)}
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-600">
                {t(`ampPresentation.experience.cards.${card.key}.text`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal-section grid gap-6 rounded-2xl border border-gray-200 p-8 md:grid-cols-2 md:items-center md:p-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b5563]">
            {t("ampPresentation.team.kicker")}
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("ampPresentation.team.title")}
          </h2>
          <p className="text-base text-gray-600">
            {t("ampPresentation.team.description")}
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full max-w-lg md:justify-self-end"
        >
          {teamItems.map((item, index) => (
            <AccordionItem key={item} value={`item-${index + 1}`}>
              <AccordionTrigger>
                {t(`ampPresentation.team.items.${item}.title`)}
              </AccordionTrigger>
              <AccordionContent>
                {t(`ampPresentation.team.items.${item}.text`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="reveal-section space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b5563]">
            {t("ampPresentation.flow.kicker")}
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("ampPresentation.flow.title")}
          </h2>
          <p className="max-w-3xl text-base text-gray-600 md:text-lg">
            {t("ampPresentation.flow.description")}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 p-8 md:p-10">
          <div className="reveal-stagger grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === flowSteps.length - 1;

              return (
                <div key={step.key} className="contents">
                  <article className="reveal-item h-full rounded-2xl border border-gray-200 p-6">
                    <div className="space-y-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                          {t(`ampPresentation.flow.steps.${step.key}.label`)}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {t(`ampPresentation.flow.steps.${step.key}.title`)}
                        </h3>
                        <p className="text-sm leading-6 text-gray-600">
                          {t(`ampPresentation.flow.steps.${step.key}.text`)}
                        </p>
                      </div>
                    </div>
                  </article>
                  {!isLast ? (
                    <>
                      <div className="reveal-item flex items-center justify-center md:hidden">
                        <ArrowDown
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="reveal-item hidden items-center justify-center md:flex">
                        <ArrowRight
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="reveal-section space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4b5563]">
            {t("ampPresentation.training.kicker")}
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("ampPresentation.training.title")}
          </h2>
          <p className="max-w-3xl text-base text-gray-600 md:text-lg">
            {t("ampPresentation.training.description")}
          </p>
        </div>
        <div className="reveal-stagger grid gap-4 md:grid-cols-3">
          {trainingItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.key}
                className="reveal-item space-y-4 rounded-2xl border border-gray-200 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t(`ampPresentation.training.items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {t(`ampPresentation.training.items.${item.key}.text`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="reveal-section space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("ampPresentation.zones.title")}
          </h2>
          <p className="max-w-3xl text-base text-gray-600 md:text-lg">
            {t("ampPresentation.zones.description")}
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                {[
                  "goLive",
                  "region",
                  "postalCode",
                  "routesPerDay",
                  "pricePerDrop",
                  "subhub",
                  "surface",
                  "printer",
                  "wifi",
                  "transpallet",
                  "drivers",
                  "experience",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500"
                  >
                    {t(`ampPresentation.zones.table.headers.${header}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {zoneRows.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {t(`ampPresentation.zones.table.rows.${row.key}.goLive`)}
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {t(`ampPresentation.zones.table.rows.${row.key}.region`)}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t(
                      `ampPresentation.zones.table.rows.${row.key}.postalCode`,
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t(
                      `ampPresentation.zones.table.rows.${row.key}.routesPerDay`,
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t(
                      `ampPresentation.zones.table.rows.${row.key}.pricePerDrop`,
                    )}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t(`ampPresentation.zones.table.rows.${row.key}.subhub`)}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t(`ampPresentation.zones.table.rows.${row.key}.surface`)}
                  </td>
                  <td className="px-4 py-4">
                    {row.printer ? (
                      <Check
                        className="mx-auto h-4 w-4 text-green-600"
                        aria-hidden="true"
                      />
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    {row.wifi ? (
                      <Check
                        className="mx-auto h-4 w-4 text-green-600"
                        aria-hidden="true"
                      />
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    {row.transpallet ? (
                      <Check
                        className="mx-auto h-4 w-4 text-green-600"
                        aria-hidden="true"
                      />
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    {t(`ampPresentation.zones.table.rows.${row.key}.drivers`)}
                  </td>
                  <td className="px-4 py-4">
                    {row.experience ? (
                      <Check
                        className="mx-auto h-4 w-4 text-green-600"
                        aria-hidden="true"
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm font-medium text-gray-600">
          {t("ampPresentation.zones.note")}
        </p>
      </section>

      <section className="reveal-section space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("ampPresentation.commitments.title")}
          </h2>
          <p className="max-w-3xl text-base text-gray-600 md:text-lg">
            {t("ampPresentation.commitments.description")}
          </p>
        </div>
        <div className="reveal-stagger grid gap-4 md:grid-cols-3">
          {commitmentItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.key}
                className="reveal-item space-y-4 rounded-2xl border border-gray-200 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t(`ampPresentation.commitments.items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">
                    {t(`ampPresentation.commitments.items.${item.key}.text`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
