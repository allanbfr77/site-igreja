import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { MINISTRIES } from "../config.js";
import Footer from "../components/Footer.jsx";

/* Página Ministérios — mosaico + detalhe; Grupo de Guerreiros como bônus */
export default function Ministerios({ go }) {
  const [sel, setSel] = useState(null);
  const list = MINISTRIES.filter((m) => !m.bonus);
  const bonus = MINISTRIES.find((m) => m.bonus);
  const current = MINISTRIES.find((m) => m.id === sel);

  if (current) {
    const Icon = current.Icon;
    const showMeta = current.meta?.length > 0;
    return (
      <div className="wrap mdetail">
        <button className="back" onClick={() => setSel(null)}>
          <ArrowLeft /> Voltar
        </button>
        <div className="head">
          <div className="mi"><Icon strokeWidth={1.4} /></div>
          <div>
            <div className="sub">{current.bonus ? "Grupo de homens" : "Ministério"}</div>
            <h2>{current.name}</h2>
          </div>
        </div>
        <div className={`body ${showMeta ? "" : "body-full"}`}>
          <div>
            {current.description.map((p, i) => <p key={i}>{p}</p>)}
            {current.activities?.length > 0 && (
              <>
                <p className="act-title">As atividades incluem:</p>
                <ul className="act-list">
                  {current.activities.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </>
            )}
          </div>
          {showMeta && (
            <div className="meta">
              {current.meta.map((m, i) => (
                <div className="row" key={i}>
                  <Clock />
                  <div><small>{m.label}</small><span>{m.value}</span></div>
                </div>
              ))}
            </div>
          )}
          {current.bonus && (
            <button className="btn btn-gold cta" onClick={() => go("contato")}>
              Quero participar <ArrowRight />
            </button>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  const BIcon = bonus?.Icon;
  return (
    <div className="wrap">
      <div className="page-head reveal">
        <span className="eyebrow">Ministérios</span>
        <h2>Sirva com a gente</h2>
        <p className="lead">
          Cada pessoa tem um lugar no corpo de Cristo. Conheça nossas frentes de
          serviço e descubra onde a sua história pode somar.
        </p>
      </div>
      <div className="min-grid reveal-stagger">
        {list.map((m) => {
          const Icon = m.Icon;
          return (
            <button
              key={m.id}
              className={`tile ${m.image ? "has-img" : ""}`}
              onClick={() => setSel(m.id)}
            >
              {m.image && <span className="tile-bg" style={{ backgroundImage: `url(${m.image})` }} />}
              <span className="wm"><Icon strokeWidth={1.5} /></span>
              <span className="veil2" />
              <span className="cap">
                <b>{m.name}</b>
                <span className="cap-tag">{m.tagline}</span>
              </span>
            </button>
          );
        })}
      </div>
      {bonus && (
        <div className="bonus">
          <div className="bi">
            <BIcon strokeWidth={1.3} />
          </div>
          <div className="bx">
            <span>Conheça também</span>
            <b>{bonus.name}</b>
            <p>{bonus.tagline}</p>
          </div>
          <button className="btn btn-gold" onClick={() => setSel(bonus.id)}>
            Saiba mais <ArrowRight />
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
