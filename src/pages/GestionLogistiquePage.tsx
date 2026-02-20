import ServicePageTemplate from "../components/ServicePageTemplate";
import logisticsImage from "../assets/logistics.jpg";
import logisticsImage2 from "../assets/logistics2.jpg";

export default function GestionLogistiquePage() {
  return (
    <ServicePageTemplate
      title="Gestion Logistique et Coordination"
      image={logisticsImage}
      secondaryImage={logisticsImage2}
      description="ZK Concept prend en charge la planification des tournees, la coordination des chauffeurs et le suivi operationnel complet. Sa structure independante permet d'assurer continuite, reactivite et stabilite dans l'execution des missions logistiques, meme dans des environnements exigeants."
      details={[
        {
          title: "Planification des tournees",
          text: "Nous structurons les flux et les itineraires pour assurer une execution coherente, limiter les retards et optimiser les ressources.",
        },
        {
          title: "Coordination des equipes",
          text: "La coordination chauffeurs et terrain est suivie en continu pour s'adapter rapidement aux aleas et maintenir la continute operationnelle.",
        },
        {
          title: "Suivi de performance",
          text: "Un suivi global des operations permet d'identifier les axes d'amelioration, de fiabiliser les missions et de garantir la stabilite du service.",
        },
      ]}
    />
  );
}
