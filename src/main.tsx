import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Lenis from "lenis";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import "./index.css";

declare global {
  interface Window {
    __zkLenis?: {
      stop: () => void;
      start: () => void;
    };
  }
}

function Root() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    window.__zkLenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__zkLenis = undefined;
    };
  }, []);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
