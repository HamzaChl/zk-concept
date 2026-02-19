import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ContactPage from "./pages/ContactPage";
import DevisPage from "./pages/DevisPage";
import FleetPage from "./pages/FleetPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import TempMailsPage from "./pages/TempMailsPage";
import WorkTogetherPage from "./pages/WorkTogetherPage";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <main className="mx-auto w-full px-[50px] pb-16 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/flotte" element={<FleetPage />} />
          <Route path="/devis" element={<DevisPage />} />
          <Route path="/travailler-ensemble" element={<WorkTogetherPage />} />
          <Route path="/temp-mails" element={<TempMailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
