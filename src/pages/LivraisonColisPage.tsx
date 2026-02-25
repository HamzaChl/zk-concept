import { useTranslation } from "react-i18next";
import ServicePageTemplate from "../components/ServicePageTemplate";
import colisImage from "../assets/colis.jpg";
import colisImage2 from "../assets/colis2.jpg";

export default function LivraisonColisPage() {
  const { t } = useTranslation();

  return (
    <ServicePageTemplate
      title={t("services.parcel.title")}
      image={colisImage}
      secondaryImage={colisImage2}
      description={t("services.parcel.description")}
      details={[
        {
          title: t("services.parcel.details.optimizedRoutes.title"),
          text: t("services.parcel.details.optimizedRoutes.text"),
        },
        {
          title: t("services.parcel.details.tracking.title"),
          text: t("services.parcel.details.tracking.text"),
        },
        {
          title: t("services.parcel.details.reliability.title"),
          text: t("services.parcel.details.reliability.text"),
        },
      ]}
    />
  );
}
