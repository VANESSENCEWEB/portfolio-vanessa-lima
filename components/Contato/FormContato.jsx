"use client";
/* =========================================================
   FormContato — formulário da seção Contato
   ---------------------------------------------------------
   Não tem servidor: ao enviar, abre o e-mail de quem visita
   com assunto e mensagem prontos (lib/contato.js monta o link).
   Validação: a do próprio navegador (required e type="email").
   O onSubmit só roda quando todos os campos estão certos.
   Depois, uma mensagem com role="status" avisa o que aconteceu
   (o leitor de tela lê sem a pessoa precisar procurar).
   ========================================================= */
import { useState } from "react";
import { CONTATO } from "@/data/contato";
import { PESSOA } from "@/data/perfil";
import { montarMailto } from "@/lib/contato";
import { IconeEnviar } from "@/components/Navbar/Icones";
import styles from "./Contato.module.css";

export default function FormContato() {
  const [enviado, setEnviado] = useState(false);

  function enviar(evento) {
    evento.preventDefault();
    const dados = Object.fromEntries(new FormData(evento.currentTarget));
    window.location.href = montarMailto(PESSOA.email, dados);
    setEnviado(true);
  }

  return (
    <form className={styles.form} onSubmit={enviar}>
      <div className={styles.linha}>
        <label className={styles.campo}>
          <span className={`rotulo rotulo--suave ${styles.rotulo}`}>Nome *</span>
          <input type="text" name="nome" required placeholder="Seu nome" autoComplete="name" />
        </label>
        <label className={styles.campo}>
          <span className={`rotulo rotulo--suave ${styles.rotulo}`}>E-mail *</span>
          <input type="email" name="email" required placeholder="seu@email.com" autoComplete="email" />
        </label>
      </div>

      <label className={styles.campo}>
        <span className={`rotulo rotulo--suave ${styles.rotulo}`}>Assunto</span>
        <select name="assunto" defaultValue={CONTATO.assuntos[0]}>
          {CONTATO.assuntos.map((assunto) => (
            <option key={assunto}>{assunto}</option>
          ))}
        </select>
      </label>

      <label className={styles.campo}>
        <span className={`rotulo rotulo--suave ${styles.rotulo}`}>Mensagem *</span>
        <textarea name="mensagem" required rows={5} placeholder="Me conta sobre a vaga ou o projeto…" />
      </label>

      <button type="submit" className={styles.enviar}>
        {CONTATO.botao}
        <IconeEnviar />
      </button>

      {/* A região "status" fica sempre na página (vazia até enviar):
          assim o leitor de tela anuncia quando o texto aparece */}
      <p role="status" className={enviado ? styles.sucesso : undefined}>
        {enviado && `✓ ${CONTATO.sucesso}`}
      </p>
    </form>
  );
}
