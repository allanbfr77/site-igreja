import { useState, useEffect } from "react";
import { CHURCH } from "./config.js";
import Styles from "./styles.jsx";
import Background from "./components/Background.jsx";
import Header from "./components/Header.jsx";
import BottomBar from "./components/BottomBar.jsx";
import WhatsAppFab from "./components/WhatsAppFab.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import useReveal from "./components/useReveal.js";
import Home from "./pages/Home.jsx";
import Estudos from "./pages/Estudos.jsx";
import Ministerios from "./pages/Ministerios.jsx";
import Doe from "./pages/Doe.jsx";
import Cultos from "./pages/Cultos.jsx";
import Contato from "./pages/Contato.jsx";

/* ============================================================
   APP — casca: estados globais, navegação entre páginas e layout
   (toda a configuração editável fica em src/config.js)
   ============================================================ */
export default function App() {
  const [page, setPage] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const go = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = CHURCH.name;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setShowTop(y > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("snap", page === "inicio");
    return () => document.documentElement.classList.remove("snap");
  }, [page]);

  useReveal(page);

  return (
    <div className="app">
      <Styles />
      <Background />
      <Header page={page} go={go} scrolled={scrolled} />
      <main className="main">
        <div className="page-anim" key={page}>
          {page === "inicio" && <Home go={go} />}
          {page === "estudos" && <Estudos />}
          {page === "ministerios" && <Ministerios go={go} />}
          {page === "doe" && <Doe />}
          {page === "cultos" && <Cultos />}
          {page === "contato" && <Contato />}
        </div>
      </main>
      <BottomBar page={page} go={go} />
      <WhatsAppFab />
      <ScrollTop show={showTop} />
    </div>
  );
}
