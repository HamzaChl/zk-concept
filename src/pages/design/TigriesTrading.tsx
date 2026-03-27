import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import tigrieLogo from "../../assets/logo-partners/logo-tigries.png";

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
    id: "pages",
    tasks: [
      { id: "p1", badge: "essentiel" },
      { id: "p2", badge: "essentiel" },
      { id: "p3", badge: "essentiel" },
      { id: "p4", badge: "essentiel" },
      { id: "p5", badge: "essentiel" },
      { id: "p6", badge: "essentiel" },
      { id: "p7", badge: "essentiel" },
    ],
  },
  {
    id: "transversal",
    tasks: [
      { id: "t1", badge: "essentiel" },
      { id: "t2", badge: "essentiel" },
      { id: "t3", badge: "essentiel" },
      { id: "t4", badge: "essentiel" },
    ],
  },
];

const ALL_TASK_IDS = CHECKLIST_SECTIONS.flatMap((s) => s.tasks.map((t) => t.id));
const STORAGE_KEY = "zk-tigries-trading-brief";
const ACCENT = "#0f172a";
const HERO_BG = "#f7af2f";

const PAGE_TABS = [
  { id: "accueil", label: "Accueil" },
  { id: "services", label: "Services" },
  { id: "abonnements", label: "Abonnements" },
  { id: "apropos", label: "À Propos" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
  { id: "mentions", label: "Mentions légales" },
  { id: "transversal", label: "Transversal" },
];

const RESOURCES = [
  { key: "dribbble", url: "https://dribbble.com" },
  { key: "behance", url: "https://behance.net" },
  { key: "awwwards", url: "https://awwwards.com" },
  { key: "googleFonts", url: "https://fonts.google.com" },
  { key: "coolors", url: "https://coolors.co" },
  { key: "unsplash", url: "https://unsplash.com" },
  { key: "pexels", url: "https://pexels.com" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadChecked(): Set<TaskId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as TaskId[]);
  } catch {
    // ignore
  }
  return new Set();
}

function saveChecked(next: Set<TaskId>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
  } catch {
    // ignore
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">{label}</p>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-2 last:border-0">
      <span className="w-44 shrink-0 text-xs text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
}


function PricingCard({
  title,
  price,
  target,
  features,
  highlight,
}: {
  title: string;
  price: string;
  target: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`space-y-4 rounded-xl border p-5 ${
        highlight ? "border-amber-300 bg-amber-50/40" : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              highlight ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"
            }`}
          >
            {price}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-400">{target}</p>
      </div>
      <ul className="space-y-1.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
            <span className="mt-0.5 text-gray-400">—</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <p className="mb-1 text-sm font-semibold text-gray-900">{q}</p>
      <p className="text-sm leading-6 text-gray-600">{a}</p>
    </div>
  );
}

// ─── Page Content ─────────────────────────────────────────────────────────────

