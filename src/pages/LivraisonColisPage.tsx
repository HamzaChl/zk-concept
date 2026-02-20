import ServicePageTemplate from "../components/ServicePageTemplate";
import colisImage from "../assets/colis.jpg";
import colisImage2 from "../assets/colis2.jpg";

export default function LivraisonColisPage() {
  return (
    <ServicePageTemplate
      title="Livraison de Colis"
      image={colisImage}
      secondaryImage={colisImage2}
      description="ZK Concept assure la livraison rapide et fiable de colis a travers la Belgique. Forte de plusieurs annees d'experience aupres d'acteurs majeurs du secteur, l'entreprise garantit ponctualite, respect des procedures et qualite de service constante. Chaque tournee est optimisee afin d'assurer efficacite, tracabilite et satisfaction client."
      details={[
        {
          title: "Tournees optimisees",
          text: "Chaque tournee est preparee selon les zones, les horaires de livraison et les contraintes terrain pour reduire les temps morts et maintenir une cadence fiable.",
        },
        {
          title: "Suivi et tracabilite",
          text: "Nous appliquons un suivi rigoureux des colis, avec des procedures claires a chaque etape, afin d'assurer transparence, controle et qualite de service.",
        },
        {
          title: "Fiabilite operationnelle",
          text: "Notre organisation permet d'absorber des volumes variables tout en conservant ponctualite, regularite et satisfaction client sur la duree.",
        },
      ]}
    />
  );
}
