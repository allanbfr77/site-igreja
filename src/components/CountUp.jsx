import { useState, useEffect, useRef } from "react";

/* Contagem animada de um número ao entrar na tela (respeita reduzir movimento) */
export default function CountUp({ value }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const target = parseInt(String(value).replace(/\D/g, ""), 10) || 0;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          io.disconnect();
          const dur = 1300, start = performance.now();
          const tick = (t) => {
            const p = Math.min((t - start) / dur, 1);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{n}</span>;
}
