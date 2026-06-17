import { CONTACT } from "../config.js";
import { WaIcon } from "./icons.jsx";

/* Botão flutuante de WhatsApp */
export default function WhatsAppFab() {
  if (!CONTACT.whatsapp) return null;
  return (
    <a className="wa-fab" href={CONTACT.whatsapp} target="_blank" rel="noreferrer"
       aria-label="Fale no WhatsApp" title="Fale no WhatsApp">
      <WaIcon />
    </a>
  );
}
