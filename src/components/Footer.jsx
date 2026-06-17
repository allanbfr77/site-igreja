import { CHURCH, SOCIALS } from "../config.js";

/* Rodapé com redes sociais (SVG) e faixa de direitos reservados */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <b>{CHURCH.name}</b>
          <p>Um lugar para pertencer, crescer e servir. <br />Faça parte desta família de fé.</p>
        </div>
        <div className="socials">
          {SOCIALS.map(({ id, label, Icon, url }) => (
            <a key={id} href={url} aria-label={label} title={label}
               target="_blank" rel="noopener noreferrer">
              <Icon />
            </a>
          ))}
        </div>
      </div>
      <div className="copy">
        © {new Date().getFullYear()} {CHURCH.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
