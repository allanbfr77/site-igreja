import { CHURCH } from "../config.js";

/* Fundo animado: vídeo OU imagem (Ken Burns) + brilho + véu + grão */
export default function Background() {
  const vid = CHURCH.backgroundVideo?.trim();
  const img = CHURCH.backgroundImage?.trim();
  return (
    <div className="bg" aria-hidden="true">
      {vid ? (
        <video className="bg-vid" autoPlay muted loop playsInline poster={img || undefined}>
          <source src={vid} />
        </video>
      ) : (
        <div
          className={`bg-img ${img ? "" : "bg-fallback"}`}
          style={img ? { backgroundImage: `url(${img})` } : undefined}
        />
      )}
      <div className="bg-glow" />
      <div className="bg-veil" />
      <div className="bg-grain" />
    </div>
  );
}
