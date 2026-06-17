# Status do projeto — Site Igreja Nova Vida de Botafogo

Resumo do que já foi feito e do que falta. (Site novo em React/Vite.)

## ✅ Pronto

**Arquitetura**
- Refatoração do `App.jsx` único (1688 linhas) em estrutura modular:
  - `src/config.js` — toda a configuração editável em um só lugar.
  - `src/styles.jsx` — todos os estilos (componente `Styles`).
  - `src/components/` — icons, Background, Header, BottomBar, Footer, Loader, WhatsAppFab, ScrollTop, LiveBanner, CountUp, useReveal.
  - `src/pages/` — Home, Estudos, Ministerios, Doe, Cultos, Contato.
  - `src/App.jsx` — apenas a casca (estados globais + navegação).

**Conteúdo dos estudos**
- **Apocalipse** — 21 aulas. Títulos: aulas 1–5 "Escatologia — Parte 1 a 5"; aulas 6–21 por capítulo, marcando os que vêm juntos (ex.: "Capítulos 2 e 3", "Capítulos 17 e 18 (parte 1)").
- **Cristologia** — 11 aulas (PDFs reais) com os títulos de cada aula.
- **Espírito Santo** — 17 aulas (PDFs reais) com os títulos de cada aula (a aba "Gênesis" virou "Espírito Santo").
- **Capacitação** — 2 cursos: Capelania e Evangelismo.

**Cards e interface**
- Card de estudo unificado: capa no topo (16:9), play sobre a capa nos vídeos, e botão claro "Baixar PDF" (ícone + texto) na linha da aula, só quando há PDF.
- Capa renderizada como imagem de fundo (sem "imagem quebrada" e sem flicker; cai no gradiente quando a capa ainda não existe).
- Selo "Em curso" na aba do estudo em andamento (definido por `STUDIES.current`).
- Menu hambúrguer no mobile (☰ / ✕), abre lista de páginas, fecha ao clicar fora.
- Ajustes de mobile: espaçamento das seções da home, rótulos dos cards no mesmo tamanho, rodapé centralizado, botão "voltar ao topo" menor e reposicionado.

**Apoio**
- `PROMPTS_CAPAS.md` — prompts prontos (estilo base + cena por aula) para gerar todas as capas. As cenas de escatologia (1–5) foram baseadas no conteúdo real dos PDFs.

## ⏳ Pendente

**1. EmailJS (formulário de contato) — criar e configurar do zero**
- O envio de e-mail é funcionalidade nova (não existia antes).
- Passos: criar conta no EmailJS, conectar o e-mail, criar um template com as variáveis `from_name`, `reply_to` e `message`, e pegar os 3 códigos.
- Onde preencher: `CONTACT.emailjs` → `serviceId`, `templateId`, `publicKey` (em `src/config.js`).
- Enquanto não configurado, o formulário avisa que o envio será ativado depois.

**2. YouTube (seção Cultos) — criar e configurar do zero**
- Criar uma chave da YouTube Data API v3 no Google Cloud Console e **restringi-la ao domínio** do site (e incluir `localhost` para desenvolvimento).
- Onde preencher: `YOUTUBE.apiKey` (em `src/config.js`). O `channelId` já está preenchido (`UCLuWhw8fYakYDzM9SlNXVKg`).
- Enquanto não configurado, a página Cultos mostra exemplos (fallback).

**3. Outras pendências já conhecidas**
- Adicionar as capas em `public/estudos/capas/` (nomes: `apocalipse-1..21.png`, `cristologia-1..11.png`, `espirito-1..17.png`, `capelania.png`, `evangelismo.png`).
- Adicionar `favicon` e `og-image`.
- Publicar (Vercel/Netlify) + domínio e, então, trocar `og:image` / `og:url` pelos endereços absolutos.
