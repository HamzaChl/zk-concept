import { useTranslation } from "react-i18next";
import ServicePageTemplate from "../components/ServicePageTemplate";
import journauxImage from "../assets/journaux.jpg";
import journauxImage2 from "../assets/journaux2.jpg";

export default function DistributionPressePage() {
  const { t } = useTranslation();

  return (
    <ServicePageTemplate
      title={t("services.press.title")}
      image={journauxImage}
      secondaryImage={journauxImage2}
      description={t("services.press.description")}
      details={[
        {
          title: t("services.press.details.preparation.title"),
          text: t("services.press.details.preparation.text"),
        },
        {
          title: t("services.press.details.morningExecution.title"),
          text: t("services.press.details.morningExecution.text"),
        },
        {
          title: t("services.press.details.dailyConsistency.title"),
          text: t("services.press.details.dailyConsistency.text"),
        },
      ]}
    />
  );
}
