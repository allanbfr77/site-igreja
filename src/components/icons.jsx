/* ============================================================
   ÍCONES — SVG das redes sociais (nunca emoji) + marca da cruz
   ============================================================ */

export const IgIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
);

export const FbIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}>
    <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.84.26-1.42 1.48-1.42h1.42V5.2c-.69-.09-1.46-.2-2.34-.2-2.32 0-3.9 1.42-3.9 4.02v2.08H8.1V14h2.06v7h3.34z" />
  </svg>
);

export const YtIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.2 9.3l4.4 2.7-4.4 2.7V9.3z" fill="currentColor" />
  </svg>
);

export const WaIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
       strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21z" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export const CrossMark = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3v18M7 8h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
