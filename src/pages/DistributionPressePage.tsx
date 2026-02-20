import ServicePageTemplate from "../components/ServicePageTemplate";
import journauxImage from "../assets/journaux.jpg";
import journauxImage2 from "../assets/journaux2.jpg";

export default function DistributionPressePage() {
  return (
    <ServicePageTemplate
      title="Distribution de Presse"
      image={journauxImage}
      secondaryImage={journauxImage2}
      description="L'entreprise assure la distribution matinale de journaux et magazines avec précision et régularité. Grâce à une organisation structurée incluant le tri, la preparation et la gestion des tournées, ZK Concept garantit une exécution ponctuelle et conforme aux exigences des distributeurs et editeurs."
      details={[
        {
          title: "Preparation et tri",
          text: "Les supports sont prepares et organises en amont pour garantir une mise en tournée efficace et limiter les erreurs de distribution.",
        },
        {
          title: "Execution matinale",
          text: "Les livraisons sont effectuees dans des fenetres horaires strictes, avec un pilotage precis pour respecter les exigences des distributeurs et editeurs.",
        },
        {
          title: "Regularite quotidienne",
          text: "Notre methode assure une distribution stable et conforme, jour apres jour, avec un niveau de qualité constant.",
        },
      ]}
    />
  );
}
