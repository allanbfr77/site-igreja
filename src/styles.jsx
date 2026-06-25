/* ============================================================
   ESTILOS GLOBAIS — injetados via <style> (componente Styles)
   ============================================================ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

    :root{
      --ink:#0B0B0C; --ink2:#161618; --glass:rgba(20,20,22,.55);
      --paper:#F6F5F1; --dim:rgba(246,245,241,.62);
      --gold:#E6B23E; --gold-hi:#F6D27A; --line:rgba(230,178,62,.26);
      --gray:#8A8A8A; --hdr:76px; --bar:66px;
      --serif:'Cormorant Garamond',Georgia,serif;
      --sans:'Inter',system-ui,sans-serif;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    .app{font-family:var(--sans);color:var(--paper);background:var(--ink);font-size:19px;
      min-height:100vh;position:relative;overflow-x:hidden}

    /* ---------- FUNDO ANIMADO (Ken Burns + luz) ---------- */
    .bg{position:fixed;inset:0;z-index:0;overflow:hidden;background:var(--ink)}
    .bg-img{position:absolute;inset:0;background-size:cover;background-position:center;
      background-repeat:no-repeat;filter:saturate(.6) contrast(1.1) brightness(.9)}
    .bg-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.4}
    .bg-fallback{background:
      radial-gradient(120% 75% at 50% 14%, rgba(230,178,62,.16), transparent 56%),
      radial-gradient(100% 90% at 50% 0%, #1b1813, #0b0b0c 62%)}
    .bg-glow{display:none}
    /* overlay LEVE — só uma base, mais forte nas pontas */
    .bg-veil{position:absolute;inset:0;background:linear-gradient(
      180deg, rgba(11,11,12,.74) 0%, rgba(11,11,12,.55) 38%,
      rgba(11,11,12,.60) 68%, rgba(11,11,12,.88) 100%)}
    .bg-grain{display:none}
    @keyframes kenburns{0%{transform:scale(1.06) translate(0,0)}
      100%{transform:scale(1.18) translate(-2%,-2%)}}
    @keyframes breathe{0%,100%{opacity:.18}50%{opacity:.34}}

    /* ---------- HEADER (transparente + blur) ---------- */
    .hdr{position:fixed;top:0;left:0;right:0;height:var(--hdr);z-index:40;
      display:flex;align-items:center;justify-content:space-between;
      padding:0 clamp(16px,4vw,40px);
      background:linear-gradient(180deg,rgba(11,11,12,.55),rgba(11,11,12,.12));
      backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
      border-bottom:1px solid var(--line)}
    .brand{display:flex;align-items:center;gap:11px;cursor:pointer;background:none;border:0;color:inherit;text-decoration:none}
    .brand .mark{width:34px;height:34px;border:1px solid var(--gold);border-radius:50%;
      display:grid;place-items:center;color:var(--gold);flex:none}
    .brand .mark svg{width:18px;height:18px}
    .brand b{font-family:var(--serif);font-weight:600;font-size:20px;letter-spacing:.3px;line-height:1}
    .brand span{display:block;font-size:9.5px;letter-spacing:3px;color:var(--gold);margin-top:2px}
    .hdr-nav{display:flex;gap:4px}
    .hdr-nav a{background:none;border:0;color:var(--dim);font-family:var(--sans);
      font-size:15px;letter-spacing:.4px;padding:8px 15px;border-radius:999px;cursor:pointer;
      text-decoration:none;transition:color .2s,background .2s}
    .hdr-nav a:hover{color:var(--paper)}
    .hdr-nav a.on{color:var(--ink);background:var(--gold);font-weight:500}

    /* ---------- MENU HAMBÚRGUER (mobile) ---------- */
    .hdr-burger{display:none;background:none;border:1px solid var(--line);border-radius:10px;
      width:40px;height:40px;color:var(--paper);cursor:pointer;place-items:center;
      transition:color .2s,border-color .2s}
    .hdr-burger:hover{color:var(--gold);border-color:var(--gold)}
    .hdr-burger svg{width:22px;height:22px}
    .hdr-drawer{position:fixed;top:var(--hdr);left:0;right:0;z-index:39;
      background:rgba(11,11,12,.5);backdrop-filter:blur(16px) saturate(1.1);-webkit-backdrop-filter:blur(16px) saturate(1.1);
      border-bottom:1px solid var(--line);display:flex;flex-direction:column;padding:8px;
      animation:drawerIn .25s ease both}
    .hdr-drawer a{display:flex;align-items:center;gap:12px;background:none;border:0;
      color:var(--dim);font-family:var(--sans);font-size:15px;letter-spacing:.3px;text-align:left;
      padding:14px 16px;border-radius:12px;cursor:pointer;text-decoration:none;transition:background .2s,color .2s}
    .hdr-drawer a svg{width:19px;height:19px;color:var(--gold)}
    .hdr-drawer a:hover{color:var(--paper);background:rgba(255,255,255,.04)}
    .hdr-drawer a.on{color:var(--ink);background:var(--gold);font-weight:500}
    .hdr-drawer a.on svg{color:var(--ink)}
    @keyframes drawerIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
    /* camada para fechar o menu ao clicar fora */
    .hdr-overlay{position:fixed;inset:0;z-index:38;border:0;cursor:default;
      background:rgba(0,0,0,.18);animation:overlayIn .25s ease both}
    @keyframes overlayIn{from{opacity:0}to{opacity:1}}
    @media(min-width:861px){.hdr-drawer,.hdr-overlay{display:none}}

    /* ---------- BARRA FIXA INFERIOR (acesso rápido) ---------- */
    .bar{position:fixed;bottom:0;left:0;right:0;height:var(--bar);z-index:40;
      display:flex;align-items:stretch;justify-content:space-around;
      background:rgba(11,11,12,.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
      border-top:1px solid var(--line)}
    .bar a{flex:1;background:none;border:0;color:var(--dim);cursor:pointer;
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
      font-size:11px;letter-spacing:.3px;text-decoration:none;transition:color .2s;position:relative}
    .bar a svg{width:21px;height:21px}
    .bar a.on{color:var(--gold)}
    .bar a.on::before{content:"";position:absolute;top:0;width:26px;height:2px;
      background:var(--gold);border-radius:2px}

    /* ---------- LAYOUT BASE ---------- */
    .main{position:relative;z-index:10;padding-top:var(--hdr);
      padding-bottom:calc(var(--bar) + 8px);min-height:100vh}
    .wrap{max-width:1120px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
    .eyebrow{font-size:12px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;
      display:inline-flex;align-items:center;gap:10px}
    .eyebrow::before{content:"";width:26px;height:1px;background:var(--gold)}
    h1,h2,h3{font-family:var(--serif);font-weight:500;line-height:1.06;letter-spacing:.2px}

    /* ---------- HERO ---------- */
    .hero{min-height:calc(100vh - var(--hdr));display:flex;flex-direction:column;
      justify-content:center;padding:60px 0 48px}
    .hero h1{font-size:clamp(44px,8vw,92px);margin:18px 0 0}
    .hero h1 em{font-style:italic;color:var(--gold-hi)}
    .hero .lead{font-size:clamp(18px,2.3vw,22px);color:var(--dim);max-width:760px;
      margin-top:20px;line-height:1.6}
    .verse{margin-top:26px;padding-left:18px;border-left:2px solid var(--gold);
      font-family:var(--serif);font-style:italic;font-size:clamp(20px,2.6vw,25px);max-width:540px}
    .verse small{display:block;font-family:var(--sans);font-style:normal;font-size:11px;
      letter-spacing:2px;color:var(--gold);margin-top:8px}
    .hero .verse{font-size:clamp(20px,2.6vw,25px)}
    .cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
    .btn{display:inline-flex;align-items:center;gap:9px;font-size:12px;font-weight:500;
      padding:13px 22px;border-radius:999px;cursor:pointer;border:1px solid transparent;
      transition:transform .15s,background .2s,color .2s;text-decoration:none}
    .btn:hover{transform:translateY(-2px)}
    .btn-gold{background:var(--gold);color:var(--ink)}
    .btn-gold:hover{background:var(--gold-hi)}
    .btn-ghost{border-color:var(--line);color:var(--paper);background:rgba(11,11,12,.4);
      backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    .btn-ghost:hover{border-color:var(--gold);color:var(--gold);background:rgba(11,11,12,.6)}
    .btn svg{width:17px;height:17px}

    /* ---------- CARDS (vidro escuro + fio dourado) ---------- */
    .section{padding:46px 0}
    .grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px}
    .card{position:relative;background:var(--glass);border:1px solid var(--line);
      border-radius:18px;padding:26px;backdrop-filter:blur(10px);
      -webkit-backdrop-filter:blur(10px);overflow:hidden}
    .card::after{content:"";position:absolute;top:0;left:0;width:46px;height:46px;
      border-top:2px solid var(--gold);border-left:2px solid var(--gold);
      border-top-left-radius:18px;opacity:.5}
    .card h3{font-size:31px;margin-bottom:4px}
    /* rótulo dourado (PIX, TRANSFERÊNCIA, ONDE NOS ENCONTRAR, etc.) — tamanho único */
    .kicker{font-size:12px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;display:block}
    .card .kicker{margin-bottom:10px}

    /* agenda / calendário */
    .agenda{margin-top:18px;display:flex;flex-direction:column;gap:12px}
    .slot{display:flex;align-items:center;gap:16px;padding:16px 18px;border-radius:12px;
      background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06)}
    .slot.next{border-color:var(--line);background:rgba(230,178,62,.08)}
    .slot .day{width:46px;height:46px;flex:none;border-radius:10px;display:grid;
      place-items:center;font-weight:600;font-size:13px;letter-spacing:1px;
      background:var(--ink2);color:var(--gold);border:1px solid var(--line)}
    .slot .day.day-stack{width:auto;min-width:56px;height:auto;display:flex;flex-direction:column;
      gap:3px;padding:9px 8px}
    .slot .day.day-stack small{font-size:11px;font-weight:500;color:var(--gold-hi);letter-spacing:.5px}
    .slot .info{flex:1;display:flex;flex-direction:column}
    .slot .ev{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0}
    .slot .ev:first-child{padding-top:0}
    .slot .ev:last-child{padding-bottom:0}
    .slot .ev + .ev{border-top:1px solid rgba(255,255,255,.06)}
    .slot .info b{font-family:var(--serif);font-size:22px;font-weight:500}
    .slot .info p{font-size:14px;color:var(--dim);display:flex;align-items:center;gap:5px;margin-top:6px}
    .slot .info p svg{width:13px;height:13px;color:var(--gold)}
    .tag{font-size:9px;letter-spacing:1.5px;color:var(--ink);background:var(--gold);
      padding:3px 8px;border-radius:999px;font-weight:600}

    /* link dourado "ver a programação do mês" */
    .month-link{margin-top:16px;display:inline-flex;align-items:center;gap:7px;background:none;border:0;
      color:var(--gold);font-family:var(--sans);font-size:16px;letter-spacing:.5px;cursor:pointer;
      padding:4px 0;transition:gap .2s,color .2s}
    .month-link svg{width:15px;height:15px}
    .month-link:hover{color:var(--gold-hi);gap:11px}

    /* programação do mês — badges das semanas (à esquerda) + programação (à direita) */
    .ed.ed-top{align-items:start}
    .ed.ed-top .agenda{margin-top:0}
    .week-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;max-width:300px}
    .week-badge{background:rgba(255,255,255,.04);border:1px solid var(--line);color:var(--dim);
      font-family:var(--sans);font-size:13px;letter-spacing:.5px;padding:9px 16px;border-radius:999px;
      cursor:pointer;transition:all .2s}
    .week-badge:hover{color:var(--gold);border-color:var(--gold)}
    .week-badge.on{background:var(--gold);color:var(--ink);border-color:var(--gold);font-weight:600}
    .week-range{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
    .week-hint{color:var(--dim);font-size:15px;margin-top:6px}
    .slot .info p.slot-note{color:var(--gold-hi);margin-top:4px}
    .month-back{display:inline-flex;align-items:center;gap:6px;margin-top:22px;background:none;
      border:1px solid var(--line);color:var(--gold);font-family:var(--sans);font-size:12px;
      padding:8px 16px;border-radius:999px;cursor:pointer;transition:all .2s}
    .month-back:hover{background:var(--gold);color:var(--ink);border-color:var(--gold)}
    .month-back svg{width:14px;height:14px}

    /* mapa */
    .map-frame{margin-top:18px;border-radius:14px;overflow:hidden;border:1px solid var(--line);
      height:230px;background:var(--ink2)}
    .map-frame iframe{width:100%;height:100%;border:0;
      filter:invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.9) contrast(0.95)}
    .addr{display:flex;align-items:flex-start;gap:9px;margin-top:16px;font-size:16px;color:var(--dim)}
    .addr svg{width:18px;height:18px;color:var(--gold);flex:none;margin-top:1px}
    .map-link{margin-top:14px}

    /* história */
    .history{margin-top:26px;display:grid;grid-template-columns:1.4fr .8fr;gap:30px;align-items:center}
    .history p{color:var(--dim);line-height:1.75;font-size:16px;margin-top:14px}
    .stat{text-align:center;padding:28px;border:1px solid var(--line);border-radius:16px;
      background:rgba(230,178,62,.05)}
    .stat .num{font-family:var(--serif);font-size:58px;color:var(--gold-hi);line-height:1}
    .stat .lbl{font-size:11px;letter-spacing:3px;color:var(--dim);text-transform:uppercase;margin-top:8px}

    /* ---------- HOME EDITORIAL ---------- */
    .ed-home{margin-top:34px}
    .ed{display:grid;grid-template-columns:.42fr 1fr;gap:34px;align-items:center;
      padding:64px 0;border-top:0}
    .ed + .ed{border-top:1px solid var(--line)}
    .ed-home > .ed:first-child{border-top:1px solid var(--line)}
    /* cada seção "encaixa" ao rolar — só na home */
    html.snap{scroll-snap-type:y proximity}
    html.snap .hero,
    html.snap .ed{scroll-snap-align:start;scroll-margin-top:var(--hdr)}
    .ed .lead-col .kicker{font-size:12px;letter-spacing:3px;color:var(--gold);text-transform:uppercase}
    .ed .lead-col h3{font-size:36px;margin-top:12px}
    .ed .addr{margin-top:16px}
    .ed-map{margin-top:0;height:300px}
    .ed-text{color:var(--dim);line-height:1.8;font-size:18px;max-width:660px;margin-bottom:14px}
    .ed-roles{color:var(--paper);font-size:15px;line-height:1.8;margin-top:2px}
    .ed-roles b{color:var(--gold);font-weight:500}
    .bignum{font-family:var(--serif);font-size:clamp(68px,10vw,100px);color:var(--gold-hi);line-height:.95;margin-top:14px}
    .bignum-lbl{font-size:12px;letter-spacing:3px;color:var(--dim);text-transform:uppercase;margin-top:4px}
    .ed-hist-title{font-size:35px;margin-bottom:14px;color:var(--gold);text-transform:uppercase;letter-spacing:1px}
    @media(max-width:860px){
      .ed{grid-template-columns:1fr;gap:18px;padding:40px 0;align-items:start;align-content:start}
      .ed-map{height:240px}
    }

    /* ---------- LOGO + HERO CENTRALIZADO ---------- */
    .brand-logo{height:62px;width:auto;display:block}
    .hero{align-items:center;text-align:center}
    .hero h1{font-size:clamp(26px,6vw,72px);white-space:nowrap;margin:18px 0 0}
    .hero .lead{margin-left:auto;margin-right:auto}
    .hero .cta-row{justify-content:center}
    .hero .verse{border-left:0;padding-left:0;text-align:center;margin-left:auto;margin-right:auto;max-width:none}

    /* ---------- RODAPÉ NORMAL ---------- */
    .footer{position:relative;z-index:10;border-top:1px solid var(--line);margin-top:30px}
    .footer-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;
      gap:22px;padding:34px clamp(16px,4vw,40px)}
    .footer-brand b{font-family:var(--serif);font-size:28px;font-weight:600}
    .footer-brand p{font-size:16px;color:var(--dim);margin-top:6px;max-width:420px;line-height:1.6}
    .socials{display:flex;gap:18px;align-items:center}
    .socials a{display:grid;place-items:center;color:var(--paper);transition:color .2s,transform .2s}
    .socials a svg{width:26px;height:26px}
    .socials a:hover{color:var(--gold);transform:translateY(-2px)}
    .copy{background:#0a0a0a;color:var(--gray);font-size:14px;text-align:center;
      padding:16px;letter-spacing:.3px;border-top:1px solid rgba(255,255,255,.05)}

    /* ---------- RESPONSIVO ---------- */
    @media(max-width:860px){
      .hdr-nav{display:none}
      .hdr-burger{display:grid}
      .grid2{grid-template-columns:1fr}
      .history{grid-template-columns:1fr;gap:22px}
      .ed-hist-title{font-size:26px}
      .ed-text{font-size:14px;line-height:1.7;margin-bottom:12px}
      .ed-hist{text-align:center;justify-items:center}
      .ed-hist .lead-col{display:flex;flex-direction:column;align-items:center}
      .ed-hist .ed-text{max-width:100%;margin-left:auto;margin-right:auto}
      .ed-cal,.ed-loc{justify-items:center;text-align:center}
      .ed-cal .lead-col,.ed-loc .lead-col{display:flex;flex-direction:column;align-items:center}
      .ed-cal .week-badges{justify-content:center}
      .ed-cal .prog-col,.ed-loc .map-frame{width:100%}
      .ed-cal .prog-col{text-align:left}
      .ed-cal .week-range,.ed-cal .week-hint{text-align:center}
      /* semana sem eventos: card com altura parecida à da agenda semanal */
      .ed-cal .week-hint{display:grid;place-items:center;min-height:200px;margin-top:14px;
        padding:24px;border:1px solid rgba(255,255,255,.06);border-radius:12px;
        background:rgba(255,255,255,.03)}
      .ed-loc .addr{justify-content:center}
    }
    @media(max-width:520px){
      .bar a span{display:none}
      .bar a svg{width:23px;height:23px}
      .hero h1{white-space:normal}
      .card{padding:20px}
      .footer-top{flex-direction:column;align-items:center;text-align:center}
      .footer-brand p{margin-left:auto;margin-right:auto}
      .socials{width:100%;justify-content:center}
      .mdetail .head{gap:14px}
      .mdetail .head .mi{width:56px;height:56px;border-radius:14px}
      .mdetail .head .mi svg{width:28px;height:28px}
      .mdetail h2{font-size:clamp(28px,7vw,42px)}
    }
    /* ---------- CABEÇALHO DE PÁGINA ---------- */
    .page-head{padding:48px 0 4px;text-align:center}
    .page-head h2{font-size:clamp(44px,6.5vw,73px);margin-top:14px}
    .page-head .lead{color:var(--dim);max-width:580px;margin:14px auto 0;font-size:18px;line-height:1.65}
    .page-head .verse{border-left:0;padding-left:0;text-align:center;margin-left:auto;margin-right:auto;max-width:720px}

    /* ---------- ABAS ---------- */
    .tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;padding:28px 0 24px}
    .tabs::-webkit-scrollbar{display:none}
    .tabs button{flex:none;background:rgba(255,255,255,.03);border:1px solid var(--line);
      color:var(--dim);font-family:var(--sans);font-size:15px;letter-spacing:.4px;
      padding:12px 20px;border-radius:999px;cursor:pointer;white-space:nowrap;transition:all .2s}
    .tabs button:hover{color:var(--paper)}
    .tabs button.on{background:var(--gold);border-color:var(--gold);color:var(--ink);font-weight:500}
    /* selo "Em curso" na aba do estudo em andamento */
    .tabs button .tab-now{display:inline-flex;align-items:center;gap:5px;margin-left:8px;
      font-size:8.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
      padding:3px 8px;border-radius:999px;background:var(--ink);color:var(--gold);border:1px solid var(--line)}
    .tabs button .tab-now::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--gold);
      animation:pulseDot 1.6s ease-out infinite}
    @keyframes pulseDot{0%{box-shadow:0 0 0 0 rgba(226,178,62,.6)}100%{box-shadow:0 0 0 12px rgba(226,178,62,0)}}

    /* ---------- GRADE DE ESTUDOS ---------- */
    .study-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding-bottom:24px}
    .scard{position:relative;border:1px solid var(--line);border-radius:16px;overflow:hidden;
      background:var(--glass);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
      display:flex;flex-direction:column}
    .scard .badge{position:absolute;top:14px;left:14px;z-index:2;font-size:9px;letter-spacing:1.5px;
      font-weight:600;padding:5px 11px;border-radius:999px;background:rgba(11,11,12,.72);
      color:var(--gold);border:1px solid var(--line);display:flex;align-items:center;gap:6px}
    .scard .badge svg{width:12px;height:12px}
    .scard-body{padding:22px;display:flex;flex-direction:column;flex:1}
    .scard-body .num{font-size:12px;letter-spacing:1.5px;font-weight:600;color:var(--gold);text-transform:uppercase}
    .scard-body h4{font-family:var(--serif);font-size:25px;font-weight:500;margin:8px 0 6px;line-height:1.15}
    .scard-body p{font-size:15px;color:var(--dim);line-height:1.55;flex:1}
    .dl{margin-top:18px;align-self:flex-start}
    /* linha do número da aula + link de download do PDF (alinhados à esquerda) */
    .num-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
    .dl-link{display:inline-flex;align-items:center;gap:6px;color:var(--gold);text-decoration:none;
      font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
      border:1px solid var(--line);border-radius:999px;padding:5px 11px;
      transition:background .2s,color .2s,border-color .2s,transform .15s}
    .dl-link:hover{background:var(--gold);color:var(--ink);border-color:var(--gold);transform:translateY(-1px)}
    .dl-link svg{width:15px;height:15px}
    .img-fallback{position:absolute;inset:0;
      background:radial-gradient(120% 100% at 30% 0%, rgba(230,178,62,.16), #14130f)}

    /* card de vídeo */
    .vthumb{position:relative;aspect-ratio:16/9;background:var(--ink2);cursor:pointer;overflow:hidden}
    .vthumb img{width:100%;height:100%;object-fit:cover;display:block}
    /* capa renderizada como imagem de fundo (sobre o gradiente .img-fallback) */
    .thumb-cover{position:absolute;inset:0;z-index:1;background-size:cover;background-position:center;
      background-repeat:no-repeat}
    .vthumb .play{position:absolute;inset:0;z-index:2;display:grid;place-items:center;
      background:rgba(11,11,12,.32);transition:background .2s}
    .vthumb:hover .play{background:rgba(11,11,12,.12)}
    .vthumb .play span{width:66px;height:46px;border-radius:13px;background:#f00;
      display:grid;place-items:center;color:#fff;transition:background .2s}
    .vthumb:hover .play span{background:#ff2626}
    .vthumb .play span svg{width:26px;height:26px;margin-left:2px}
    .vframe{aspect-ratio:16/9;width:100%;border:0;display:block}
    .vthumb-static{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--ink2)}
    .vthumb-static img{width:100%;height:100%;object-fit:cover;display:block}

    /* card só imagem */
    .imgcard{min-height:250px;justify-content:flex-end;background-size:cover;background-position:center}
    .imgcard .veil{position:absolute;inset:0;
      background:linear-gradient(180deg,rgba(11,11,12,.08),rgba(11,11,12,.88))}
    .imgcard .scard-body{position:relative;z-index:1;flex:none;padding-top:40px}

    @media(max-width:860px){.study-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:520px){.study-grid{grid-template-columns:1fr}}

    /* ---------- MINISTÉRIOS ---------- */
    .min-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding-bottom:6px}
    .mcard{position:relative;text-align:left;background:var(--glass);border:1px solid var(--line);
      border-radius:16px;padding:24px;cursor:pointer;color:inherit;font-family:inherit;
      backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);min-height:184px;
      display:flex;flex-direction:column;gap:12px;transition:transform .18s,border-color .2s}
    .mcard:hover{transform:translateY(-4px);border-color:var(--gold)}
    .mi{width:50px;height:50px;border-radius:14px;border:1px solid var(--line);
      background:rgba(230,178,62,.08);display:grid;place-items:center;color:var(--gold);flex:none}
    .mi svg{width:24px;height:24px}
    .mcard b{font-family:var(--serif);font-size:21px;font-weight:500;line-height:1.12}
    .mcard p{font-size:12.5px;color:var(--dim);line-height:1.5;flex:1}
    .mcard .go{display:flex;align-items:center;gap:6px;font-size:10px;letter-spacing:1.5px;
      color:var(--gold);text-transform:uppercase}
    .mcard .go svg{width:14px;height:14px}

    /* mosaico de ministérios (foto + nome) */
    .min-grid{gap:14px;margin-top:34px}
    .tile{position:relative;aspect-ratio:3/4;border-radius:16px;overflow:hidden;border:1px solid var(--line);
      cursor:pointer;text-align:left;color:inherit;font-family:inherit;padding:0;display:block;
      background:radial-gradient(120% 90% at 30% 0%, rgba(230,178,62,.18), #14130f);transition:transform .2s}
    .tile.photo{background-size:cover;background-position:center}
    .tile:hover{transform:translateY(-4px)}
    .tile .wm{position:absolute;top:14px;right:14px;color:rgba(246,210,122,.7);z-index:1}
    .tile .wm svg{width:30px;height:30px}
    .tile .veil2{position:absolute;inset:0;background:linear-gradient(180deg,
      rgba(11,11,12,.4) 0%, transparent 28%, transparent 40%, rgba(11,11,12,.93))}
    .tile .cap{position:absolute;left:16px;right:16px;bottom:16px;z-index:2}
    .tile .cap b{font-family:var(--serif);font-size:20px;font-weight:500;display:block;line-height:1.12}
    .tile .cap .cap-tag{display:block;font-size:12px;color:var(--dim);margin-top:6px;
      max-height:0;opacity:0;overflow:hidden;transition:all .3s;line-height:1.4}
    .tile:hover .cap .cap-tag{max-height:78px;opacity:1}

    /* bloco bônus */
    .bonus{margin-top:26px;position:relative;overflow:hidden;border:1px solid var(--line);
      border-radius:18px;padding:32px;display:flex;align-items:center;gap:26px;
      background:linear-gradient(120deg, rgba(230,178,62,.12), rgba(20,20,22,.55));
      backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
    .bonus .bi{width:74px;height:74px;flex:none;border-radius:50%;border:1px solid var(--gold);
      display:grid;place-items:center;color:var(--gold)}
    .bonus .bi svg{width:34px;height:34px}
    .bonus .bx{flex:1}
    .bonus .bx span{font-size:10px;letter-spacing:3px;color:var(--gold);text-transform:uppercase}
    .bonus .bx b{display:block;font-family:var(--serif);font-size:30px;font-weight:600;margin:6px 0}
    .bonus .bx p{font-size:14px;color:var(--dim);max-width:560px;line-height:1.6}

    /* detalhe do ministério */
    .mdetail{display:flex;flex-direction:column;min-height:calc(100vh - var(--hdr) - var(--bar) - 8px)}
    .mdetail .footer{margin-top:auto}
    .back{display:inline-flex;align-items:center;gap:8px;background:none;border:0;color:var(--dim);
      font-family:var(--sans);font-size:13px;cursor:pointer;padding:8px 0;margin-top:8px;transition:color .2s}
    .back:hover{color:var(--gold)}
    .back svg{width:16px;height:16px}
    .mdetail .head{display:flex;align-items:center;gap:20px;margin-top:18px}
    .mdetail .head .mi{width:72px;height:72px;border-radius:18px}
    .mdetail .head .mi svg{width:34px;height:34px}
    .mdetail .sub{font-size:11px;letter-spacing:3px;color:var(--gold);text-transform:uppercase}
    .mdetail h2{font-size:clamp(38px,6.5vw,62px);margin-top:4px}
    .mdetail .body{margin-top:28px;margin-bottom:44px;display:grid;grid-template-columns:1.5fr .9fr;gap:30px}
    .mdetail .body-full{grid-template-columns:1fr}
    .mdetail .body p{color:var(--dim);line-height:1.8;font-size:17px;margin-bottom:14px}
    .mdetail .act-title{color:var(--paper);font-size:16px;font-weight:500;margin:4px 0 12px}
    .mdetail .act-list{list-style:none;padding:0;margin:0 0 8px;display:flex;flex-direction:column;gap:10px}
    .mdetail .act-list li{position:relative;padding-left:20px;color:var(--dim);font-size:16px;line-height:1.65}
    .mdetail .act-list li::before{content:"";position:absolute;left:2px;top:9px;width:6px;height:6px;
      border-radius:50%;background:var(--gold)}
    .meta{border:1px solid var(--line);border-radius:16px;padding:22px;height:fit-content;
      background:rgba(255,255,255,.03);display:flex;flex-direction:column;gap:16px}
    .meta .row{display:flex;gap:12px;align-items:flex-start;font-size:16px}
    .meta .row svg{width:18px;height:18px;color:var(--gold);flex:none;margin-top:2px}
    .meta .row small{display:block;font-size:10px;letter-spacing:2px;color:var(--gold);
      text-transform:uppercase;margin-bottom:4px}
    .meta .row span{color:var(--paper)}
    .cta{margin-top:0;align-self:start;justify-self:start}

    @media(max-width:860px){.min-grid{grid-template-columns:repeat(2,1fr)}.mdetail .body{grid-template-columns:1fr}}
    @media(max-width:640px){.bonus{flex-direction:column;text-align:center}}
    @media(max-width:520px){.min-grid{grid-template-columns:repeat(2,1fr)}}

    /* ---------- DOE ---------- */
    .doe-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:30px}
    .qr{width:208px;height:208px;background:#fff;border-radius:12px;padding:5px;
      margin:20px auto 0;display:grid;place-items:center}
    .qr img{width:100%;height:100%;display:block}
    .pix-key{display:flex;align-items:center;gap:10px;justify-content:space-between;margin-top:18px;
      background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:12px 14px}
    .pix-key .lab{font-size:10px;letter-spacing:2px;color:var(--gold);text-transform:uppercase}
    .pix-key code{display:block;font-family:var(--sans);font-size:15px;color:var(--paper);
      word-break:break-all;margin-top:3px}
    .copybtn{flex:none;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);
      background:none;color:var(--gold);font-family:var(--sans);font-size:13px;padding:10px 14px;
      border-radius:999px;cursor:pointer;transition:all .2s}
    .copybtn:hover{background:var(--gold);color:var(--ink);border-color:var(--gold)}
    .copybtn svg{width:14px;height:14px}
    .bank-rows{margin-top:8px}
    .brow{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:14px 0;
      border-bottom:1px solid rgba(255,255,255,.06)}
    .brow:last-child{border-bottom:0}
    .brow .k{color:var(--dim);font-size:11px;letter-spacing:1.5px;text-transform:uppercase}
    .brow .v{color:var(--paper);text-align:right;font-weight:500;font-size:17px}
    .doe-note{text-align:center;color:var(--dim);font-size:16px;max-width:580px;
      margin:34px auto 0;line-height:1.75}
    @media(max-width:860px){.doe-grid{grid-template-columns:1fr}}

    /* ---------- CONTATO ---------- */
    .contact-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:22px;margin-top:30px}
    .field{margin-bottom:16px}
    .field label{display:block;font-size:11px;letter-spacing:2px;text-transform:uppercase;
      color:var(--gold);margin-bottom:8px}
    .field input,.field textarea{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--line);
      border-radius:12px;padding:14px 16px;color:var(--paper);font-family:var(--sans);font-size:17px;
      outline:none;transition:border-color .2s}
    .field input::placeholder,.field textarea::placeholder{color:rgba(246,245,241,.32)}
    .field input:focus,.field textarea:focus{border-color:var(--gold)}
    .field textarea{resize:vertical;min-height:140px}
    .form-status{margin-top:4px;margin-bottom:14px;font-size:13px}
    .form-status.ok{color:#82c994}
    .form-status.err{color:#e29393}
    .info-card{display:flex;flex-direction:column}
    .info-rows{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;margin-top:20px}
    .irow{display:flex;gap:14px;align-items:flex-start;padding:20px 0;
      border-bottom:1px solid rgba(255,255,255,.06)}
    .irow:last-child{border-bottom:0}
    .irow svg{width:20px;height:20px;color:var(--gold);flex:none;margin-top:2px}
    .irow small{display:block;font-size:10px;letter-spacing:2px;text-transform:uppercase;
      color:var(--gold);margin-bottom:5px}
    .irow a,.irow span{color:var(--paper);font-size:17px;text-decoration:none}
    .irow a:hover{color:var(--gold)}
    .info-socials{display:flex;gap:11px;margin-top:22px}

    /* ---------- CULTOS ---------- */
    .yt-note{margin-top:20px;border:1px solid var(--line);border-radius:14px;padding:15px 18px;
      background:rgba(230,178,62,.06);font-size:14px;color:var(--dim);line-height:1.6;
      display:flex;gap:12px;align-items:flex-start}
    .yt-note svg{width:18px;height:18px;color:var(--gold);flex:none;margin-top:1px}
    .next-live{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:26px;
      border:1px solid var(--line);border-radius:14px;padding:16px 20px;text-align:center;
      background:rgba(230,178,62,.06);color:var(--paper);font-size:16px;line-height:1.5;
      text-decoration:none;transition:background .2s,border-color .2s}
    .next-live:hover{background:rgba(230,178,62,.12);border-color:var(--gold)}
    .next-live svg{width:22px;height:22px;color:var(--gold);flex:none}
    .next-live b{color:var(--gold);font-weight:600}
    .next-live u{color:var(--gold-hi);text-underline-offset:3px;white-space:nowrap}
    .skel{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--glass)}
    .skel .sh{aspect-ratio:16/9;background:linear-gradient(90deg,
      rgba(255,255,255,.04),rgba(255,255,255,.10),rgba(255,255,255,.04));
      background-size:200% 100%;animation:shimmer 1.4s infinite}
    .skel .sb{height:66px}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

    @media(max-width:860px){.contact-grid{grid-template-columns:1fr}}

    /* ---------- EFEITOS / ANIMAÇÕES ---------- */
    .reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease, transform .7s ease}
    .reveal.in{opacity:1;transform:none}
    .reveal-stagger > *{opacity:0;transition:opacity .6s ease, transform .25s ease}
    .reveal-stagger.in > *{opacity:1}
    .reveal-stagger.in > *:nth-child(1){transition-delay:.04s}
    .reveal-stagger.in > *:nth-child(2){transition-delay:.11s}
    .reveal-stagger.in > *:nth-child(3){transition-delay:.18s}
    .reveal-stagger.in > *:nth-child(4){transition-delay:.25s}
    .reveal-stagger.in > *:nth-child(5){transition-delay:.32s}
    .reveal-stagger.in > *:nth-child(6){transition-delay:.39s}
    .reveal-stagger.in > *:nth-child(7){transition-delay:.46s}
    .reveal-stagger.in > *:nth-child(8){transition-delay:.53s}
    .reveal-stagger.in > *:nth-child(n+9){transition-delay:.6s}

    .page-anim{animation:pageIn .5s ease both}
    @keyframes pageIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

    .hero > *{animation:riseIn .8s cubic-bezier(.2,.6,.2,1) both}
    .hero > *:nth-child(1){animation-delay:.05s}
    .hero > *:nth-child(2){animation-delay:.15s}
    .hero > *:nth-child(3){animation-delay:.28s}
    .hero > *:nth-child(4){animation-delay:.40s}
    .hero > *:nth-child(5){animation-delay:.52s}
    @keyframes riseIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

    .tile-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .6s ease;z-index:0}
    .tile:hover .tile-bg{transform:scale(1.07)}
    .tile.has-img{background:#0c0c0e}
    .has-img .tile-bg{background-size:contain;background-repeat:no-repeat;background-position:center 40%}
    .has-img .wm{display:none}
    .has-img .veil2{background:linear-gradient(180deg,transparent 60%,rgba(11,11,12,.92))}

    .btn{position:relative;overflow:hidden}
    .btn-gold::after{content:"";position:absolute;top:0;left:-130%;width:55%;height:100%;
      background:linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent);
      transform:skewX(-18deg);transition:left .6s ease;pointer-events:none}
    .btn-gold:hover::after{left:150%}

    .hdr-nav a{position:relative}
    .hdr-nav a::after{content:"";position:absolute;left:13px;right:13px;bottom:5px;height:1.5px;
      background:var(--gold);border-radius:2px;transform:scaleX(0);transform-origin:center;transition:transform .25s ease}
    .hdr-nav a:hover::after{transform:scaleX(1)}
    .hdr-nav a.on::after{display:none}

    /* ---------- HEADER AO ROLAR ---------- */
    .hdr{transition:background .3s ease, border-color .3s ease}
    .hdr.scrolled{background:rgba(11,11,12,.9);border-bottom-color:var(--line)}

    /* ---------- WHATSAPP + VOLTAR AO TOPO ---------- */
    .wa-fab{position:fixed;right:16px;bottom:calc(var(--bar) + 16px);z-index:45;width:48px;height:48px;
      border-radius:50%;background:#25D366;color:#fff;display:grid;place-items:center;text-decoration:none;
      box-shadow:0 8px 22px rgba(0,0,0,.4);transition:transform .2s;animation:waPulse 2.6s ease-out infinite}
    .wa-fab:hover{transform:scale(1.08)}
    .wa-fab svg{width:25px;height:25px}
    @keyframes waPulse{0%{box-shadow:0 8px 22px rgba(0,0,0,.4),0 0 0 0 rgba(37,211,102,.5)}
      100%{box-shadow:0 8px 22px rgba(0,0,0,.4),0 0 0 16px rgba(37,211,102,0)}}
    .to-top{position:fixed;right:21px;bottom:calc(var(--bar) + 98px);z-index:45;width:34px;height:34px;
      border-radius:50%;background:var(--glass);border:1px solid var(--line);color:var(--gold);
      backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:grid;place-items:center;cursor:pointer;
      transition:transform .2s,background .2s,color .2s}
    .to-top:hover{transform:translateY(-3px);background:var(--gold);color:var(--ink);border-color:var(--gold)}
    .to-top svg{width:15px;height:15px}

    @media(prefers-reduced-motion:reduce){
      .bg-img,.bg-glow{animation:none}
      .btn:hover,.socials a:hover{transform:none}
      .reveal,.reveal-stagger > *{opacity:1;transform:none;transition:none}
      .hero > *,.page-anim{animation:none}
      .tile:hover .tile-bg{transform:none}
      .btn-gold:hover::after{left:-130%}
      .wa-fab,.tabs button .tab-now::before,.hdr-drawer,.hdr-overlay{animation:none}
    }
  `}</style>
);

export default Styles;
