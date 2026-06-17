import { NAV } from "../config.js";

/* Barra de navegação fixa no rodapé (acesso rápido em mobile) */
export default function BottomBar({ page, go }) {
  return (
    <nav className="bar">
      {NAV.map(({ id, label, Icon }) => (
        <button key={id} className={page === id ? "on" : ""} onClick={() => go(id)}>
          <Icon strokeWidth={1.6} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
