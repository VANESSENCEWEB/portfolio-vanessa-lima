/* =========================================================
   HeroMidia — você na Hero
   ---------------------------------------------------------
   - Tema CLARO  → foto de blusa vinho (parada)
   - Tema ESCURO → vídeo com fundo transparente (ou WebP
     animado no Safari, ou foto parada, ver lib/midia.js)
   "use client": precisa do navegador para escolher a versão
   do tema escuro e para o botão de pausar funcionar.
   Sem "piscar" ao abrir: o servidor manda as DUAS imagens
   paradas e o CSS mostra só a do tema atual (o tema é um
   atributo no <html>, que o CSS lê antes do React acordar).
   O vídeo só entra quando o tema é escuro: quem está no tema
   claro não baixa o vídeo à toa.
   Acessibilidade (WCAG 2.2.2): animação com mais de 5 s
   precisa de um botão para pausar.
   Por que useSyncExternalStore (e não useState + useEffect)?
   A preferência de movimento e o navegador são dados de FORA
   do React. Este hook lê esses dados direto, com um valor para
   o servidor e outro para o navegador (mesmo padrão do TemaProvider).
   ========================================================= */
"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { MIDIA } from "@/data/home";
import { escolherModo } from "@/lib/midia";
import { useTema } from "@/components/TemaProvider";
import styles from "./Hero.module.css";

const CONSULTA_MOVIMENTO = "(prefers-reduced-motion: reduce)";

/* "Reduzir movimento": assina a mudança e lê o valor atual */
function assinarMovimento(avisar) {
  const consulta = window.matchMedia?.(CONSULTA_MOVIMENTO);
  consulta?.addEventListener("change", avisar);
  return () => consulta?.removeEventListener("change", avisar);
}
const lerMovimento = () => window.matchMedia?.(CONSULTA_MOVIMENTO).matches ?? false;

/* Navegador: não muda com a página aberta (assinatura vazia).
   No servidor não existe navegador: null → foto parada. */
const naoMuda = () => () => {};
const lerAgente = () => navigator.userAgent;
const semAgente = () => null;

/* A versão do tema escuro (vídeo, WebP animado ou parada) */
function MidiaEscura({ modo }) {
  if (modo === "video") {
    return (
      <video
        className={`${styles.midia} ${styles.midiaEscura}`}
        src={MIDIA.video}
        poster={MIDIA.parada}
        width={MIDIA.largura}
        height={MIDIA.altura}
        autoPlay
        muted
        loop
        playsInline
        aria-label={MIDIA.alt}
      />
    );
  }
  return (
    <Image
      className={`${styles.midia} ${styles.midiaEscura}`}
      src={modo === "animada" ? MIDIA.animada : MIDIA.parada}
      alt={MIDIA.alt}
      width={MIDIA.largura}
      height={MIDIA.altura}
      priority
      // unoptimized: o otimizador do Next transformaria o WebP animado em foto parada
      unoptimized
    />
  );
}

export default function HeroMidia() {
  const { tema } = useTema(); // null no servidor, "claro" ou "escuro" no navegador
  const [pausado, setPausado] = useState(false);
  const reduzirMovimento = useSyncExternalStore(assinarMovimento, lerMovimento, () => false);
  const agente = useSyncExternalStore(naoMuda, lerAgente, semAgente);

  const escuro = tema !== "claro"; // o escuro é o padrão do site
  // No servidor (agente null) ou no tema claro: versão parada (nada de vídeo à toa)
  const modo = agente === null || !escuro ? "parada" : escolherModo({ reduzirMovimento, pausado, agente });

  return (
    <figure className={`${styles.foto} ${styles.anima}`} style={{ "--atraso": "0.3s" }}>
      {/* Tema claro: blusa vinho (o CSS esconde no tema escuro) */}
      <Image
        className={`${styles.midia} ${styles.midiaClara}`}
        src={MIDIA.clara.src}
        alt={MIDIA.clara.alt}
        width={MIDIA.clara.largura}
        height={MIDIA.clara.altura}
        priority
        sizes="(max-width: 720px) 88vw, 520px"
      />

      {/* Tema escuro: vídeo (o CSS esconde no tema claro) */}
      <MidiaEscura modo={modo} />

      {/* Botão de pausar: só no tema escuro e para quem não pediu menos movimento */}
      {escuro && !reduzirMovimento && (
        <button
          type="button"
          className={styles.pausar}
          onClick={() => setPausado((p) => !p)}
          aria-pressed={pausado}
          aria-label={pausado ? "Retomar a animação" : "Pausar a animação"}
        >
          <span aria-hidden="true">{pausado ? "▶" : "❚❚"}</span>
        </button>
      )}
    </figure>
  );
}