function AccueilContent() {
  return (
    <div className="space-y-6">
      <Block label="Hero">
        <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-xl font-bold leading-tight text-gray-900">
            Les machines qui font avancer votre business
          </p>
          <p className="text-sm leading-6 text-gray-600">
            Tigries Global Trading est un distributeur européen de machines-outils et équipements
            industriels. Vente, location et maintenance — tout ce dont vos équipes ont besoin, livré
            rapidement.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-gray-900 bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
              Découvrir nos services
            </span>
            <span className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700">
              Nos formules abonnement
            </span>
          </div>
        </div>
      </Block>

      <Block label="Stats">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { value: "+500", label: "références produits" },
            { value: "3 pays", label: "Espagne · France · NL" },
            { value: "24h", label: "support technique" },
            { value: "2026", label: "fondée à Vélez-Málaga" },
          ].map((s) => (
            <div
              key={s.value}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-3 py-3 text-center"
            >
              <span className="text-lg font-bold text-gray-900">{s.value}</span>
              <span className="mt-0.5 text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block label="Marques distribuées">
        <div className="flex flex-wrap gap-2">
          {["DeWalt", "Bosch", "Makita", "Hilti", "Milwaukee", "Metabo", "Stanley"].map((b) => (
            <span
              key={b}
              className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400 italic">Marques premium · prix compétitifs · livraison rapide en Europe</p>
      </Block>

      <Block label="Accroche section abonnements">
        <p className="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-sm italic leading-6 text-amber-900">
          "Un partenaire digital, pas juste un fournisseur. Gérez votre parc machines, commandez vos
          consommables et formez vos équipes — tout en un seul abonnement mensuel."
        </p>
      </Block>

      <Block label="Section services (aperçu)">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            "Vente de matériel",
            "E-commerce 24h/24",
            "Location courte & longue durée",
            "Import / Export",
            "Gestion de parc (SaaS)",
            "Formation & support",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span className="text-xs text-gray-700">{s}</span>
            </div>
          ))}
        </div>
      </Block>

      <Block label="CTA abonnements (bas de page)">
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Nos formules</p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "STARTER", price: "1.000€/mois" },
              { name: "PRO", price: "3.500€/mois" },
              { name: "ENTERPRISE", price: "8.000€/mois" },
            ].map((f) => (
              <div key={f.name} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <span className="text-xs font-bold text-gray-900">{f.name}</span>
                <span className="text-xs text-gray-400">{f.price}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <span className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">Voir les formules</span>
            <span className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700">Demander un devis</span>
          </div>
        </div>
      </Block>
    </div>
  );
}

function ServicesContent() {
  const services = [
    {
      title: "Vente de machines-outils",
      desc: "Large catalogue de machines électriques, outils de perçage, matériel de chantier et équipements industriels. Marques premium, prix compétitifs, livraison rapide en Europe.",
      pour: "Tous les professionnels",
    },
    {
      title: "E-commerce & commandes en ligne",
      desc: "Commandez 24h/24 via notre plateforme. Catalogue complet, suivi de commande en temps réel, facturation automatisée. Membres abonnés : tarifs préférentiels exclusifs.",
      pour: "Abonnés · accès privilégié",
    },
    {
      title: "Location de matériel",
      desc: "Location courte et longue durée sans opérateur. Idéal pour chantiers ponctuels, tests avant achat ou pics d'activité saisonniers.",
      pour: "Chantiers ponctuels · BTP",
    },
    {
      title: "Import / Export & distribution",
      desc: "Sourcing international, stockage et redistribution. Gestion de l'approvisionnement et de la logistique pour grandes commandes, en Europe et au-delà.",
      pour: "Grands comptes · revendeurs",
    },
    {
      title: "Gestion de parc machines (SaaS)",
      desc: "Inventaire, alertes d'entretien automatiques, historique d'utilisation, rapports. Accessible depuis n'importe quel appareil, inclus dès la formule Starter.",
      pour: "Tous les abonnés",
    },
    {
      title: "Formation & support technique",
      desc: "Bibliothèque de formations vidéo, hotline prioritaire, audits de parc en ligne. Accompagnement complet inclus dans les formules abonnement.",
      pour: "Pro & Enterprise",
    },
  ];

  return (
    <div className="space-y-5">
      <p className="text-sm leading-6 text-gray-700">
        Chez Tigries Global Trading, nous proposons bien plus que de la vente. De la commande en ligne à
        la gestion complète de votre parc machines, nous accompagnons les professionnels européens à
        chaque étape de leur activité.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((s, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-400">{`0${i + 1}`}</span>
                <p className="text-sm font-semibold text-gray-900">{s.title}</p>
              </div>
              <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">{s.pour}</span>
            </div>
            <p className="text-xs leading-5 text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <p className="text-xs leading-5 text-gray-500">
          <span className="font-semibold text-gray-700">CTA de la page :</span> bouton "Demander un devis"
          en fin de chaque service + formulaire pré-rempli avec le service sélectionné.
        </p>
      </div>
    </div>
  );
}

function AbonnementsContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-6 text-gray-700">
        Nos abonnements donnent accès à une suite complète de services digitaux et physiques. Engagement
        12 mois, résiliable ensuite avec un mois de préavis.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <PricingCard
          title="STARTER"
          price="1.000€/mois"
          target="Artisans, indépendants, TPE"
          features={[
            "Parc machines jusqu'à 10 machines",
            "Box consommables mensuelle standard",
            "Support chat & email (réponse 48h)",
            "Catalogue membres -10%",
            "1 formation vidéo/mois",
            "Newsletter mensuelle",
          ]}
        />
        <PricingCard
          title="PRO"
          price="3.500€/mois"
          target="PME, BTP, ateliers"
          highlight
          features={[
            "Tout le Starter +",
            "Hotline technique prioritaire (4h)",
            "SaaS avancé + rapports trimestriels",
            "Location courte durée -20%",
            "2 audits de parc/an",
            "Formation illimitée",
            "SLA matériel 48h",
          ]}
        />
        <PricingCard
          title="ENTERPRISE"
          price="8.000€/mois"
          target="Grands comptes, groupes industriels"
          features={[
            "Tout le Pro +",
            "Account Manager dédié (5j/7)",
            "Dashboard + reporting mensuel",
            "Intégration API avec votre ERP",
            "Formations live sur mesure",
            "SLA garanti 24h",
            "Sourcing sur demande",
            "Audits illimités",
          ]}
        />
      </div>

      {/* Tableau comparatif rapide */}
      <Block label="Comparatif rapide">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-2.5 text-left font-semibold text-gray-500">Fonctionnalité</th>
                <th className="px-3 py-2.5 text-center font-semibold text-gray-700">Starter</th>
                <th className="px-3 py-2.5 text-center font-semibold text-amber-700">Pro</th>
                <th className="px-3 py-2.5 text-center font-semibold text-gray-700">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Gestion de parc (SaaS)", "10 machines", "Illimité", "Illimité"],
                ["Box consommables", "Standard", "Standard", "Sur mesure"],
                ["Support", "Chat/email 48h", "Hotline 4h", "Account Manager"],
                ["Réduction catalogue", "-10%", "-10%", "Négocié"],
                ["Location de matériel", "—", "-20%", "-20%"],
                ["Formations", "1/mois", "Illimitée", "Live sur mesure"],
                ["SLA matériel", "—", "48h", "24h"],
                ["Intégration API/ERP", "—", "—", "Incluse"],
                ["Audits de parc", "—", "2/an", "Illimités"],
              ].map(([feat, s, p, e]) => (
                <tr key={feat} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-gray-700">{feat}</td>
                  <td className="px-3 py-2 text-center text-gray-500">{s}</td>
                  <td className="px-3 py-2 text-center font-semibold text-amber-700">{p}</td>
                  <td className="px-3 py-2 text-center text-gray-500">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      {/* Conditions */}
      <Block label="Conditions & engagement">
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { label: "Durée minimale", value: "12 mois" },
            { label: "Résiliation", value: "1 mois de préavis après 12 mois" },
            { label: "Facturation", value: "Mensuelle · TVA européenne incluse" },
          ].map((c) => (
            <div key={c.label} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <p className="text-xs text-gray-400">{c.label}</p>
              <p className="mt-0.5 text-xs font-semibold text-gray-800">{c.value}</p>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

function AProposContent() {
  const legal = [
    { label: "Raison sociale", value: "Tigries Global Trading, S.L." },
    { label: "NIF", value: "B26980672" },
    { label: "Forme juridique", value: "Sociedad Limitada (≈ SARL)" },
    { label: "Date de constitution", value: "17 mars 2026" },
    { label: "Siège social", value: "Calle Camino Viejo de Málaga, 28 — 29700 Vélez-Málaga, Málaga, Espagne" },
    { label: "CNAE principal", value: "4662 — Commerce de gros de machines-outils" },
    { label: "Capital social", value: "3.000€" },
    { label: "Pays couverts", value: "Espagne · France · Pays-Bas" },
  ];

  return (
    <div className="space-y-6">
      {/* Mission */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Mission</p>
        <p className="text-sm leading-6 text-amber-900 font-medium">
          Rendre l'accès aux meilleurs équipements industriels simple, rapide et abordable pour les
          professionnels européens.
        </p>
      </div>

      <Block label="Présentation">
        <div className="space-y-3">
          <p className="text-sm leading-6 text-gray-700">
            Tigries Global Trading, S.L. est une société espagnole de négoce de machines-outils et
            équipements industriels, constituée le 17 mars 2026 à Vélez-Málaga, en Andalousie. Elle
            distribue du matériel électroportatif et industriel (DeWalt, Bosch, Makita, Hilti…) en
            Espagne, France et aux Pays-Bas.
          </p>
          <p className="text-sm leading-6 text-gray-700">
            Nous distribuons des machines électriques, outils de perçage, équipements de chantier et
            matériaux industriels. Notre approche digitale nous permet d'opérer avec agilité, sans les
            lourdeurs des grands groupes.
          </p>
          <p className="text-sm leading-6 text-gray-700">
            Au-delà de la vente, nous développons un écosystème de services par abonnement pour devenir
            le partenaire digital permanent de nos clients industriels.
          </p>
        </div>
      </Block>

      <Block label="Fondateur">
        <div className="rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
              MWI
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Mohamed Wahied Ishak</p>
              <p className="text-xs text-gray-500">Administrateur Unique & Associé Fondateur</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 border-t border-gray-100 pt-3">
            {[
              { label: "Nationalité", value: "Néerlandaise" },
              { label: "Basé à", value: "Amsterdam, Pays-Bas" },
              { label: "Rôle", value: "Administrateur Unique" },
              { label: "Expérience", value: "Commerce international · marché industriel européen" },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-xs text-gray-400">{f.label}</p>
                <p className="text-xs font-medium text-gray-700">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Block>

      <Block label="Informations légales">
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
          {legal.map((item) => (
            <InfoRow key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </Block>

      <Block label="Marchés couverts">
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { pays: "Espagne", flag: "🇪🇸", note: "Siège social · marché principal" },
            { pays: "France", flag: "🇫🇷", note: "Distribution active" },
            { pays: "Pays-Bas", flag: "🇳🇱", note: "Marché fondateur" },
          ].map((m) => (
            <div key={m.pays} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-base">{m.flag}</p>
              <p className="text-sm font-semibold text-gray-900">{m.pays}</p>
              <p className="text-xs text-gray-500">{m.note}</p>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

function ContactContent() {
  const fields = [
    { label: "Prénom", type: "text" },
    { label: "Nom", type: "text" },
    { label: "Email professionnel", type: "email" },
    { label: "Téléphone", type: "tel" },
    { label: "Nom de l'entreprise", type: "text" },
    {
      label: "Objet",
      type: "select",
      options: ["Devis matériel", "Abonnements", "Location", "Support technique", "Partenariat", "Autre"],
    },
    { label: "Message", type: "textarea" },
  ];

  return (
    <div className="space-y-6">
      <Block label="Coordonnées">
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
          <InfoRow label="Adresse" value="Calle Camino Viejo de Málaga, 28 — 29700 Vélez-Málaga, Málaga, Espagne" />
          <InfoRow label="Email" value="contact@tigriesglobal.com (à confirmer)" />
          <InfoRow label="Téléphone" value="À compléter" />
          <InfoRow label="Horaires" value="Lundi–Vendredi, 9h–18h (heure d'Europe centrale)" />
          <InfoRow label="Langues" value="Espagnol · Anglais · Néerlandais · Français" />
        </div>
      </Block>

      <Block label="Formulaire de contact — 7 champs">
        <div className="space-y-2">
          {fields.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
            >
              <span className="mt-0.5 font-mono text-xs text-gray-400">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <span className="text-sm text-gray-700">{f.label}</span>
                {f.options && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {f.options.map((o) => (
                      <span
                        key={o}
                        className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-400">
                {f.type}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block label="Note UX">
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 space-y-1.5">
          <p className="text-xs text-gray-600">
            — Le champ <span className="font-semibold text-gray-800">Objet</span> peut être pré-rempli
            si l'utilisateur clique sur "Demander un devis" depuis une page service.
          </p>
          <p className="text-xs text-gray-600">
            — Confirmation par email automatique après envoi du formulaire.
          </p>
          <p className="text-xs text-gray-600">
            — Formulaire disponible en 4 langues (ES / FR / NL / EN).
          </p>
        </div>
      </Block>
    </div>
  );
}

function FaqContent() {
  const items = [
    {
      q: "Dans quels pays livrez-vous ?",
      a: "Nous livrons actuellement en Espagne, en France et aux Pays-Bas. Contactez-nous pour toute demande spécifique.",
    },
    {
      q: "Quelle est la différence entre acheter et s'abonner ?",
      a: "L'achat vous donne la propriété du matériel. L'abonnement donne accès à la plateforme digitale, au support, aux formations, aux consommables automatiques et à des tarifs préférentiels.",
    },
    {
      q: "Puis-je résilier mon abonnement à tout moment ?",
      a: "Les abonnements ont un engagement minimum de 12 mois. Ensuite, résiliation possible avec un mois de préavis, sans frais.",
    },
    {
      q: "Les produits sont-ils sous garantie constructeur ?",
      a: "Oui. Les abonnés Pro et Enterprise bénéficient en plus de notre SLA de remplacement rapide.",
    },
    {
      q: "Comment fonctionne la plateforme SaaS ?",
      a: "Inventoriez vos machines, recevez des alertes d'entretien automatiques, consultez l'historique d'utilisation et générez des rapports. Accessible depuis n'importe quel appareil.",
    },
    {
      q: "Émettez-vous des factures conformes à la TVA européenne ?",
      a: "Oui. Tigries est enregistrée en Espagne (NIF B26980672) et émet des factures conformes aux normes TVA européennes, y compris en intracom UE.",
    },
    {
      q: "Y a-t-il une période d'essai ?",
      a: "Nous proposons régulièrement des programmes pilotes à nos clients existants. Contactez-nous pour en savoir plus.",
    },
    {
      q: "Comment se passe l'intégration API pour Enterprise ?",
      a: "Notre équipe accompagne chaque client Enterprise dans l'intégration avec leur ERP (SAP, Odoo, etc.). Un Account Manager coordonne l'ensemble du projet.",
    },
  ];

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => (
        <FaqItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  );
}

function MentionsContent() {
  return (
    <div className="space-y-6">
      <Block label="Éditeur du site">
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
          <InfoRow label="Éditeur" value="Tigries Global Trading, S.L." />
          <InfoRow label="NIF" value="B26980672" />
          <InfoRow label="Siège social" value="Calle Camino Viejo de Málaga, 28 — 29700 Vélez-Málaga, Málaga, Espagne" />
          <InfoRow label="Responsable de publication" value="Mohamed Wahied Ishak" />
        </div>
      </Block>

      <Block label="Hébergement">
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
          <InfoRow label="Hébergeur" value="À compléter selon l'hébergeur choisi" />
          <InfoRow label="Adresse hébergeur" value="À compléter" />
        </div>
        <p className="mt-2 text-xs italic text-gray-400">
          Renseigner dès que l'hébergeur WordPress est confirmé.
        </p>
      </Block>

      <Block label="Propriété intellectuelle">
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 space-y-1.5">
          <p className="text-xs leading-5 text-gray-700">
            L'ensemble du contenu de ce site (textes, images, logos, structure) est protégé par le droit
            d'auteur. Toute reproduction sans autorisation préalable est interdite.
          </p>
          <p className="text-xs leading-5 text-gray-700">
            Les marques citées (DeWalt, Bosch, Makita, Hilti, Milwaukee, Metabo, Stanley) sont la
            propriété de leurs titulaires respectifs.
          </p>
        </div>
      </Block>

      <Block label="Données personnelles">
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 space-y-1.5">
          <p className="text-xs leading-5 text-gray-700">
            Tigries Global Trading, S.L. traite vos données conformément au RGPD et à la législation
            espagnole (LOPDGDD). Les données collectées via le formulaire de contact sont utilisées
            uniquement pour répondre à vos demandes.
          </p>
          <p className="text-xs leading-5 text-gray-700">
            Droit d'accès, rectification et suppression : <span className="font-medium">contact@tigriesglobal.com</span>
          </p>
        </div>
      </Block>

      <Block label="Cookies">
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs leading-5 text-gray-700">
            Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie
            publicitaire ou de tracking tiers n'est utilisé sans consentement préalable.
          </p>
        </div>
      </Block>
    </div>
  );
}

function TransversalContent() {
  const navItems = [
    { label: "Accueil", note: "Page principale" },
    { label: "Services", note: "6 services" },
    { label: "Abonnements", note: "Starter · Pro · Enterprise" },
    { label: "À Propos", note: "Société & légal" },
    { label: "FAQ", note: "8 questions" },
    { label: "Contact", note: "Formulaire & infos" },
  ];

  const footerLinks = [
    { group: "Pages", items: ["Accueil", "Services", "Abonnements", "À Propos", "FAQ", "Contact"] },
    { group: "Légal", items: ["Mentions légales", "Politique de confidentialité"] },
  ];

  return (
    <div className="space-y-6">
      <Block label="Navigation — Menu principal">
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex flex-wrap items-center gap-1 bg-gray-50 px-4 py-3 border-b border-gray-200">
            {navItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5">
                <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              </div>
            ))}
            <div className="ml-auto">
              <span className="rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-gray-900">
                Demander un devis
              </span>
            </div>
          </div>
          <div className="px-4 py-3 space-y-1.5">
            {navItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
                <span className="text-xs text-gray-400">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs italic text-gray-400">
          + bouton CTA "Demander un devis" toujours visible dans la navigation
        </p>
      </Block>

      <Block label="Footer">
        <div className="rounded-xl border border-gray-200 p-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div key={group.group} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{group.group}</p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item} className="text-xs text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Société</p>
              <p className="text-xs text-gray-600">Tigries Global Trading, S.L.</p>
              <p className="text-xs text-gray-500">NIF B26980672</p>
              <p className="text-xs text-gray-500">Vélez-Málaga, Espagne</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Contact</p>
              <p className="text-xs text-gray-600">contact@tigriesglobal.com</p>
              <p className="text-xs text-gray-500">Lun–Ven, 9h–18h CET</p>
              <p className="text-xs text-gray-500">ES · FR · NL · EN</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">© 2026 Tigries Global Trading, S.L. Tous droits réservés.</p>
          </div>
        </div>
      </Block>

      <Block label="Slogan / Baseline">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { lang: "EN", text: "Your industrial partner in Europe" },
            { lang: "FR", text: "Votre partenaire industriel en Europe" },
            { lang: "ES", text: "Tu socio industrial en Europa" },
            { lang: "NL", text: "Uw industriële partner in Europa" },
          ].map((s) => (
            <div key={s.lang} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <span className="shrink-0 rounded-md bg-gray-200 px-1.5 py-0.5 font-mono text-xs font-bold text-gray-600">
                {s.lang}
              </span>
              <span className="text-xs italic text-gray-700">"{s.text}"</span>
            </div>
          ))}
        </div>
      </Block>

      <Block label="Responsive — points d'attention">
        <div className="space-y-2">
          {[
            { page: "Navigation", note: "Menu hamburger sur mobile · bouton devis toujours visible" },
            { page: "Abonnements", note: "Cartes pricing empilées en colonne sur mobile" },
            { page: "Tableau comparatif", note: "Scroll horizontal sur mobile" },
            { page: "Footer", note: "Colonnes de liens empilées sur mobile" },
            { page: "Formulaire contact", note: "Champs pleine largeur sur mobile" },
          ].map((r) => (
            <div key={r.page} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5">
              <span className="shrink-0 text-xs font-semibold text-gray-700 w-32">{r.page}</span>
              <span className="text-xs text-gray-500">{r.note}</span>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TigriesTradingPage() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const [checked, setChecked] = useState<Set<TaskId>>(() => loadChecked());
  const [activeTab, setActiveTab] = useState("accueil");

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
        ".tigries-hero-anim",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.1 },
      );

      gsap.utils.toArray<HTMLElement>(".tigries-reveal-card").forEach((card) => {
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

        const items = card.querySelectorAll(".tigries-reveal-item");
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

  const tabContent: Record<string, React.ReactNode> = {
    accueil: <AccueilContent />,
    services: <ServicesContent />,
    abonnements: <AbonnementsContent />,
    apropos: <AProposContent />,
    contact: <ContactContent />,
    faq: <FaqContent />,
    mentions: <MentionsContent />,
    transversal: <TransversalContent />,
  };

  return (
    <div ref={rootRef} className="space-y-4">
      {/* ── BACK LINK ─────────────────────────────────────────────────── */}
      <div className="flex justify-start">
        <Link to="/design" className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-700">
          {t("design.common.back")}
        </Link>
      </div>

      {/* ── STATUS BANNER ─────────────────────────────────────────────── */}
      <div className="tigries-hero-anim flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm font-semibold text-gray-900">{t("tigriesTrading.status.label")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
            {t("tigriesTrading.status.deadline")}
          </span>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            {t("tigriesTrading.status.date")}
          </span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-14 md:py-20"
        style={{ backgroundColor: HERO_BG }}
      >
        <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-5">
            <h1 className="tigries-hero-anim text-4xl leading-tight text-white md:text-5xl">
              {t("tigriesTrading.hero.title")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </h1>
            <p className="tigries-hero-anim text-base leading-7 text-white/70 md:text-lg">
              {t("tigriesTrading.hero.description")}
            </p>
            <p className="tigries-hero-anim text-xs font-medium italic text-white/50">
              "Your industrial partner in Europe"
            </p>
          </div>

          <div className="tigries-hero-anim shrink-0 self-center [perspective:800px]">
            <div
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform duration-300 ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.06)] md:p-8"
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
                src={tigrieLogo}
                alt="Logo Tigries Trading"
                className="h-20 w-auto object-contain md:h-28"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(247,175,47,0.12)_20%,transparent_80%)]" />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-black/[0.08]" />
        <div className="pointer-events-none absolute -bottom-12 right-12 h-56 w-56 rounded-full bg-black/[0.08]" />
        <div className="pointer-events-none absolute bottom-6 left-8 h-24 w-24 rounded-full bg-black/[0.05]" />
      </div>

      {/* ── CONTEXTE ──────────────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.context.sectionTitle")}
        </p>

        <div className="tigries-reveal-item mb-6 flex items-center gap-3">
          <span
            className="inline-block rounded-md px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-white"
            style={{ backgroundColor: ACCENT }}
          >
            Tigries Global Trading, S.L.
          </span>
          <p className="text-xs italic text-gray-400">{t("tigriesTrading.context.tagline")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Sites de référence */}
          <div className="tigries-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.refs.label")}
            </p>
            <div className="space-y-2">
              {[
                { label: "milwaukee.es", url: "https://milwaukee.es" },
                { label: "dewalt.es", url: "https://dewalt.es" },
                { label: "leroymerlin.es", url: "https://leroymerlin.es" },
              ].map((ref) => (
                <a
                  key={ref.label}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium transition-all hover:border-gray-400/40 hover:bg-gray-50/50"
                  style={{ color: ACCENT }}
                >
                  {ref.label}
                  <span className="text-xs text-gray-400">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Cible */}
          <div className="tigries-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.target.label")}
            </p>
            <ul className="space-y-2">
              {(["item1", "item2"] as const).map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-700">{t(`tigriesTrading.context.target.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Langues */}
          <div className="tigries-reveal-item space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {t("tigriesTrading.context.langue.label")}
            </p>
            <p className="text-sm leading-6 text-gray-700">{t("tigriesTrading.context.langue.note")}</p>
          </div>
        </div>

        {/* À propos + Objectifs */}
        <div className="tigries-reveal-item mt-8 border-t border-gray-100 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("tigriesTrading.about.title")}
              </p>
              <p className="text-sm leading-7 text-gray-700">{t("tigriesTrading.about.paragraph1")}</p>
              <p className="text-sm leading-7 text-gray-700">{t("tigriesTrading.about.paragraph2")}</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t("tigriesTrading.objectives.title")}
              </p>
              <ul className="space-y-2.5">
                {(["item1", "item2", "item3", "item4"] as const).map((key) => (
                  <li key={key} className="flex items-start gap-2.5">
                    <div
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span className="text-sm text-gray-700">{t(`tigriesTrading.objectives.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── STRUCTURE DES PAGES ───────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.pages.sectionTitle")}
        </p>
        <div className="tigries-reveal-item flex flex-wrap gap-3">
          {(["accueil", "services", "abonnements", "apropos", "contact", "faq", "mentions"] as const).map(
            (key) => (
              <div key={key} className="flex items-center gap-2.5 rounded-xl border border-gray-200 px-4 py-2.5">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
                <span className="text-sm text-gray-800">{t(`tigriesTrading.pages.${key}.label`)}</span>
                <span className="text-xs text-gray-400">{t(`tigriesTrading.pages.${key}.sub`)}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* ── CONTENU DES PAGES ─────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.content.sectionTitle")}
        </p>

        {/* Tab bar */}
        <div className="tigries-reveal-item mb-6 flex flex-wrap gap-2">
          {PAGE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CHECKLIST ─────────────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <div className="tigries-reveal-item mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            {t("tigriesTrading.checklist.sectionTitle")}
          </p>
          <span className="text-xs font-semibold text-gray-400">
            {t("tigriesTrading.checklist.counter", { done, total })}
          </span>
        </div>

        <div className="tigries-reveal-item mb-8 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: ACCENT }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <div className="space-y-8">
          {CHECKLIST_SECTIONS.map((section) => (
            <div key={section.id} className="tigries-reveal-item space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                {t(`tigriesTrading.checklist.sections.${section.id}.title`)}
              </p>
              <div className="space-y-2">
                {section.tasks.map((task) => {
                  const isChecked = checked.has(task.id);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggle(task.id)}
                      className={`group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                        isChecked
                          ? "border-gray-100 bg-gray-50"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                          isChecked
                            ? "border-[#0f172a] bg-[#0f172a]"
                            : "border-gray-300 bg-white group-hover:border-gray-400"
                        }`}
                      >
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

                      <span
                        className={`flex-1 text-sm transition-all duration-200 ${
                          isChecked ? "text-gray-400 line-through" : "text-gray-800"
                        }`}
                      >
                        {t(`tigriesTrading.checklist.sections.${section.id}.${task.id}`)}
                      </span>

                      <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        {t("tigriesTrading.checklist.badgeEssentiel")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="tigries-reveal-item mt-6 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3">
          <p className="text-xs leading-5 text-amber-800">{t("tigriesTrading.checklist.livrableNote")}</p>
        </div>

        <AnimatePresence>
          {done === total && total > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-8 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4"
            >
              <p className="text-sm font-semibold text-gray-900">
                {t("tigriesTrading.checklist.completionMessage")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RESSOURCES ────────────────────────────────────────────────── */}
      <div className="tigries-reveal-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
        <p className="tigries-reveal-item mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {t("tigriesTrading.resources.sectionTitle")}
        </p>
        <div className="tigries-reveal-item grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r) => (
            <a
              key={r.key}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1.5 rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-gray-300/60 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-gray-700">
                {t(`tigriesTrading.resources.items.${r.key}.label`)}
                <span className="ml-1 text-gray-400">↗</span>
              </span>
              <span className="text-xs leading-5 text-gray-500">
                {t(`tigriesTrading.resources.items.${r.key}.desc`)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
