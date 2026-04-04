import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import journauxImg from "../assets/journaux.jpg";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  driverLicense: boolean;
  vehicle: string;
  availability: string;
  experience: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  driverLicense: false,
  vehicle: "",
  availability: "",
  experience: "",
  message: "",
  consent: false,
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0";

const HIGHLIGHTS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    labelKey: "recrutement.highlights.weekdays",
    valueKey: "recrutement.highlights.weekdaysValue",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    labelKey: "recrutement.highlights.saturday",
    valueKey: "recrutement.highlights.saturdayValue",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    labelKey: "recrutement.highlights.route",
    valueKey: "recrutement.highlights.routeValue",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    labelKey: "recrutement.highlights.early",
    valueKey: "recrutement.highlights.earlyValue",
  },
];

export default function RecrutementPage() {
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
        ".recruit-hero-anim",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out", delay: 0.1 },
      );

      gsap.utils.toArray<HTMLElement>(".recruit-reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
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
        body: JSON.stringify({ ...form, formType: "recrutement" }),
      });

      if (!response.ok) {
        const raw = await response.text().catch(() => "");
        let details = raw;
        try {
          const parsed = JSON.parse(raw) as { error?: string; details?: string };
          details = `${parsed.error || ""} ${parsed.details || ""}`.trim() || raw;
        } catch {
          // keep raw
        }
        throw new Error(details || `${t("forms.common.sendError")} (HTTP ${response.status})`);
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
    <div ref={rootRef} className="mx-2 rounded-3xl bg-gray-50 py-10 md:mx-4 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* ── HERO BANNER ─────────────────────────────────────────────── */}
        <div className="recruit-hero-anim mb-10 overflow-hidden rounded-3xl bg-gray-900 px-8 py-14 md:px-14 md:py-20 relative">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              {t("recrutement.kicker")}
            </span>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              {t("recrutement.hero.title")}
            </h1>
            <p className="text-base leading-7 text-white/70 md:text-lg">
              {t("recrutement.hero.description")}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {HIGHLIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur"
                >
                  <span className="text-white/60">{h.icon}</span>
                  <div>
                    <p className="text-xs text-white/50">{t(h.labelKey)}</p>
                    <p className="text-xs font-semibold text-white">{t(h.valueKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* BG image */}
          <img
            src={journauxImg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.03]" />
          <div className="pointer-events-none absolute -bottom-12 right-12 h-56 w-56 rounded-full bg-white/[0.03]" />
        </div>

        {/* ── MAIN CARD ───────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-2">

            {/* ── LEFT — photo + info ─── */}
            <div className="relative order-1 min-h-[320px] overflow-hidden lg:order-2 lg:min-h-full">
              <img
                src={journauxImg}
                alt={t("recrutement.hero.title")}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur recruit-hero-anim">
                {t("recrutement.kicker")}
              </div>

              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                <p className="recruit-hero-anim text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  {t("recrutement.sidebar.conditionsTitle")}
                </p>
                <div className="space-y-3">
                  {HIGHLIGHTS.map((h, i) => (
                    <div key={i} className="recruit-hero-anim flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-white/50">{h.icon}</span>
                      <div>
                        <p className="text-xs text-white/55">{t(h.labelKey)}</p>
                        <p className="text-sm font-semibold text-white">{t(h.valueKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT — form ─── */}
            <div className="order-2 p-6 md:p-10 lg:order-1 lg:p-12">
              <div className="space-y-3 pb-8">
                <h2 className="recruit-hero-anim text-3xl font-bold text-gray-900 md:text-4xl">
                  {t("recrutement.form.title")}
                </h2>
                <p className="recruit-hero-anim max-w-lg text-base text-gray-500">
                  {t("recrutement.form.description")}
                </p>
              </div>

              {submitted && (
                <div className="recruit-reveal-item mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("recrutement.form.success")}
                </div>
              )}
              {errorMessage && (
                <div className="recruit-reveal-item mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-gray-600">
                  {errorMessage}
                </div>
              )}

              <form className="space-y-6" onSubmit={onSubmit}>
                {/* Identité */}
                <div className="recruit-reveal-item grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("recrutement.form.firstName")} <span className="text-gray-400">*</span>
                    </span>
                    <input
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className={inputClass}
                      placeholder={t("recrutement.form.firstNamePlaceholder")}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("recrutement.form.lastName")} <span className="text-gray-400">*</span>
                    </span>
                    <input
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className={inputClass}
                      placeholder={t("recrutement.form.lastNamePlaceholder")}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.email")} <span className="text-gray-400">*</span>
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder={t("forms.common.emailPlaceholder")}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("forms.common.phone")} <span className="text-gray-400">*</span>
                    </span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder={t("forms.common.phonePlaceholder")}
                    />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("recrutement.form.city")} <span className="text-gray-400">*</span>
                    </span>
                    <input
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className={inputClass}
                      placeholder={t("recrutement.form.cityPlaceholder")}
                    />
                  </label>
                </div>

                {/* Pratique */}
                <div className="recruit-reveal-item grid gap-4 sm:grid-cols-2">
                  <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 cursor-pointer hover:border-gray-300 transition-colors">
                    <input
                      required
                      type="checkbox"
                      checked={form.driverLicense}
                      onChange={(e) => setForm({ ...form, driverLicense: e.target.checked })}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-gray-900"
                    />
                    <span className="text-sm text-gray-800">
                      {t("recrutement.form.driverLicense")}
                      <span className="ml-1 text-gray-400">*</span>
                    </span>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("recrutement.form.vehicle")} <span className="text-gray-400">*</span>
                    </span>
                    <select
                      required
                      value={form.vehicle}
                      onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">{t("recrutement.form.choose")}</option>
                      <option value="voiture">{t("recrutement.form.vehicleCar")}</option>
                      <option value="moto">{t("recrutement.form.vehicleMoto")}</option>
                      <option value="velo">{t("recrutement.form.vehicleBike")}</option>
                      <option value="autre">{t("recrutement.form.vehicleOther")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("recrutement.form.availability")} <span className="text-gray-400">*</span>
                    </span>
                    <select
                      required
                      value={form.availability}
                      onChange={(e) => setForm({ ...form, availability: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">{t("recrutement.form.choose")}</option>
                      <option value="semaine">{t("recrutement.form.availWeekdays")}</option>
                      <option value="samedi">{t("recrutement.form.availSaturday")}</option>
                      <option value="semaine+samedi">{t("recrutement.form.availBoth")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {t("recrutement.form.experience")}
                    </span>
                    <select
                      value={form.experience}
                      onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">{t("recrutement.form.choose")}</option>
                      <option value="oui">{t("recrutement.form.expYes")}</option>
                      <option value="non">{t("recrutement.form.expNo")}</option>
                    </select>
                  </label>
                </div>

                {/* Motivation */}
                <label className="recruit-reveal-item block space-y-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {t("recrutement.form.message")}
                  </span>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass}
                    placeholder={t("recrutement.form.messagePlaceholder")}
                  />
                </label>

                {/* Consentement */}
                <label className="recruit-reveal-item flex items-start gap-3 text-sm text-gray-600">
                  <input
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-gray-900"
                  />
                  <span>
                    {t("forms.common.consent")}
                    <span className="ml-1 text-gray-400">*</span>
                  </span>
                </label>

                {/* Submit */}
                <div className="recruit-reveal-item space-y-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
                  >
                    {isSending ? t("forms.common.sending") : t("recrutement.form.submit")}
                  </button>
                  <p className="text-xs text-gray-400">
                    <span className="font-semibold text-gray-500">*</span>{" "}
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
