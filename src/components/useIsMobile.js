import { useState, useEffect } from "react";

const MOBILE_MAX = 860;

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(max-width:${MOBILE_MAX}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${MOBILE_MAX}px)`);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
