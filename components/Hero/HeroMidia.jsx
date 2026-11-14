/* =========================================================
   HeroMidia — você na Hero: vídeo, WebP animado ou foto parada
   ---------------------------------------------------------
   "use client": precisa do navegador para saber qual versão
   mostrar (lib/midia.js) e para o botão de pausar funcionar.
   Ordem do que acontece:
   1. O servidor manda a FOTO PARADA (aparece rápido, funciona
      sem JavaScript e é o que o Google vê).
   2. No navegador, escolhe: vídeo, WebP animado ou continua parada.
   3. O botão pausa/retoma. Regra de acessibilidade (WCAG 2.2.2):
      animação com mais de 5 s precisa de um jeito de parar.
   Por que useSyncExternalStore (e não useState + useEffect)?
   A preferência de movimento e o navegador são dados de FORA
   do React. Este hook lê esses dados direto, com um valor para
   o servidor e outro para o navegador, sem renderizar duas
   vezes à toa (mesmo padrão do TemaProvider).
   ========================================================= */
"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { MIDIA } from "@/data/home";
import { escolherModo } from "@/lib/midia";
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

export default function HeroMidia() {
  const [pausado, setPausado] = useState(false);
  const reduzirMovimento = useSyncExternalStore(assinarMovimento, lerMovimento, () => false);
  const agente = useSyncExternalStore(naoMuda, lerAgente, semAgente);

  // No servidor (agente null) sempre a foto parada; no navegador, a função decide
  const modo = agente === null ? "parada" : escolherModo({ reduzirMovimento, pausado, agente });

  return (
    <figure className={`${styles.foto} ${styles.anima}`} style={{ "--atraso": "0.3s" }}>
      {modo === "video" ? (
        <video
          className={styles.midia}
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
      ) : (
        <Image
          className={styles.midia}
          src={modo === "animada" ? MIDIA.animada : MIDIA.parada}
          alt={MIDIA.alt}
          width={MIDIA.largura}
          height={MIDIA.altura}
          priority
          // unoptimized: o otimizador do Next transformaria o WebP animado em foto parada
          unoptimized
        />
      )}

      {/* Quem pediu menos movimento não vê o botão (já está tudo parado) */}
      {!reduzirMovimento && (
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
