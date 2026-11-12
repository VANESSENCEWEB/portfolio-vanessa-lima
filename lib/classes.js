/* =========================================================
   lib/classes.js — junta nomes de classes CSS
   ---------------------------------------------------------
   Ex.: juntarClasses("botao", ativo && "ativo", undefined)
        → "botao ativo" (ou só "botao" se ativo for false)
   Ignora tudo que for vazio, false, null ou undefined.
   ========================================================= */
export function juntarClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}
