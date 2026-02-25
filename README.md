# ZK Concept Website

Site vitrine de **ZK Concept** (livraison de colis, distribution de presse, gestion logistique), développé avec React + TypeScript + Vite.

## Live

- Production: **https://zkconcept.be/**

## Stack Technique

- React 19
- TypeScript
- Vite 7
- React Router
- Tailwind CSS 4
- GSAP (animations)
- i18next + react-i18next (internationalisation)

## Fonctionnalités

- Pages services et formulaires métier (`/devis`, `/travailler-ensemble`, `/contact`)
- Animations d'interface (entrée + scroll reveal)
- Sélecteur de langue flottant (FR / NL / EN / DE)
- Traductions centralisées via fichiers JSON
- Endpoint API pour l'envoi de formulaires (`/api/contact`)

## Lancer Le Projet En Local

### Prérequis

- Node.js **22.12+** recommandé
- npm

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Scripts Disponibles

- `npm run dev` : démarre le serveur de développement
- `npm run build` : compile TypeScript puis build Vite
- `npm run preview` : sert localement le build
- `npm run lint` : lance ESLint

## Internationalisation (i18n)

Configuration i18n:

- `src/i18n.ts`

Fichiers de traduction:

- `src/locales/fr/common.json`
- `src/locales/nl/common.json`
- `src/locales/en/common.json`
- `src/locales/de/common.json`

Le fallback est configuré sur le français (`fr`) et la langue est persistée en localStorage (`zk-language`).

## Structure Principale

```text
src/
  components/
  pages/
  locales/
  lib/
  i18n.ts
api/
  contact.ts
```

## Déploiement

Le projet est configuré pour un déploiement web statique + fonctions serverless via Vercel (`vercel.json`).

---

Pour toute évolution (contenu, UX, traductions, formulaires), ouvrir une PR avec description claire des changements et captures d'écran si UI impactée.
