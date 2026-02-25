import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import homeHeroImage from "../assets/work-together.jpg";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  monthlyVolume: string;
  startDate: string;
  budget: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  monthlyVolume: "",
  startDate: "",
  budget: "",
  message: "",
  consent: false,
};

export default function WorkTogetherPage() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-hero-anim",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".work-reveal-card",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-reveal-card",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".work-reveal-group").forEach((group) => {
        const items = group.querySelectorAll(".work-reveal-item");
        if (items.length === 0) return;

        gsap.fromTo(
          items,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) return error.message;
    return t("forms.common.sendError");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, formType: "work_together" }),
      });

      if (!response.ok) {
        const raw = await response.text().catch(() => "");
        let details = raw;
        try {
          const parsed = JSON.parse(raw) as {
            error?: string;
            details?: string;
          };
          details =
            `${parsed.error || ""} ${parsed.details || ""}`.trim() || raw;
        } catch {
          // Keep raw text as details
        }
        throw new Error(
          details || `${t("forms.common.sendError")} (HTTP ${response.status})`,
        );
      }

      setSubmitted(true);
      setForm(initialState);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className="mx-2 rounded-3xl bg-gray-50 py-10 md:mx-4 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <section className="work-reveal-card overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-2">
            <div className="order-1 relative min-h-[320px] overflow-hidden lg:order-2 lg:min-h-[860px]">
              <img
                src={homeHeroImage}
                alt="ZK Concept"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
              <div className="work-hero-anim absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                {t("common.workTogether")}
              </div>
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <h2 className="work-hero-anim text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {t("workTogether.hero.title")}
                </h2>
                <p className="work-hero-anim max-w-md text-sm leading-6 text-white/85">
                  {t("workTogether.hero.description")}
                </p>
              </div>
            </div>

            <div className="order-2 p-6 md:p-10 lg:order-1 lg:p-12">
              <div className="space-y-4 pb-8">
                <h1 className="work-hero-anim text-3xl font-bold text-gray-900 md:text-4xl">
                  {t("workTogether.form.title")}
                </h1>
                <p className="work-hero-anim max-w-2xl text-base text-gray-600">
                  {t("workTogether.form.description")}
                </p>
              </div>

              {submitted ? (
                <div className="work-reveal-item mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("workTogether.form.success")}
                </div>
              ) : null}
              {errorMessage ? (
                <div className="work-reveal-item mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#4b5563]">
                  {errorMessage}
                </div>
              ) : null}

              <form className="work-reveal-group space-y-8" onSubmit={onSubmit}>
                <div className="work-reveal-item grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.fullName")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.fullNamePlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.company")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.companyPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.email")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.emailPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.phone")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.phonePlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.serviceDesired")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <select
                      required
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    >
                      <option value="">{t("forms.common.chooseService")}</option>
                      <option value="colis">{t("forms.services.colis")}</option>
                      <option value="presse">{t("forms.services.presse")}</option>
                      <option value="logistique">{t("forms.services.logistique")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.monthlyVolume")}
                    </span>
                    <input
                      value={form.monthlyVolume}
                      onChange={(e) =>
                        setForm({ ...form, monthlyVolume: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.monthlyVolumePlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.startDate")}
                    </span>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.budget")}
                    </span>
                    <input
                      value={form.budget}
                      onChange={(e) =>
                        setForm({ ...form, budget: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.budgetPlaceholder")}
                    />
                  </label>
                </div>

                <label className="work-reveal-item space-y-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {t("forms.common.details")} <span className="text-[#4b5563]">*</span>
                  </span>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    placeholder={t("forms.common.detailsPlaceholder")}
                  />
                </label>

                <label className="work-reveal-item flex items-start gap-3 text-sm text-gray-700">
                  <input
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) =>
                      setForm({ ...form, consent: e.target.checked })
                    }
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    {t("forms.common.consent")}
                    <span className="ml-1 text-[#4b5563]">*</span>
                  </span>
                </label>

                <div className="work-reveal-item space-y-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    {isSending
                      ? t("forms.common.sending")
                      : t("workTogether.form.submit")}
                  </button>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-[#4b5563]">*</span>{" "}
                    {t("forms.common.requiredFields")}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
