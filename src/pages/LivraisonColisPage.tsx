import ServicePageTemplate from "../components/ServicePageTemplate";
import colisImage from "../assets/colis.jpg";
import colisImage2 from "../assets/colis2.jpg";

export default function LivraisonColisPage() {
  return (
    <ServicePageTemplate
      title="Livraison de Colis"
      image={colisImage}
      secondaryImage={colisImage2}
      description="ZK Concept assure la livraison rapide et fiable de colis à travers la Belgique. Forte de plusieurs années d'expérience auprès d'acteurs majeurs du secteur, l'entreprise garantit ponctualité, respect des procedures et qualité de service constante. Chaque tournée est optimisee afin d'assurer efficacité, traçabilité et satisfaction client."
      details={[
        {
          title: "Tournees optimisees",
          text: "Chaque tournée est preparee selon les zones, les horaires de livraison et les contraintes terrain pour reduire les temps morts et maintenir une cadence fiable.",
        },
        {
          title: "Suivi et traçabilité",
          text: "Nous appliquons un suivi rigoureux des colis, avec des procedures claires a chaque etape, afin d'assurer transparence, contrôle et qualité de service.",
        },
        {
          title: "Fiabilite opérationnelle",
          text: "Notre organisation permet d'absorber des volumes variables tout en conservant ponctualité, régularité et satisfaction client sur la duree.",
        },
      ]}
    />
  );
}
