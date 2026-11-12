# Decisões técnicas

Registro das escolhas importantes do projeto e **por que** foram feitas.
Formato: contexto → decisão → consequência. A mais nova fica no fim.

---

## 1. Next.js 16 com App Router, em JavaScript

- **Decisão:** projeto criado com `create-next-app` (Next 16, React 19), sem TypeScript.
- **Por quê:** cada pasta em `app/` vira um endereço; SEO, fontes e imagens já vêm prontos; deploy direto na Vercel. JavaScript porque estou aprendendo React e quis focar nos conceitos da biblioteca.
- **Consequência:** sem checagem de tipos. Compensamos com ESLint e testes.

## 2. CSS Modules + variáveis CSS (sem biblioteca de UI)

- **Decisão:** um `.module.css` por componente; cores, fontes e espaçamentos em variáveis no `globals.css`.
- **Por quê:** a classe de um componente nunca afeta outro; o tema muda só trocando o atributo `data-tema` no `<html>`; zero dependência extra.

## 3. Textos em `data/perfil.js`

- **Decisão:** todo texto do site (inclusive o SEO) num arquivo só.
- **Por quê:** conteúdo separado do layout. Um teste garante que todo link do `MENU` tem página.

## 4. Server Components por padrão

- **Decisão:** sem `"use client"`, a não ser em quem tem clique ou estado (Navbar, TemaProvider).
- **Por quê:** o HTML chega pronto, com menos JavaScript no navegador: mais rápido e melhor para o Google.

## 5. Tema sem "piscar" + `useSyncExternalStore`

- **Decisão:** um script fixo no `<head>` coloca `data-tema` antes da página aparecer; o `TemaProvider` lê esse atributo com `useSyncExternalStore`.
- **Por quê:** sem "piscada" ao abrir; o atributo do `<html>` é a única fonte da verdade; sem `setState` dentro de `useEffect` (o ESLint do Next 16 aponta como erro).

## 6. Fontes com `next/font/google` (10/11)

- **Decisão:** Anton, Caveat Brush e Manrope pelo `next/font/google`, no lugar dos arquivos `.woff2` do projeto antigo.
- **Por quê:** o Next baixa as fontes no build e serve pelo próprio site: nada de pedido ao Google no navegador da visitante (privacidade) e sem "pulo" do texto.

## 7. ESLint (flat config) + Prettier (10/11)

- **Decisão:** `eslint-config-next/core-web-vitals` + `eslint-config-prettier`; Prettier com `.prettierrc`.
- **Por quê:** ESLint acha **erros** (hooks, acessibilidade, imagens); Prettier cuida da **aparência**. ESLint 9 porque os plugins do `eslint-config-next` ainda não suportam o 10.

## 8. Vitest + Testing Library, testes em `__tests__/` (10/11)

- **Decisão:** Vitest com `jsdom`; testes numa pasta própria, espelhando `components/`, `app/`, `lib/` e `data/`.
- **Por quê:** dentro de `app/` todo arquivo pode virar rota; com os testes separados o código do site fica limpo. A Testing Library testa como uma pessoa usa a tela (pelo nome que o leitor de tela lê).
- **Exigência:** Node 22.12+ (registrado em `engines`).

## 9. Design system próprio em `components/ui/` (10/11)

- **Decisão:** seis componentes base (Container, Secao, TituloSecao, Botao, Tag, Card), cada um na sua pasta com `.module.css`.
- **Por quê:** as páginas dos próximos dias montam tudo com as mesmas peças: visual consistente e menos código repetido.
- **Detalhes:** o `Botao` decide sozinho entre `<button>`, `<Link>` e `<a>` pelo `href` (quem leva a outro lugar é link, quem faz algo é botão). O `Card` inteiro é clicável com **um** link só (o `::after` do link do título cobre o cartão), para o leitor de tela não ouvir vários links repetidos.

## 10. SEO técnico com os arquivos especiais do App Router (10/11)

- **Decisão:** `metadataBase` + `title.template` no layout; `canonical` em cada página (nunca no layout, senão todas diriam "sou a Home"); `app/sitemap.js` montado a partir do `MENU`; `app/robots.js`; `app/opengraph-image.jsx` gerando a imagem com `next/og`; JSON-LD `Person` no layout.
- **Por quê:** o Next gera as tags e os arquivos sozinho e eles nunca ficam desatualizados em relação às páginas.
- **Segurança:** o JSON-LD troca `<` por `<`, para nenhum texto conseguir fechar a tag `</script>`.
- **Endereço:** `NEXT_PUBLIC_SITE_URL` é opcional; sem ela vale `https://portfolio-vanessa-lima.vercel.app` (`lib/site.js`).

## 11. Ano do rodapé com `"use cache"` (10/11)

- **Contexto:** o `next.config.mjs` vem com `cacheComponents: true`. Nesse modo o build **recusa** `new Date()` direto num componente (a página pronta ficaria "congelada" sem o Next saber).
- **Decisão:** `lib/ano.js` com a diretiva `"use cache"`; o `Footer` virou `async` e espera o ano.
- **Consequência:** o build passa e o ano é recalculado de tempos em tempos (vira sozinho em janeiro).

## 12. Cabeçalhos de segurança (10/11)

- **Decisão:** `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e `Strict-Transport-Security` em todas as rotas; `poweredByHeader: false`.
- **Por quê:** impedem o site de ser embutido em outro (clickjacking), bloqueiam recursos que ele não usa e não anunciam a tecnologia do servidor.

## 13. Hero completa vai para o Dia 6 (10/11)

- **Contexto:** o projeto recomeçou do zero em 10/11; a Hero do projeto antigo (vídeo, digitação, contador) ainda não foi trazida.
- **Decisão:** trazer a Hero junto com a Home completa no Dia 6, já usando os componentes base.
- **Por quê:** o Dia 2 já tinha a recuperação das ferramentas (Prettier, Vitest) além do design system; juntar a Hero com a Home evita mexer duas vezes na mesma página.

## 14. API pública do GitHub em Projetos (planejado — Dia 5)

- **Por quê:** pública, sem chave obrigatória, mostra os repositórios reais. Token opcional só no servidor (`GITHUB_TOKEN`, nunca `NEXT_PUBLIC_`).
