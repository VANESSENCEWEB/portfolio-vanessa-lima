/* =========================================================
   lib/midia.js — qual versão da animação da Hero mostrar
   ---------------------------------------------------------
   Três versões do mesmo movimento (ver MIDIA em data/home.js):
   - "video"   → WebM com fundo transparente (leve: ~670 KB)
   - "animada" → WebP animado (~1,6 MB), para o Safari
   - "parada"  → um quadro só
   Por que o Safari é diferente? Ele toca WebM, mas IGNORA a
   transparência: o fundo apareceria preto. No iPhone e no
   iPad, TODO navegador usa o motor do Safari (WebKit), até o
   Chrome (que lá se chama CriOS) e o Firefox (FxiOS).
   Função "pura": recebe os fatos e devolve a decisão. Testável
   sem navegador (ver __tests__/lib/midia.test.js).
   ========================================================= */

/* true quando o motor é o WebKit do Safari (sem transparência no WebM) */
export function ehWebKitSemAlfa(agente = "") {
  if (/CriOS|FxiOS|EdgiOS/i.test(agente)) return true; // navegadores do iPhone/iPad
  return /AppleWebKit/i.test(agente) && !/Chrome|Chromium|Edg|OPR/i.test(agente);
}

/* A decisão:
   - pediu menos movimento ou pausou → "parada"
   - Safari → "animada"
   - o resto → "video" */
export function escolherModo({ reduzirMovimento = false, pausado = false, agente = "" } = {}) {
  if (reduzirMovimento || pausado) return "parada";
  return ehWebKitSemAlfa(agente) ? "animada" : "video";
}
