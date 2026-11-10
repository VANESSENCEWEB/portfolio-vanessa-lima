"use client";
/* =========================================================
   TemaProvider — controla o tema (escuro/claro) do site INTEIRO
   ---------------------------------------------------------
   "use client": este arquivo roda no NAVEGADOR (precisa de
   clique e de localStorage, que não existem no servidor).

   Como funciona:
   1. O script do layout.jsx coloca data-tema="escuro" ou "claro"
      na tag <html> ANTES da página aparecer (assim não "pisca").
   2. Esse atributo do <html> é a ÚNICA fonte da verdade do tema.
      Aqui nós "assinamos" o atributo com useSyncExternalStore:
      sempre que ele muda, o React fica sabendo e redesenha.
   3. Qualquer componente pode usar o hook useTema() para:
      - saber o tema atual → tema ("claro", "escuro" ou null no servidor)
      - trocar de tema     → alternarTema()
   4. O CSS (globals.css) troca as cores pelo atributo data-tema.
   ========================================================= */
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { CHAVE_TEMA } from "@/lib/tema";

// Contexto = um "canal" que leva o tema para qualquer componente
const TemaContexto = createContext(null);

/* ---------- Leitura do tema no <html> ---------- */

// Avisa o React sempre que o atributo data-tema do <html> mudar.
// MutationObserver = "vigia" do navegador que observa mudanças no HTML.
function assinarTema(avisarReact) {
  const vigia = new MutationObserver(avisarReact);
  vigia.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  return () => vigia.disconnect(); // limpeza: para de vigiar
}

// Lê o tema atual (qualquer valor estranho vira "escuro", o padrão)
function lerTema() {
  return document.documentElement.dataset.tema === "claro" ? "claro" : "escuro";
}

// No servidor não dá para saber o tema: null = "ainda não sei"
function lerTemaNoServidor() {
  return null;
}

/* ---------- Provider: "envolve" o site e oferece o tema ---------- */
export function TemaProvider({ children }) {
  const tema = useSyncExternalStore(assinarTema, lerTema, lerTemaNoServidor);

  const alternarTema = useCallback(() => {
    const novo = lerTema() === "claro" ? "escuro" : "claro";
    document.documentElement.dataset.tema = novo; // o CSS troca as cores (e o vigia avisa o React)
    try {
      localStorage.setItem(CHAVE_TEMA, novo); // lembra para a próxima visita
    } catch {
      /* localStorage bloqueado (aba anônima etc.): só não salva */
    }
  }, []);

  return <TemaContexto.Provider value={{ tema, alternarTema }}>{children}</TemaContexto.Provider>;
}

/* Hook para usar o tema em qualquer componente */
export function useTema() {
  const contexto = useContext(TemaContexto);
  if (!contexto) {
    throw new Error("useTema precisa estar dentro de <TemaProvider>");
  }
  return contexto;
}
