import { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { CONTACT } from "../config.js";
import Footer from "../components/Footer.jsx";

/* Página Contato — formulário via EmailJS + card de informações */
export default function Contato() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "err", msg: "Preencha nome, e-mail e mensagem." });
      return;
    }
    const { serviceId, templateId, publicKey } = CONTACT.emailjs;
    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: "err", msg: "O envio será ativado quando as chaves do EmailJS forem configuradas." });
      return;
    }
    setSending(true);
    setStatus({ type: "", msg: "" });
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: { from_name: form.name, reply_to: form.email, message: form.message },
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(detail || `HTTP ${res.status}`);
      }
      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "ok", msg: "Mensagem enviada! Em breve entraremos em contato." });
    } catch (e) {
      console.error("EmailJS:", e?.message || e);
      setStatus({ type: "err", msg: "Não foi possível enviar agora. Tente novamente em instantes." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="wrap">
      <div className="page-head reveal">
        <span className="eyebrow">Contato</span>
        <h2>Fale conosco</h2>
        <p className="lead">
          Tem uma dúvida, um pedido de oração ou quer saber mais sobre a igreja?
          Escreva pra gente — teremos alegria em responder.
        </p>
      </div>

      <div className="contact-grid reveal-stagger">
        <div className="card">
          <div className="field">
            <label>Nome</label>
            <input type="text" value={form.name} onChange={set("name")} placeholder="Seu nome" />
          </div>
          <div className="field">
            <label>E-mail</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="voce@email.com" />
          </div>
          <div className="field">
            <label>Mensagem</label>
            <textarea value={form.message} onChange={set("message")} placeholder="Escreva sua mensagem..." />
          </div>
          {status.msg && <div className={`form-status ${status.type}`}>{status.msg}</div>}
          <button className="btn btn-gold" onClick={send} disabled={sending}>
            {sending ? "Enviando..." : <>Enviar mensagem <Send /></>}
          </button>
        </div>

        <div className="card info-card">
          <p className="kicker">Onde nos encontrar</p>
          <h3>Informações</h3>
          <div className="info-rows">
            <div className="irow"><MapPin /><div><small>Endereço</small><span>{CONTACT.address}</span></div></div>
            <div className="irow"><Mail /><div><small>E-mail</small><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div></div>
            <div className="irow"><Phone /><div><small>Telefone</small><span>{CONTACT.phone}</span></div></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
