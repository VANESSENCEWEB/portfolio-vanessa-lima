/* =========================================================
   app/opengraph-image.jsx — imagem de compartilhamento
   ---------------------------------------------------------
   É a imagem que aparece quando alguém cola o link do
   portfólio no WhatsApp, LinkedIn, Slack...
   O Next DESENHA a imagem a partir deste JSX (com a função
   ImageResponse) na hora do build, e coloca sozinho as tags
   <meta property="og:image"> em todas as páginas.
   Regras do ImageResponse (diferente do site normal):
   - só "style" direto no elemento (nada de CSS Modules)
   - todo elemento com mais de um filho precisa de display: flex
   - sem variáveis CSS: as cores vão escritas aqui
   Teste: npm run dev → http://localhost:3000/opengraph-image
   ========================================================= */
import { ImageResponse } from "next/og";
import { PESSOA } from "@/data/perfil";

// Texto alternativo da imagem (acessibilidade)
export const alt = `${PESSOA.nome} — ${PESSOA.cargo} · Portfólio`;
// Tamanho recomendado pelas redes sociais
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Cores do tema escuro (as mesmas do globals.css)
const COR = {
  fundo: "#0b0b0e",
  texto: "#f4efe9",
  suave: "#a39e98",
  destaque: "#e8462b",
  linha: "rgba(255, 255, 255, 0.12)",
};

export default function ImagemOpenGraph() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: COR.fundo,
        color: COR.texto,
        fontFamily: "sans-serif",
      }}
    >
      {/* Topo: rótulo */}
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: COR.destaque, fontWeight: 700 }}>
        PORTFÓLIO · {PESSOA.cidade.toUpperCase()}, {PESSOA.estado}
      </div>

      {/* Meio: nome gigante com o ponto vermelho */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Uma linha por palavra, para o ponto ficar colado no "LIMA" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 150,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: -4,
          }}
        >
          <span>{PESSOA.primeiroNome.toUpperCase()}</span>
          <span style={{ display: "flex" }}>
            {PESSOA.nome.split(" ").slice(1).join(" ").toUpperCase()}
            <span style={{ color: COR.destaque }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: COR.suave }}>{PESSOA.cargo}</div>
      </div>

      {/* Base: linha fina + tecnologias */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `1px solid ${COR.linha}`,
          fontSize: 26,
          color: COR.suave,
        }}
      >
        <span>React · Next.js · UI Design</span>
        <span>github.com/VANESSENCEWEB</span>
      </div>
    </div>,
    size,
  );
}
