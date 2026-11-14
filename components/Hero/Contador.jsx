/* =========================================================
   Contador — número que sobe de 0 até o valor (ex.: 0 → 87)
   ---------------------------------------------------------
   "use client": a animação acontece no navegador.
   - O servidor já manda o número FINAL: sem JavaScript, ou
     para o Google, aparece o valor certo.
   - Quem pediu menos movimento vê o número direto.
   - Curva "ease-out": rápido no começo, devagar no fim.
   - requestAnimationFrame: atualiza no ritmo da tela, e o
     navegador pausa sozinho quando a aba não está visível.
     Todo setState acontece DENTRO dele (nunca direto no
     useEffect, que é a regra do React para evitar renderizar
     em cascata).
   ========================================================= */
"use client";

import { useEffect, useState } from "react";

export default function Contador({ valor, duracao = 1400, atraso = 900 }) {
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let quadro;
    let inicio;
    const passo = (agora) => {
      inicio ??= agora;
      // Antes do atraso, fica no 0 (o bloco ainda está aparecendo)
      const decorrido = Math.max(agora - inicio - atraso, 0);
      const progresso = Math.min(decorrido / duracao, 1);
      const suavizado = 1 - (1 - progresso) ** 3; // ease-out
      setAtual(Math.round(suavizado * valor));
      if (progresso < 1) quadro = requestAnimationFrame(passo);
    };

    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [valor, duracao, atraso]);

  return atual;
}
