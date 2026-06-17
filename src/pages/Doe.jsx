import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { DONATE } from "../config.js";
import Footer from "../components/Footer.jsx";

/* Página Doe — mensagem, versículo, PIX com QR e dados bancários */
export default function Doe() {
  const [copied, setCopied] = useState("");
  const copy = (text, tag) => {
    try { navigator.clipboard?.writeText(text); } catch (e) {}
    setCopied(tag);
    setTimeout(() => setCopied(""), 1600);
  };
  return (
    <div className="wrap">
      <div className="page-head reveal">
        <span className="eyebrow">Contribua</span>
        <h2>Semeie na obra</h2>
        <p className="lead">{DONATE.message}</p>
        <blockquote className="verse">
          “{DONATE.verse.text}”
          <small>{DONATE.verse.ref}</small>
        </blockquote>
      </div>

      <div className="doe-grid reveal-stagger">
        {/* PIX */}
        <div className="card">
          <p className="kicker">PIX</p>
          <h3>Contribua via PIX</h3>
          <div className="qr">
            <img src="/qrcode_pix.png" alt="QR Code para doação via PIX" />
          </div>
          <div className="pix-key">
            <div>
              <span className="lab">Chave PIX (CNPJ)</span>
              <code>{DONATE.pixKey}</code>
            </div>
            <button className="copybtn" onClick={() => copy(DONATE.pixKey, "key")}>
              {copied === "key" ? <><Check /> Copiado</> : <><Copy /> Copiar</>}
            </button>
          </div>
        </div>

        {/* DADOS BANCÁRIOS */}
        <div className="card">
          <p className="kicker">Transferência</p>
          <h3>Dados bancários</h3>
          <div className="bank-rows">
            {DONATE.bank.map((row, i) => (
              <div className="brow" key={i}>
                <span className="k">{row.k}</span>
                <span className="v">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="doe-note">
        Obrigado por fazer parte desta obra. Cada oferta, grande ou pequena, é
        recebida com gratidão e usada com responsabilidade para o Reino de Deus.
      </p>

      <Footer />
    </div>
  );
}
