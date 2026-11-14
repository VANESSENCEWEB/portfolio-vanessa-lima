/* =========================================================
   Revelar — o conteúdo sobe e aparece quando entra na tela
   ---------------------------------------------------------
   "use client": usa o IntersectionObserver do navegador, que
   avisa quando um elemento entra na área visível (sem ficar
   checando a rolagem o tempo todo, o que pesaria).
   Cuidados:
   - SEM JavaScript, tudo aparece normal (o servidor manda visível).
   - Quem pediu menos movimento vê tudo direto, sem animação.
   - O que JÁ está na tela ao abrir não some e volta (sem "piscar").
   - Anima uma vez só: depois de aparecer, para de observar.
   Sem useState: o estado fica no atributo data-estado do próprio
   elemento (o CSS lê). Nada a renderizar de novo no React.
   Uso: <Revelar><Secao ...>...</Secao></Revelar>
   ========================================================= */
"use client";

import { useEffect, useRef } from "react";
import styles from "./Revelar.module.css";

export default function Revelar({ children, atraso = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || !("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    // Já está na tela? Deixa como está.
    if (elemento.getBoundingClientRect().top < window.innerHeight) return;

    elemento.dataset.estado = "escondido";
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          elemento.dataset.estado = "visivel";
          observador.disconnect(); // uma vez só
        }
      },
      { rootMargin: "0px 0px -12% 0px" }, // começa quando já entrou um pouco na tela
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.revelar} data-estado="visivel" style={{ "--atraso": `${atraso}s` }}>
      {children}
    </div>
  );
}
