import { NAV } from "../config.js";
import { pathFor, isModifiedClick } from "../routes.js";

/* Barra de navegação fixa no rodapé (acesso rápido em mobile) */
export default function BottomBar({ page, go }) {
  const onNav = (e, id) => {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    go(id);
  };
  return (
    <nav className="bar">
      {NAV.map(({ id, label, Icon }) => (
        <a key={id} className={page === id ? "on" : ""} href={pathFor(id)} onClick={(e) => onNav(e, id)}>
          <Icon strokeWidth={1.6} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
