import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CHURCH, NAV } from "../config.js";
import { CrossMark } from "./icons.jsx";

/* Header fixo transparente (fica sólido ao rolar) com logo, navegação
   e menu hambúrguer no mobile (☰ / ✕).
   A camada e o menu ficam FORA do <header> de propósito: o header usa
   backdrop-filter, que prenderia elementos position:fixed dentro dele. */
export default function Header({ page, go, scrolled }) {
  const [open, setOpen] = useState(false);
  const navigate = (id) => { setOpen(false); go(id); };

  return (
    <>
      <header className={`hdr ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
        <button className="brand" onClick={() => navigate("inicio")}>
          {CHURCH.logo ? (
            <img className="brand-logo" src={CHURCH.logo} alt={CHURCH.name} />
          ) : (
            <>
              <span className="mark"><CrossMark /></span>
              <span>
                <b>{CHURCH.shortName}</b>
                <span>COMUNIDADE</span>
              </span>
            </>
          )}
        </button>

        <nav className="hdr-nav">
          {NAV.map((n) => (
            <button key={n.id} className={page === n.id ? "on" : ""} onClick={() => navigate(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        <button
          className="hdr-burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>

      {open && (
        <>
          <button className="hdr-overlay" aria-label="Fechar menu" onClick={() => setOpen(false)} />
          <div className="hdr-drawer">
            {NAV.map(({ id, label, Icon }) => (
              <button key={id} className={page === id ? "on" : ""} onClick={() => navigate(id)}>
                <Icon strokeWidth={1.6} /> {label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
