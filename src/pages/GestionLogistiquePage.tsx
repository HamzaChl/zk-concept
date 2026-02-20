import ServicePageTemplate from "../components/ServicePageTemplate";
import logisticsImage from "../assets/logistics.jpg";
import logisticsImage2 from "../assets/logistics2.jpg";

export default function GestionLogistiquePage() {
  return (
    <ServicePageTemplate
      title="Gestion Logistique et Coordination"
      image={logisticsImage}
      secondaryImage={logisticsImage2}
      description="ZK Concept prend en charge la planification des tournées, la coordination des chauffeurs et le suivi opérationnel complet. Sa structure independante permet d'assurer continuité, réactivité et stabilité dans l'exécution des missions logistiques, même dans des environnements exigeants."
      details={[
        {
          title: "Planification des tournées",
          text: "Nous structurons les flux et les itineraires pour assurer une exécution cohérente, limiter les retards et optimiser les ressources.",
        },
        {
          title: "Coordination des équipes",
          text: "La coordination chauffeurs et terrain est suivie en continu pour s'adapter rapidement aux aléas et maintenir la continuité opérationnelle.",
        },
        {
          title: "Suivi de performance",
          text: "Un suivi global des operations permet d'identifier les axes d'amélioration, de fiabiliser les missions et de garantir la stabilité du service.",
        },
      ]}
    />
  );
}
