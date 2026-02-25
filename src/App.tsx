import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/Footer";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Nav from "./components/Nav";
import ContactPage from "./pages/ContactPage";
import DevisPage from "./pages/DevisPage";
import DistributionPressePage from "./pages/DistributionPressePage";
import GestionLogistiquePage from "./pages/GestionLogistiquePage";
import HomePage from "./pages/HomePage";
import ImprintPage from "./pages/ImprintPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import LivraisonColisPage from "./pages/LivraisonColisPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TempMailsPage from "./pages/TempMailsPage";
import WorkTogetherPage from "./pages/WorkTogetherPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollToTop />
      <Nav />
      <main className="mx-auto w-full px-4 pb-16 pt-4 md:px-[50px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/livraison-colis" element={<LivraisonColisPage />} />
          <Route
            path="/distribution-presse"
            element={<DistributionPressePage />}
          />
          <Route
            path="/gestion-logistique"
            element={<GestionLogistiquePage />}
          />
          <Route path="/devis" element={<DevisPage />} />
          <Route path="/travailler-ensemble" element={<WorkTogetherPage />} />
          <Route path="/temp-mails" element={<TempMailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/politique-de-confidentialite"
            element={<PrivacyPolicyPage />}
          />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <LanguageSwitcher />
    </div>
  );
}
