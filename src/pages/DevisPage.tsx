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
  role: string;
  activitySector: string;
  service: string;
  monthlyVolume: string;
  averageWeight: string;
  packageType: string;
  pickupAddress: string;
  deliveryArea: string;
  city: string;
  postalCode: string;
  frequency: string;
  urgency: string;
  pickupWindow: string;
  deliveryWindow: string;
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
  role: "",
  activitySector: "",
  service: "",
  monthlyVolume: "",
  averageWeight: "",
  packageType: "",
  pickupAddress: "",
  deliveryArea: "",
  city: "",
  postalCode: "",
  frequency: "",
  urgency: "",
  pickupWindow: "",
  deliveryWindow: "",
  startDate: "",
  budget: "",
  message: "",
  consent: false,
};

export default function DevisPage() {
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
        ".devis-hero-anim",
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
        ".devis-reveal-card",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".devis-reveal-card",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".devis-reveal-group").forEach((group) => {
        const items = group.querySelectorAll(".devis-reveal-item");
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
        body: JSON.stringify({ ...form, formType: "devis" }),
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
        <section className="devis-reveal-card overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-2">
            <div className="order-1 relative min-h-[320px] overflow-hidden lg:min-h-[860px]">
              <img
                src={homeHeroImage}
                alt="ZK Concept"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
              <div className="devis-hero-anim absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                {t("common.quote")}
              </div>
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <h2 className="devis-hero-anim text-2xl font-semibold leading-tight text-white md:text-3xl">
                  {t("devis.hero.title")}
                </h2>
                <p className="devis-hero-anim max-w-md text-sm leading-6 text-white/85">
                  {t("devis.hero.description")}
                </p>
              </div>
            </div>

            <div className="order-2 p-6 md:p-10 lg:p-12">
              <div className="space-y-4 pb-8">
                <h1 className="devis-hero-anim text-3xl font-bold text-gray-900 md:text-4xl">
                  {t("devis.form.title")}
                </h1>
                <p className="devis-hero-anim max-w-2xl text-base text-gray-600">
                  {t("devis.form.description")}
                </p>
              </div>

              {submitted ? (
                <div className="devis-reveal-item mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("devis.form.success")}
                </div>
              ) : null}
              {errorMessage ? (
                <div className="devis-reveal-item mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#4b5563]">
                  {errorMessage}
                </div>
              ) : null}

              <form className="devis-reveal-group space-y-8" onSubmit={onSubmit}>
                <div className="devis-reveal-item space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {t("devis.form.sections.companyInfo")}
                  </p>
                </div>

                <div className="devis-reveal-item grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.fullName")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.companyPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.role")}
                    </span>
                    <input
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.rolePlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.activitySector")}
                    </span>
                    <input
                      value={form.activitySector}
                      onChange={(e) =>
                        setForm({ ...form, activitySector: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.activitySectorPlaceholder")}
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
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.phonePlaceholder")}
                    />
                  </label>
                </div>

                <div className="devis-reveal-item space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {t("devis.form.sections.logisticsNeed")}
                  </p>
                </div>

                <div className="devis-reveal-item grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.serviceDesired")} <span className="text-[#4b5563]">*</span>
                    </span>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
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
                      {t("devis.form.averageWeight")}
                    </span>
                    <input
                      value={form.averageWeight}
                      onChange={(e) =>
                        setForm({ ...form, averageWeight: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.averageWeightPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.packageType")}
                    </span>
                    <input
                      value={form.packageType}
                      onChange={(e) =>
                        setForm({ ...form, packageType: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.packageTypePlaceholder")}
                    />
                  </label>
                </div>

                <div className="devis-reveal-item space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {t("devis.form.sections.zonePlanning")}
                  </p>
                </div>

                <div className="devis-reveal-item grid gap-5 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.pickupAddress")}
                    </span>
                    <input
                      value={form.pickupAddress}
                      onChange={(e) =>
                        setForm({ ...form, pickupAddress: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.pickupAddressPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.deliveryArea")}
                    </span>
                    <input
                      value={form.deliveryArea}
                      onChange={(e) =>
                        setForm({ ...form, deliveryArea: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.deliveryAreaPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">{t("devis.form.city")}</span>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.cityPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.postalCode")}
                    </span>
                    <input
                      value={form.postalCode}
                      onChange={(e) =>
                        setForm({ ...form, postalCode: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.postalCodePlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.frequency")}
                    </span>
                    <select
                      value={form.frequency}
                      onChange={(e) =>
                        setForm({ ...form, frequency: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    >
                      <option value="">{t("forms.common.choose")}</option>
                      <option value="quotidien">{t("devis.form.frequencyOptions.daily")}</option>
                      <option value="hebdomadaire">{t("devis.form.frequencyOptions.weekly")}</option>
                      <option value="ponctuel">{t("devis.form.frequencyOptions.occasional")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.urgency")}
                    </span>
                    <select
                      value={form.urgency}
                      onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    >
                      <option value="">{t("forms.common.choose")}</option>
                      <option value="standard">{t("devis.form.urgencyOptions.standard")}</option>
                      <option value="prioritaire">{t("devis.form.urgencyOptions.priority")}</option>
                      <option value="urgent">{t("devis.form.urgencyOptions.urgent")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.pickupWindow")}
                    </span>
                    <input
                      value={form.pickupWindow}
                      onChange={(e) =>
                        setForm({ ...form, pickupWindow: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.pickupWindowPlaceholder")}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("devis.form.deliveryWindow")}
                    </span>
                    <input
                      value={form.deliveryWindow}
                      onChange={(e) =>
                        setForm({ ...form, deliveryWindow: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("devis.form.deliveryWindowPlaceholder")}
                    />
                  </label>
                </div>

                <div className="devis-reveal-item space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    {t("devis.form.sections.budgetDetails")}
                  </p>
                </div>

                <div className="devis-reveal-item grid gap-5 md:grid-cols-2">
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
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder={t("forms.common.budgetPlaceholder")}
                    />
                  </label>
                </div>

                <label className="devis-reveal-item space-y-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {t("forms.common.details")} <span className="text-[#4b5563]">*</span>
                  </span>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    placeholder={t("forms.common.detailsPlaceholder")}
                  />
                </label>

                <label className="devis-reveal-item flex items-start gap-3 text-sm text-gray-700">
                  <input
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    {t("forms.common.consent")}
                    <span className="ml-1 text-[#4b5563]">*</span>
                  </span>
                </label>

                <div className="devis-reveal-item space-y-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    {isSending ? t("forms.common.sending") : t("devis.form.submit")}
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
