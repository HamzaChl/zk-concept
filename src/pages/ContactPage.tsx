import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logisticsImage from "../assets/contact.jpg";

type ContactFormState = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: ContactFormState = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-anim",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      gsap.utils
        .toArray<HTMLElement>(".contact-reveal-card")
        .forEach((card) => {
          const items = card.querySelectorAll(".contact-reveal-item");

          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );

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
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) return error.message;
    return "Erreur lors de l'envoi";
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage("");
    setIsSending(true);
    console.log("[CONTACT_DEBUG] submit:start", {
      fullName: form.fullName,
      email: form.email,
      subject: form.subject,
      messageLength: form.message.length,
    });

    try {
      const payload = {
        formType: "contact" as const,
        fullName: form.fullName,
        company: "Demande via page Contact",
        email: form.email,
        phone: "+32 489 39 57 80 | +32 486 92 31 82",
        subject: form.subject,
        service: `Contact - ${form.subject}`,
        message: form.message,
      };
      console.log("[CONTACT_DEBUG] submit:payload", payload);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("[CONTACT_DEBUG] submit:response-status", response.status);

      if (!response.ok) {
        const raw = await response.text().catch(() => "");
        console.log("[CONTACT_DEBUG] submit:error-raw-response", raw);
        let détails = raw;
        try {
          const parsed = JSON.parse(raw) as {
            error?: string;
            details?: string;
          };
          détails =
            `${parsed.error || ""} ${parsed.details || ""}`.trim() || raw;
        } catch {
          // Keep raw text as details
        }
        throw new Error(
          détails || `Erreur lors de l'envoi (HTTP ${response.status})`,
        );
      }

      const successBody = await response
        .json()
        .catch(() => ({ note: "No JSON body returned" }));
      console.log("[CONTACT_DEBUG] submit:success-response", successBody);
      setSubmitted(true);
      setForm(initialState);
    } catch (error: unknown) {
      console.error("[CONTACT_DEBUG] submit:catch", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      console.log("[CONTACT_DEBUG] submit:end");
      setIsSending(false);
    }
  };

  return (
    <section
      ref={rootRef}
      className="mx-2 rounded-3xl bg-gray-50 py-10 md:mx-4 md:py-14"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4 md:px-8">
        <div className="contact-reveal-card mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-[700px]">
            <img
              src={logisticsImage}
              alt="Logistique ZK Concept"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/75" />
            <div className="relative z-10 flex h-full items-start p-8 md:p-10">
              <div className="max-w-sm space-y-4">
                <h1 className="contact-hero-anim text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Contactez ZK Concept.
                </h1>
                <p className="contact-hero-anim text-sm leading-7 text-white/80 md:text-base">
                  Parlons de votre projet logistique et trouvons ensemble la
                  meilleure solution.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 space-y-3">
              <h2 className="contact-reveal-item text-3xl font-semibold text-gray-900">
                Contact
              </h2>
              <p className="contact-reveal-item text-sm leading-7 text-gray-600">
                Envoyez-nous votre demande et notre équipe vous répond
                rapidement.
              </p>
            </div>

            <div className="contact-reveal-item my-6 border-t border-gray-200" />

            {submitted ? (
              <div className="contact-reveal-item mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                Merci, votre message a bien ete envoyé.
              </div>
            ) : null}

            {errorMessage ? (
              <div className="contact-reveal-item mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#4b5563]">
                {errorMessage}
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={onSubmit}>
              <label className="block space-y-2">
                <span className="contact-reveal-item text-sm font-semibold text-gray-800">
                  Nom complet <span className="text-[#4b5563]">*</span>
                </span>
                <input
                  required
                  type="text"
                  placeholder="Nom complet"
                  value={form.fullName}
                  onChange={(event) =>
                    setForm({ ...form, fullName: event.target.value })
                  }
                  className="contact-reveal-item w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                />
              </label>

              <label className="block space-y-2">
                <span className="contact-reveal-item text-sm font-semibold text-gray-800">
                  Email <span className="text-[#4b5563]">*</span>
                </span>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  className="contact-reveal-item w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                />
              </label>

              <label className="block space-y-2">
                <span className="contact-reveal-item text-sm font-semibold text-gray-800">
                  Sujet <span className="text-[#4b5563]">*</span>
                </span>
                <input
                  required
                  type="text"
                  placeholder="Sujet"
                  value={form.subject}
                  onChange={(event) =>
                    setForm({ ...form, subject: event.target.value })
                  }
                  className="contact-reveal-item w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                />
              </label>

              <label className="block space-y-2">
                <span className="contact-reveal-item text-sm font-semibold text-gray-800">
                  Message <span className="text-[#4b5563]">*</span>
                </span>
                <textarea
                  required
                  rows={5}
                  placeholder="Message"
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                  className="contact-reveal-item w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={isSending}
                className="contact-reveal-item w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {isSending ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>

            <p className="contact-reveal-item mt-4 text-xs text-gray-500">
              Nous vous répondrons dans les plus brefs délais.
            </p>
            <p className="contact-reveal-item mt-1 text-xs text-gray-500">
              <span className="font-semibold text-[#4b5563]">*</span> Champs
              obligatoires
            </p>
          </div>
        </div>

        <div className="contact-reveal-card mx-auto w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="contact-reveal-item space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                Demandes générales
              </p>
              <p className="text-sm font-medium text-gray-900">
                zakaria@zkconcept.be
              </p>
              <p className="text-sm text-gray-700">+32 489 39 57 80</p>
            </div>

            <div className="contact-reveal-item space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                Partenariats
              </p>
              <p className="text-sm font-medium text-gray-900">
                zakaria@zkconcept.be
              </p>
              <p className="text-sm text-gray-700">+32 486 92 31 82</p>
            </div>

            <div className="contact-reveal-item space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                Adresse
              </p>
              <p className="text-sm font-medium text-gray-900">
                Romeinsesteenweg 200
              </p>
              <p className="text-sm text-gray-700">1800 Vilvoorde, Belgique</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
