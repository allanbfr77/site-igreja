import { ArrowUp } from "lucide-react";

/* Botão "voltar ao topo" (aparece após rolar) */
export default function ScrollTop({ show }) {
  if (!show) return null;
  return (
    <button className="to-top" aria-label="Voltar ao topo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <ArrowUp />
    </button>
  );
}
