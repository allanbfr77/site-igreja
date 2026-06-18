/* ------------------------------------------------------------
   ROTAS — mapeamento entre o id da página e a URL limpa.
   "inicio" = "/", as demais = "/<id>". Usado pelo App (estado/
   History API) e pelos menus (links <a href> reais p/ SEO).
   ------------------------------------------------------------ */
export const PAGES = ["inicio", "estudos", "ministerios", "doe", "cultos", "contato"];

export const pathFor = (id) => (id === "inicio" ? "/" : `/${id}`);

export const pageFromPath = (p) => {
  const seg = (p || "/").replace(/^\/+|\/+$/g, "").toLowerCase();
  return PAGES.includes(seg) ? seg : "inicio";
};

/* True quando o clique deve abrir em nova aba / deixar o navegador
   cuidar (ctrl/cmd/shift/alt-clique ou clique que não é o botão esquerdo).
   Nesse caso NÃO interceptamos: o <a href> funciona normalmente. */
export const isModifiedClick = (e) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
