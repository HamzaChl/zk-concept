import logisticsImage from "../assets/logistics2.jpg";

export default function ContactPage() {
  return (
    <section className="mx-2 rounded-3xl bg-gray-50 py-10 md:mx-4 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-[700px]">
            <img
              src={logisticsImage}
              alt="Logistique ZK Concept"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/75" />
            <div className="relative z-10 flex h-full items-start p-8 md:p-10">
              <div className="max-w-sm space-y-4">
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
                  Contactez ZK Concept.
                </h1>
                <p className="text-sm leading-7 text-white/80 md:text-base">
                  Parlons de votre projet logistique et trouvons ensemble la
                  meilleure solution.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-6 space-y-3">
              <span className="inline-flex h-8 w-8 rounded-full border border-gray-200 bg-gray-50" />
              <h2 className="text-3xl font-semibold text-gray-900">Contact</h2>
              <p className="text-sm leading-7 text-gray-600">
                Envoyez-nous votre demande et notre equipe vous repond
                rapidement.
              </p>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
              />
              <input
                type="text"
                placeholder="Sujet"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
              />
              <textarea
                rows={5}
                placeholder="Message"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-black focus:outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Envoyer le message
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-500">
              Nous vous repondrons dans les plus brefs delais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
