import { useState, useMemo } from "react";
import { ArrowRight, ArrowLeft, Clock, MapPin } from "lucide-react";
import { CHURCH, MONTH_SCHEDULE } from "../config.js";
import Footer from "../components/Footer.jsx";
import LiveBanner from "../components/LiveBanner.jsx";
import CountUp from "../components/CountUp.jsx";

/* Hora atual no fuso de Brasília (independe do fuso do visitante) */
const nowSP = () => new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

/* Próximo culto semanal (dia + evento), a partir de agora (Brasília) */
function nextSlot(schedule) {
  const n = nowSP();
  const nowMin = n.getDay() * 1440 + n.getHours() * 60 + n.getMinutes();
  let best = Infinity, res = { d: 0, e: 0 };
  schedule.forEach((day, d) => {
    day.events.forEach((ev, e) => {
      (ev.times || []).forEach((t) => {
        const [hh, mm] = t.split(":").map(Number);
        const occ = (day.w ?? 0) * 1440 + hh * 60 + mm;
        const delta = (occ - nowMin + 10080) % 10080;
        if (delta < best) { best = delta; res = { d, e }; }
      });
    });
  });
  return res;
}

/* Página Início — hero centralizado + blocos editoriais (scroll-snap) */
export default function Home({ go }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(CHURCH.address)}&output=embed`;
  const [showMonth, setShowMonth] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const next = useMemo(() => nextSlot(CHURCH.schedule), []);
  const openMonth = () => {
    setShowMonth(true);
    setSelectedWeek(MONTH_SCHEDULE.weeks.findIndex((w) => w.events.length > 0));
  };
  return (
    <div className="wrap">
      <LiveBanner />
      {/* HERO */}
      <section className="hero">
        <span className="eyebrow">Bem-vindo à</span>
        <h1>{CHURCH.shortName}</h1>
        <p className="lead">
  Não apenas uma Igreja, mas uma Família!
  <br />
  Participe conosco!
</p>
        <blockquote className="verse">
          “{CHURCH.verse.text}”
          <small>{CHURCH.verse.ref}</small>
        </blockquote>
        <div className="cta-row">
          <button className="btn btn-gold" onClick={() => go("cultos")}>
            Assistir aos cultos <ArrowRight />
          </button>
          <button className="btn btn-ghost" onClick={() => go("contato")}>
            Fale conosco
          </button>
        </div>
      </section>

      {/* BLOCOS DA HOME — layout editorial */}
      <div className="ed-home">
        <section className="ed reveal ed-top ed-cal">
          <div className="lead-col">
            <p className="kicker">{showMonth ? "Programação mensal" : "Programação semanal"}</p>
            {!showMonth ? (
              <h3>Nossos encontros</h3>
            ) : (
              <>
                <div className="week-badges">
                  {MONTH_SCHEDULE.weeks.map((w, i) => (
                    <button
                      key={i}
                      className={`week-badge ${selectedWeek === i ? "on" : ""}`}
                      onClick={() => setSelectedWeek(i)}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
                <button className="month-back" onClick={() => setShowMonth(false)}>
                  <ArrowLeft /> Voltar
                </button>
              </>
            )}
          </div>
          <div className="prog-col">
            {!showMonth ? (
              <>
                <div className="agenda">
                  {CHURCH.schedule.map((day, d) => (
                    <div key={d} className={`slot ${d === next.d ? "next" : ""}`}>
                      <div className="day">{day.day}</div>
                      <div className="info">
                        {day.events.map((ev, e) => (
                          <div className="ev" key={e}>
                            <div className="ev-main">
                              <b>{ev.title}</b>
                              <p><Clock /> {ev.time}</p>
                            </div>
                            {d === next.d && e === next.e && <span className="tag">PRÓXIMO</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="month-link" onClick={openMonth}>
                  Ver outros eventos no mês <ArrowRight />
                </button>
              </>
            ) : (
              <div className="agenda">
                {selectedWeek != null && (
                  <p className="week-range">{MONTH_SCHEDULE.weeks[selectedWeek].range}</p>
                )}
                {selectedWeek != null && MONTH_SCHEDULE.weeks[selectedWeek].events.length ? (
                  MONTH_SCHEDULE.weeks[selectedWeek].events.map((ev, j) => (
                    <div className="slot" key={j}>
                      <div className="day day-stack">
                        <span>{ev.day}</span>
                        <small>{ev.date}</small>
                      </div>
                      <div className="info">
                        <b>{ev.title}</b>
                        {ev.time && <p><Clock /> {ev.time}</p>}
                        {ev.note && <p className="slot-note">{ev.note}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="week-hint">Sem eventos extras nesta semana.</p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="ed reveal ed-top ed-loc">
          <div className="lead-col">
            <p className="kicker">Localização</p>
            <h3>Como chegar</h3>
            <div className="addr"><MapPin /> <span>{CHURCH.address}</span></div>
            <a
              className="btn btn-ghost map-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CHURCH.address)}`}
              target="_blank" rel="noreferrer"
            >
              Abrir no Google Maps <ArrowRight />
            </a>
          </div>
          <div>
            <div className="map-frame ed-map">
              <iframe title="Mapa" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>

        <section className="ed reveal ed-top ed-hist">
          <div className="lead-col">
            <p className="kicker">Quem somos</p>
            <div className="bignum"><CountUp value={CHURCH.founded} /></div>
            <div className="bignum-lbl">Desde</div>
          </div>
          <div>
            <h3 className="ed-hist-title">Nossa história</h3>
            <p className="ed-text">Uma igreja com raízes em Botafogo e coração voltado para Deus.</p>
            <p className="ed-text">Fundada pelo Pr. Luiz Carlos, seu primeiro culto foi realizado em 5 de janeiro de 2003, com um pequeno grupo de adoradores.</p>
            <p className="ed-text">Desde então, temos vivido um crescimento abençoado: cultos cheios da presença de Deus, avivamento espiritual, batismos, casamentos, capacitações de novos obreiros e líderes ministeriais, aconselhamentos e muito mais.</p>
            <p className="ed-text">Em março de 2005, com a presença do Bispo Tito Oscar, celebramos a inauguração oficial do templo, ampliado em dezembro de 2006, para acolher ainda mais vidas.</p>
            <p className="ed-text">Hoje, permanecemos sob a liderança do Pr. Luiz Carlos, expandindo o Reino de Deus com amor, fé e perseverança.</p>
            <p className="ed-text">No corpo eclesiástico da igreja constam, ainda, os seguintes membros:</p>
            <p className="ed-roles"><b>Pastores-Auxiliares:</b> Sônia, Humberto, Marcio Soares e Daniela Soares</p>
            <p className="ed-roles"><b>Diáconos:</b> Atayde, Luciana, Alfredo, Marilda e Wellington</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
