import { useState } from "react";
import type { FormEvent } from "react";
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
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) return error.message;
    return "Erreur lors de l'envoi";
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
        body: JSON.stringify(form),
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
          details || `Erreur lors de l'envoi (HTTP ${response.status})`,
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
    <div className="mx-2 rounded-3xl bg-gray-50 py-10 md:mx-4 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <section className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-2">
            <div className="order-1 relative min-h-[320px] overflow-hidden lg:min-h-[860px]">
              <img
                src={homeHeroImage}
                alt="ZK Concept"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
              <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                Demander un devis
              </div>
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <h2 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                  Obtenez une estimation claire pour vos besoins logistiques.
                </h2>
                <p className="max-w-md text-sm leading-6 text-white/85">
                  Performance terrain, execution rigoureuse et accompagnement
                  operationnel pour vos activites logistiques.
                </p>
              </div>
            </div>

            <div className="order-2 p-6 md:p-10 lg:p-12">
              <div className="space-y-4 pb-8">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Demander un devis
                </h1>
                <p className="max-w-2xl text-base text-gray-600">
                  Remplissez ce formulaire detaille pour recevoir une estimation
                  adaptee a vos volumes, vos zones et vos contraintes
                  operationnelles.
                </p>
              </div>

              {submitted ? (
                <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  Merci, votre demande de devis a bien ete envoyee.
                </div>
              ) : null}
              {errorMessage ? (
                <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#4b5563]">
                  {errorMessage}
                </div>
              ) : null}

              <form className="space-y-8" onSubmit={onSubmit}>
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Informations entreprise
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Nom complet <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Jean Dupont"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Societe <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="ZK Logistics"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Fonction
                    </span>
                    <input
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Responsable logistique"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Secteur d'activite
                    </span>
                    <input
                      value={form.activitySector}
                      onChange={(e) =>
                        setForm({ ...form, activitySector: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="E-commerce, presse, retail..."
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Email <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="contact@societe.com"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Telephone <span className="text-[#4b5563]">*</span>
                    </span>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="+32 ..."
                    />
                  </label>
                </div>

                <div className="space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Besoin logistique
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Service souhaite <span className="text-[#4b5563]">*</span>
                    </span>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    >
                      <option value="">Choisir un service</option>
                      <option value="colis">Livraison de colis</option>
                      <option value="presse">Distribution de presse</option>
                      <option value="logistique">
                        Gestion logistique et coordination
                      </option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Volume mensuel estime
                    </span>
                    <input
                      value={form.monthlyVolume}
                      onChange={(e) =>
                        setForm({ ...form, monthlyVolume: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Ex: 1000 livraisons"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Poids moyen par colis
                    </span>
                    <input
                      value={form.averageWeight}
                      onChange={(e) =>
                        setForm({ ...form, averageWeight: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Ex: 2.5 kg"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Type de colis
                    </span>
                    <input
                      value={form.packageType}
                      onChange={(e) =>
                        setForm({ ...form, packageType: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Standard, fragile, palette..."
                    />
                  </label>
                </div>

                <div className="space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Zone et planning
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Adresse de collecte
                    </span>
                    <input
                      value={form.pickupAddress}
                      onChange={(e) =>
                        setForm({ ...form, pickupAddress: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Rue, numero, ville"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Zone de livraison
                    </span>
                    <input
                      value={form.deliveryArea}
                      onChange={(e) =>
                        setForm({ ...form, deliveryArea: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Belgique, Benelux, regional..."
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">Ville</span>
                    <input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Bruxelles"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Code postal
                    </span>
                    <input
                      value={form.postalCode}
                      onChange={(e) =>
                        setForm({ ...form, postalCode: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="1000"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Frequence
                    </span>
                    <select
                      value={form.frequency}
                      onChange={(e) =>
                        setForm({ ...form, frequency: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    >
                      <option value="">Choisir</option>
                      <option value="quotidien">Quotidien</option>
                      <option value="hebdomadaire">Hebdomadaire</option>
                      <option value="ponctuel">Ponctuel</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Niveau d'urgence
                    </span>
                    <select
                      value={form.urgency}
                      onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    >
                      <option value="">Choisir</option>
                      <option value="standard">Standard</option>
                      <option value="prioritaire">Prioritaire</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Creneau collecte
                    </span>
                    <input
                      value={form.pickupWindow}
                      onChange={(e) =>
                        setForm({ ...form, pickupWindow: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Ex: 08:00 - 11:00"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Creneau livraison
                    </span>
                    <input
                      value={form.deliveryWindow}
                      onChange={(e) =>
                        setForm({ ...form, deliveryWindow: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Ex: 13:00 - 18:00"
                    />
                  </label>
                </div>

                <div className="space-y-4 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Budget et details
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Date de demarrage
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
                      Budget indicatif
                    </span>
                    <input
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                      placeholder="Ex: 5 000 EUR / mois"
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-800">
                    Details de votre besoin <span className="text-[#4b5563]">*</span>
                  </span>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-0"
                    placeholder="Decrivez vos contraintes, vos delais et vos objectifs."
                  />
                </label>

                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-4 w-4"
                  />
                  <span>
                    J'accepte d'etre contacte par ZK Concept au sujet de cette
                    demande.
                    <span className="ml-1 text-[#4b5563]">*</span>
                  </span>
                </label>

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                  >
                    {isSending
                      ? "Envoi en cours..."
                      : "Envoyer ma demande de devis"}
                  </button>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-[#4b5563]">*</span>{" "}
                    Champs obligatoires
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
