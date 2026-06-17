import { useState } from "react";
import { Play, FileDown, Film, Image as ImageIcon, Download } from "lucide-react";
import { STUDIES } from "../config.js";
import Footer from "../components/Footer.jsx";

/* Selo (badge) por tipo de card */
const BADGES = {
  video: { Icon: Film, label: "VÍDEO" },
  pdf: { Icon: FileDown, label: "PDF" },
  image: { Icon: ImageIcon, label: "AULA" },
};

/* Card de estudo — formato único para todos os tipos:
   capa no topo (16/9), play sobre a capa nos vídeos, e na linha do
   número um ícone de download do PDF (quando disponível). */
function StudyCard({ item }) {
  const [open, setOpen] = useState(false);
  const isVideo = item.type === "video";
  const id = item.videoId?.trim();
  // miniatura do YouTube (fallback dos vídeos quando não há capa própria)
  const ytThumb = isVideo && id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  const custom = item.cover?.trim() || item.image?.trim() || "";
  // capa como imagem de FUNDO sobre o gradiente. Usa a capa personalizada
  // quando existe; a miniatura do YouTube é só FALLBACK (quando não há capa).
  // Evita empilhar as duas — assim o preview do YT não "pisca" por baixo.
  const cover = custom || ytThumb;
  const coverStyle = cover ? { backgroundImage: `url("${cover}")` } : undefined;
  const hasPdf = !!item.pdf && item.pdf.trim() !== "" && item.pdf.trim() !== "#";
  const badge = BADGES[item.type] || BADGES.pdf;
  const BadgeIcon = badge.Icon;

  return (
    <div className="scard">
      <span className="badge"><BadgeIcon /> {badge.label}</span>

      {open && isVideo && id ? (
        <iframe
          className="vframe"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={item.title}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : isVideo ? (
        <div className="vthumb" onClick={() => id && setOpen(true)}>
          <div className="img-fallback" />
          {coverStyle && <div className="thumb-cover" style={coverStyle} />}
          <div className="play"><span><Play fill="currentColor" /></span></div>
        </div>
      ) : (
        <div className="vthumb-static">
          <div className="img-fallback" />
          {coverStyle && <div className="thumb-cover" style={coverStyle} />}
        </div>
      )}

      <div className="scard-body">
        {(item.num || hasPdf) && (
          <div className="num-row">
            {item.num && <span className="num">{item.num}</span>}
            {hasPdf && (
              <a
                className="dl-link"
                href={item.pdf}
                target="_blank"
                rel="noreferrer"
                title="Baixar aula em PDF"
                aria-label="Baixar aula em PDF"
              >
                <Download /> <span>Baixar PDF</span>
              </a>
            )}
          </div>
        )}
        <h4>{item.title}</h4>
        {item.desc && <p>{item.desc}</p>}
      </div>
    </div>
  );
}

/* Página Estudos — abas por tema (abre na aba configurável STUDIES.current) */
export default function Estudos() {
  const initial = STUDIES.tabs.some((t) => t.id === STUDIES.current) ? STUDIES.current : STUDIES.tabs[0].id;
  const [tab, setTab] = useState(initial);
  const current = STUDIES.tabs.find((t) => t.id === tab);
  return (
    <div className="wrap">
      <div className="page-head reveal">
        <span className="eyebrow">Estudos</span>
        <h2>Aprenda a Palavra</h2>
        <p className="lead">{STUDIES.intro}</p>
      </div>
      <div className="tabs">
        {STUDIES.tabs.map((t) => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.label}
            {t.id === STUDIES.current && <span className="tab-now">Em curso</span>}
          </button>
        ))}
      </div>
      <div className="study-grid reveal-stagger">
        {current.items.map((it, i) => <StudyCard key={i} item={it} />)}
      </div>
      <Footer />
    </div>
  );
}
