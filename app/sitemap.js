/* =========================================================
   app/sitemap.js — gera o /sitemap.xml
   ---------------------------------------------------------
   O sitemap é a "lista de páginas" que entregamos ao Google,
   para ele achar todas sem precisar adivinhar.
   É montado a partir do MENU: criou página nova e colocou no
   menu? Ela entra no sitemap sozinha.
   Teste: npm run dev → abra http://localhost:3000/sitemap.xml
   ========================================================= */
import { MENU } from "@/data/perfil";
import { urlCompleta } from "@/lib/site";

export default function sitemap() {
  return MENU.map((item) => ({
    url: urlCompleta(item.link),
    changeFrequency: "monthly",
    // Prioridade é só uma dica: a Home é a mais importante
    priority: item.link === "/" ? 1 : 0.8,
  }));
}
