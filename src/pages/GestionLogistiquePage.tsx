import { useTranslation } from "react-i18next";
import ServicePageTemplate from "../components/ServicePageTemplate";
import logisticsImage from "../assets/logistics.jpg";
import logisticsImage2 from "../assets/logistics2.jpg";

export default function GestionLogistiquePage() {
  const { t } = useTranslation();

  return (
    <ServicePageTemplate
      title={t("services.logistics.title")}
      image={logisticsImage}
      secondaryImage={logisticsImage2}
      description={t("services.logistics.description")}
      details={[
        {
          title: t("services.logistics.details.routePlanning.title"),
          text: t("services.logistics.details.routePlanning.text"),
        },
        {
          title: t("services.logistics.details.teamCoordination.title"),
          text: t("services.logistics.details.teamCoordination.text"),
        },
        {
          title: t("services.logistics.details.performanceTracking.title"),
          text: t("services.logistics.details.performanceTracking.text"),
        },
      ]}
    />
  );
}
