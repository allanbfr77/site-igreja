import { useState, useEffect, useMemo } from "react";
import { Play, Info, Calendar } from "lucide-react";
import { YOUTUBE } from "../config.js";
import Footer from "../components/Footer.jsx";

/* Aviso (config / erro / sem tag) */
const Note = ({ children }) => (
  <div className="yt-note"><Info /><span>{children}</span></div>
);

/* Cultos ao vivo fixos (w = dia: 0=DOM, 3=QUA). Horário de Brasília. */
const LIVE_SERVICES = [
  { w: 3, h: 19, m: 30, day: "quarta-feira" },
  { w: 0, h: 10, m: 0, day: "domingo" },
  { w: 0, h: 19, m: 0, day: "domingo" },
];

/* Hora atual no fuso de Brasília (independe do fuso do visitante) */
const nowSP = () => new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
const fmtTime = (h, m) => (m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`);

/* Próximo culto ao vivo a partir de agora (Brasília) */
function nextLive() {
  const n = nowSP();
  const nowMin = n.getDay() * 1440 + n.getHours() * 60 + n.getMinutes();
  let best = Infinity, res = LIVE_SERVICES[0];
  LIVE_SERVICES.forEach((s) => {
    const delta = (s.w * 1440 + s.h * 60 + s.m - nowMin + 10080) % 10080;
    if (delta < best) { best = delta; res = s; }
  });
  return res;
}

/* Card de culto (abre o YouTube embutido ao clicar) */
function CultoCard({ v }) {
  const [open, setOpen] = useState(false);
  const id = v.videoId?.trim();
  const thumb = v.thumb || (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "");
  return (
    <div className="scard">
      <span className="badge"><Play /> PREGAÇÃO</span>
      {open && id ? (
        <iframe
          className="vframe"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={v.title}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : (
        <div className="vthumb" onClick={() => id && setOpen(true)}>
          {thumb ? <img src={thumb} alt="" /> : <div className="img-fallback" />}
          <div className="play"><span><Play fill="currentColor" /></span></div>
        </div>
      )}
      <div className="scard-body">
        {v.date && <span className="num">{v.date}</span>}
        <h4>{v.title}</h4>
      </div>
    </div>
  );
}

/* Página Cultos — 3 últimos vídeos do canal pela tag (YouTube API) + fallback */
export default function Cultos() {
  const [state, setState] = useState({ loading: true, videos: [], note: "" });
  const live = useMemo(() => nextLive(), []);
  const liveUrl = `https://www.youtube.com/channel/${YOUTUBE.channelId}/live`;

  useEffect(() => {
    let alive = true;
    const fmt = (iso) =>
      iso ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "";

    async function load() {
      const { videosUrl, apiKey, channelId, tag } = YOUTUBE;

      // Fonte preferida: videos.json já gerado pelo GitHub Action (já vem filtrado
      // pela tag e com os 3 últimos cultos) — não expõe a chave da API no site.
      if (videosUrl) {
        try {
          const data = await fetch(videosUrl).then((r) => r.json());
          const items = (data.items || [])
            .map((it) => ({
              videoId: it.id?.videoId || it.id,
              title: it.snippet?.title,
              date: fmt(it.snippet?.publishedAt),
              thumb: it.snippet?.thumbnails?.high?.url,
            }))
            .filter((v) => v.videoId);
          if (!items.length) throw new Error();
          if (alive) setState({ loading: false, videos: items.slice(0, 3), note: "" });
        } catch (e) {
          if (alive) setState({ loading: false, videos: YOUTUBE.fallback, note: "error" });
        }
        return;
      }

      if (!apiKey || !channelId) {
        if (alive) setState({ loading: false, videos: YOUTUBE.fallback, note: "config" });
        return;
      }
      try {
        const base = "https://www.googleapis.com/youtube/v3";
        const ch = await fetch(`${base}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`).then((r) => r.json());
        const uploads = ch.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploads) throw new Error();
        const pl = await fetch(`${base}/playlistItems?part=snippet&maxResults=25&playlistId=${uploads}&key=${apiKey}`).then((r) => r.json());
        const ids = (pl.items || []).map((i) => i.snippet?.resourceId?.videoId).filter(Boolean);
        if (!ids.length) throw new Error();
        const vids = await fetch(`${base}/videos?part=snippet&id=${ids.join(",")}&key=${apiKey}`).then((r) => r.json());
        const t = (tag || "").toLowerCase();
        const items = (vids.items || []).map((v) => ({
          videoId: v.id,
          title: v.snippet?.title,
          date: fmt(v.snippet?.publishedAt),
          thumb: v.snippet?.thumbnails?.high?.url,
          tags: (v.snippet?.tags || []).map((x) => x.toLowerCase()),
        }));
        let result = items.filter((v) => v.tags.includes(t));
        let note = "";
        if (!result.length) { result = items; note = "notag"; }
        if (alive) setState({ loading: false, videos: result.slice(0, 3), note });
      } catch (e) {
        if (alive) setState({ loading: false, videos: YOUTUBE.fallback, note: "error" });
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  return (
    <div className="wrap">
      <div className="page-head reveal">
        <span className="eyebrow">Cultos</span>
        <h2>Últimas pregações</h2>
        <p className="lead">
          Reveja as mensagens mais recentes do nosso canal. Aperte o play e
          seja edificado onde você estiver.
        </p>
      </div>

      {state.note === "config" && <Note>Configure a chave da YouTube API e o ID do canal para buscar os cultos automaticamente. Por enquanto, exibindo exemplos.</Note>}
      {state.note === "error" && <Note>Não foi possível buscar os vídeos agora. Exibindo conteúdo de exemplo.</Note>}
      {state.note === "notag" && <Note>Nenhum vídeo com a tag “{YOUTUBE.tag}” foi encontrado. Exibindo os mais recentes.</Note>}

      <div className="study-grid reveal-stagger" style={{ marginTop: 22 }}>
        {state.loading
          ? [0, 1, 2].map((i) => <div className="skel" key={i}><div className="sh" /><div className="sb" /></div>)
          : state.videos.map((v, i) => <CultoCard key={i} v={v} />)}
      </div>

      <a className="next-live reveal" href={liveUrl} target="_blank" rel="noreferrer">
        <Calendar />
        <span>
          <b>Próximo culto:</b> {live.day}, {fmtTime(live.h, live.m)}.{" "}
          <u>Clique aqui para assistir</u>
        </span>
      </a>

      <Footer />
    </div>
  );
}
