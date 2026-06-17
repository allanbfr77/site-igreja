import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { LIVE, YOUTUBE } from "../config.js";

/* Banner "ao vivo": detecta transmissão pela YouTube API (ou LIVE.forceVideoId) */
export default function LiveBanner() {
  const [live, setLive] = useState(LIVE.forceVideoId || null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (LIVE.forceVideoId) return;
    const { apiKey, channelId } = YOUTUBE;
    if (!apiKey || !channelId) return;
    let alive = true;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&channelId=${channelId}&key=${apiKey}`)
      .then((r) => r.json())
      .then((d) => { const id = d.items?.[0]?.id?.videoId; if (alive && id) setLive(id); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  if (!live) return null;
  return (
    <div className="live-banner">
      <span className="live-dot" />
      <b>Estamos ao vivo agora</b>
      <button className="btn btn-gold" onClick={() => setOpen(true)}>
        Assistir ao vivo <ArrowRight />
      </button>
      {open && (
        <div className="live-modal" onClick={() => setOpen(false)}>
          <div className="live-inner" onClick={(e) => e.stopPropagation()}>
            <button className="live-close" onClick={() => setOpen(false)} aria-label="Fechar">×</button>
            <iframe src={`https://www.youtube.com/embed/${live}?autoplay=1`}
              title="Transmissão ao vivo" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
