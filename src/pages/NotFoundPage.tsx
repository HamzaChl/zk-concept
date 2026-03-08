import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[calc(100vh-240px)] items-center justify-center overflow-hidden">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-[34vw] font-bold leading-none tracking-[-0.05em] text-gray-900/[0.06] md:text-[24vw]"
      >
        404
      </p>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h1 className="text-5xl font-bold leading-tight text-[#111827] md:text-7xl">
          Page introuvable
        </h1>
        <p className="mt-5 max-w-xl text-lg text-[#4b5563] md:text-xl">
          La page que vous cherchez n&apos;existe pas ou a ete deplacee.
        </p>

        <Link
          to="/"
          className="mt-10 inline-flex rounded-full bg-[#111827] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a]"
        >
          Retourner a l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
