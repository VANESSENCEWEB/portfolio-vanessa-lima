/* =========================================================
   app/page.jsx — página INÍCIO (endereço "/")
   ---------------------------------------------------------
   Página PROVISÓRIA da Etapa 1: só serve para conferir se as
   cores e as 3 fontes estão funcionando. Na próxima etapa
   entram a Navbar e a Hero no lugar dela.
   ========================================================= */

// "style" direto no elemento só para este teste rápido.
// No site de verdade, cada componente terá seu arquivo .module.css.
const caixa = { padding: "4rem var(--margem)", display: "grid", gap: "1.5rem" };

export default function Home() {
  return (
    <section style={caixa}>
      <p className="rotulo rotulo--destaque">Etapa 1 · Base visual</p>

      {/* Fonte de título (Anton) */}
      <h1 style={{ margin: 0, fontFamily: "var(--display)", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 400 }}>
        VANESSA<span style={{ color: "var(--cor-destaque)" }}>.</span>
      </h1>

      {/* Fonte manuscrita (Caveat Brush) */}
      <p style={{ margin: 0, fontFamily: "var(--script)", fontSize: "2.5rem" }}>Olá, eu sou Vanessa Lima</p>

      {/* Fonte de texto (Manrope) */}
      <p style={{ margin: 0, maxWidth: "40ch", color: "var(--cor-texto-suave)", lineHeight: 1.6 }}>
        START NOW - SEGUNDA, 09 DE NOVEMBRO DE 20226
      </p>

      <p className="rotulo rotulo--suave" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span className="online" aria-hidden="true" />
        Disponível para estágio
      </p>
    </section>
  );
}
