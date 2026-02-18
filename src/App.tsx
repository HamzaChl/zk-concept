import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ContactPage from "./pages/ContactPage";
import FleetPage from "./pages/FleetPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <main className="mx-auto w-full px-[50px] pb-16 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/flotte" element={<FleetPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
