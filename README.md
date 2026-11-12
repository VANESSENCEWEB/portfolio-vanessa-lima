<div align="center">

# Portfólio — Vanessa Lima

**Desenvolvedora front-end em formação & designer de interfaces · Recife, PE**

Portfólio profissional feito com Next.js e React: do esboço no Figma ao site no ar.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css&logoColor=white)](https://github.com/css-modules/css-modules)
[![Vitest](https://img.shields.io/badge/testes-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/lint-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/código-Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)](https://portfolio-vanessa-lima.vercel.app)

🔗 **[Ver o site no ar](https://portfolio-vanessa-lima.vercel.app)** · [GitHub](https://github.com/VANESSENCEWEB) · [LinkedIn](https://www.linkedin.com/in/vanessa-lima-dev/)

</div>

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Design system](#-design-system)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Como rodar](#-como-rodar)
- [Scripts](#-scripts)
- [Testes](#-testes)
- [Qualidade, acessibilidade, SEO e segurança](#-qualidade-acessibilidade-seo-e-segurança)
- [Deploy](#-deploy)
- [Roadmap](#️-roadmap)
- [Autora](#-autora)

---

## 💡 Sobre o projeto

Portfólio pessoal da **Vanessa Lima**, estudante de Sistemas para Internet na UNICAP, pensado para recrutadores e professores. Reúne quem eu sou, minha formação, minha experiência e os projetos que desenvolvi, com integração à API do GitHub.

| Item        | Detalhe                                                                      |
| ----------- | ---------------------------------------------------------------------------- |
| **Público** | Recrutadores de estágio e professores                                        |
| **Páginas** | Início · Sobre · Experiência Acadêmica · Experiência Profissional · Projetos |
| **Status**  | 🚧 Em desenvolvimento — entrega da v1.0.0 em 17/11/2026                      |

As decisões técnicas, com o porquê de cada uma, estão em [`docs/DECISOES.md`](docs/DECISOES.md). O diário com prints de cada etapa está em [`docs/DIARIO.md`](docs/DIARIO.md).

---

## ✨ Funcionalidades

**Já no ar**

- Navbar fixa com efeito vidro, link da página atual e ícones do GitHub e LinkedIn
- Menu hambúrguer acessível no celular/tablet (fecha com `Esc` e ao trocar de página)
- Tema **claro/escuro**: segue o sistema, lembra a escolha e não "pisca" ao abrir
- Rodapé com contato, páginas e redes em todas as páginas
- Página **Sobre**: bio, foto, habilidades, **todas as tecnologias e módulos usados neste app** (com o papel de cada um e a versão lida do `package.json`) e "como este site foi feito"
- Página **404** personalizada
- SEO técnico: `sitemap.xml`, `robots.txt`, imagem de compartilhamento (Open Graph) e JSON-LD

**Em construção** — veja o [Roadmap](#️-roadmap).

---

## 🛠️ Tecnologias

| Tecnologia                                                                      | Versão | Para quê                                                          |
| ------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------- |
| [Next.js](https://nextjs.org/) (App Router)                                     | 16     | Rotas por pasta, metadata/SEO, fontes e imagens otimizadas        |
| [React](https://react.dev/)                                                     | 19     | Componentes e interatividade                                      |
| JavaScript                                                                      | ES2023 | Linguagem do projeto                                              |
| CSS Modules + variáveis CSS                                                     | —      | Estilos isolados por componente; tema trocando variáveis          |
| `next/font/google`                                                              | —      | Anton, Caveat Brush e Manrope servidas pelo próprio site          |
| `next/image`                                                                    | —      | Foto da página Sobre em AVIF/WebP no tamanho certo para cada tela |
| `next/og`                                                                       | —      | Gera a imagem de compartilhamento a partir de JSX                 |
| [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | 5 / 16 | Testes de componentes, dados e SEO                                |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                | 9 / 3  | Qualidade e padronização do código                                |
| [Playwright](https://playwright.dev/)                                           | 1      | Prints desktop + celular do diário (`npm run mockup`)             |
| [Vercel](https://vercel.com/)                                                   | —      | Hospedagem com deploy automático a cada push                      |

---

## 🎨 Design system

Componentes base em `components/ui/`, todos Server Components (HTML pronto, sem JavaScript extra no navegador):

| Componente    | Para quê                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------- |
| `Container`   | Centraliza e limita a largura (`estreita`, `normal`, `larga`)                                |
| `Secao`       | `<section>` + Container + título, ligada ao título por `aria-labelledby`                     |
| `TituloSecao` | Rótulo pequeno + título em Anton maiúsculo com o ponto final vermelho                        |
| `Botao`       | Botão ou link (interno, externo com `noopener noreferrer`, mailto) em 3 variantes            |
| `Tag`         | Etiqueta de tecnologia ou categoria                                                          |
| `Card`        | Cartão de projeto/experiência, inteiro clicável com **um** link só (bom para leitor de tela) |

```jsx
import Secao from "@/components/ui/Secao/Secao";
import Card from "@/components/ui/Card/Card";

<Secao id="destaques" rotulo="Portfólio" titulo="Projetos em destaque">
  <Card titulo="ISAC Conecta" descricao="..." tags={["React", "Figma"]} href="/projetos" />
</Secao>;
```

---

## 📁 Estrutura de pastas

```
portfolio-vanessa-lima/
├── app/                        → páginas (cada pasta = um endereço do site)
│   ├── layout.jsx              → moldura de todas as páginas (fontes, tema, navbar, footer, SEO)
│   ├── page.jsx                → Início ("/")
│   ├── not-found.jsx           → página 404
│   ├── sitemap.js / robots.js  → /sitemap.xml e /robots.txt
│   ├── opengraph-image.jsx     → imagem de compartilhamento
│   ├── globals.css             → cores dos temas e estilos gerais
│   └── sobre/ · experiencia-academica/ · experiencia-profissional/ · projetos/
├── components/
│   ├── ui/                     → design system (Container, Secao, TituloSecao, Botao, Tag, Card)
│   ├── Navbar/ · Footer/       → barra de navegação e rodapé
│   ├── ListaTecnologias/       → lista de tecnologias agrupadas (página Sobre)
│   ├── EmConstrucao/           → página provisória
│   └── TemaProvider.jsx        → controle do tema claro/escuro
├── data/perfil.js              → textos gerais do site (e o SEO)
├── data/sobre.js               → textos e listas da página Sobre
├── lib/                        → funções pequenas (tema, endereço do site, JSON-LD, classes)
├── __tests__/                  → testes automatizados (espelha as pastas acima)
├── docs/                       → DECISOES.md, DIARIO.md e prints em progresso/
└── scripts/mockup.mjs          → gera os prints do diário
```

---

## 🚀 Como rodar

**Pré-requisito:** [Node.js](https://nodejs.org/) **22.12 ou mais novo** (o Vitest 5 exige). Confira com `node -v`.

```bash
git clone https://github.com/VANESSENCEWEB/portfolio-vanessa-lima.git
cd portfolio-vanessa-lima
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

> 🔒 O projeto **não precisa** de variáveis de ambiente. As opcionais estão explicadas em [`.env.example`](.env.example).

---

## 📜 Scripts

| Comando                               | O que faz                                         |
| ------------------------------------- | ------------------------------------------------- |
| `npm run dev`                         | Roda o site em modo desenvolvimento               |
| `npm run build`                       | Gera a versão de produção                         |
| `npm run start`                       | Roda a versão de produção (depois do build)       |
| `npm run lint`                        | Procura erros no código com o ESLint              |
| `npm run format`                      | Formata todo o código com o Prettier              |
| `npm run format:check`                | Só confere se está formatado                      |
| `npm test`                            | Roda todos os testes uma vez                      |
| `npm run test:watch`                  | Roda os testes de novo a cada arquivo salvo       |
| `npm run coverage`                    | Mostra quanto do código está coberto pelos testes |
| `npm run mockup -- --nome etapa-03-x` | Gera o print desktop + celular para o diário      |

---

## 🧪 Testes

Os testes ficam em `__tests__/`, espelhando as pastas do projeto.

| Arquivo                                | O que garante                                                                                       |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `components/ui/Botao.test.jsx`         | Vira botão, link interno, link externo seguro ou mailto conforme o `href`                           |
| `components/ui/Card.test.jsx`          | Um link só por cartão, título no nível certo, tags em lista acessível                               |
| `components/ui/Layout.test.jsx`        | Container, TituloSecao (níveis), Secao com `aria-labelledby`, Tag                                   |
| `components/Footer.test.jsx`           | Landmark de rodapé, e-mail, links do menu, redes com `noopener noreferrer`, ano                     |
| `app/sobre.test.jsx`                   | Página Sobre: um só `h1`, foto com `alt`, 4 seções nomeadas, links seguros, JSON-LD `ProfilePage`   |
| `data/sobre.test.js`                   | **Todo pacote do `package.json` e todo módulo `next/...` importado está explicado na página Sobre** |
| `components/ListaTecnologias.test.jsx` | Grupos com `h3`, papel de cada item e versão só de quem é pacote                                    |
| `components/Navbar.test.jsx`           | Links, página ativa, hambúrguer (`aria-expanded`), `Esc`, fecha ao trocar página                    |
| `components/TemaProvider.test.jsx`     | Lê, alterna e salva o tema                                                                          |
| `app/not-found.test.jsx`               | 404 com um só `h1` e caminhos de volta                                                              |
| `app/seo.test.js`                      | Sitemap com todas as páginas e endereços completos; robots apontando o sitemap                      |
| `lib/site.test.js`                     | Endereço do site, JSON-LD `Person` e proteção contra `</script>`                                    |
| `data/perfil.test.js`                  | Todo link do menu tem página (sem 404) e o SEO tem tamanho bom                                      |

```bash
npm test          # 13 arquivos · 102 testes
npm run coverage  # relatório em coverage/index.html
```

---

## ♿ Qualidade, acessibilidade, SEO e segurança

| Área               | Como é tratado                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acessibilidade** | Teclado, "Pular para o conteúdo", `aria-current`, `aria-expanded`, seções nomeadas, avisos "(abre em nova aba)", área de toque ≥ 44 px                          |
| **SEO**            | `title.template`, `metadataBase`, `canonical` por página, Open Graph + imagem gerada, `sitemap.xml`, `robots.txt`, JSON-LD `Person` e `ProfilePage`             |
| **Segurança**      | Cabeçalhos HTTP (`X-Frame-Options`, `HSTS`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`), sem `X-Powered-By`, `noopener noreferrer`, `.env*` fora do Git |
| **Desempenho**     | Server Components por padrão, fontes servidas pelo próprio site com `next/font`                                                                                 |
| **Qualidade**      | ESLint (Next + React Hooks + jsx-a11y), Prettier e testes automatizados                                                                                         |

---

## 🌐 Deploy

Hospedado na **[Vercel](https://vercel.com/)**: a cada `git push` na branch `main`, o site é atualizado sozinho.

🔗 **Produção:** https://portfolio-vanessa-lima.vercel.app

---

## 🗺️ Roadmap

- [x] Base visual, Navbar, tema claro/escuro e páginas provisórias
- [x] Ferramentas: ESLint, Prettier, Vitest e deploy na Vercel
- [x] Design system, Footer, 404 e SEO técnico
- [x] Página **Sobre** (com todas as tecnologias e módulos usados no app)
- [ ] Páginas **Experiência Acadêmica** e **Experiência Profissional**
- [ ] Página **Projetos** com a API pública do GitHub
- [ ] Home completa: hero com vídeo e seções com animação ao rolar
- [ ] Revisão de acessibilidade e Lighthouse ≥ 90
- [ ] Versão `v1.0.0`

---

## 👩‍💻 Autora

**Vanessa Lima** — desenvolvedora front-end em formação & designer de interfaces
Sistemas para Internet — UNICAP · Recife, PE

[GitHub](https://github.com/VANESSENCEWEB) · [LinkedIn](https://www.linkedin.com/in/vanessa-lima-dev/) · [vanessalimaunicap@gmail.com](mailto:vanessalimaunicap@gmail.com)
