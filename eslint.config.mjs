/* =========================================================
   eslint.config.mjs — regras de qualidade do código (ESLint)
   ---------------------------------------------------------
   O ESLint lê o código e aponta erros ANTES de rodar o site
   (variável não usada, hook usado errado, <img> sem alt...).
   Formato "flat config": uma lista de configurações aplicadas
   em ordem (a de baixo pode sobrescrever a de cima).
   Rodar: npm run lint
   ========================================================= */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  // 1. Regras oficiais do Next.js + React + Hooks + acessibilidade (jsx-a11y)
  ...nextVitals,

  // 2. Desliga as regras de ESTILO que brigariam com o Prettier.
  //    Divisão de tarefas: ESLint cuida de erros, Prettier da aparência.
  prettier,

  // 3. Ajustes do projeto
  {
    rules: {
      // Avisa sobre variáveis/imports esquecidos (aceita nomes começando com "_")
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // console.log esquecido vira aviso (warn/error continuam liberados)
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // 4. Scripts de terminal (ex.: scripts/mockup.mjs) podem usar console.log
  {
    files: ["scripts/**"],
    rules: { "no-console": "off" },
  },

  // 5. Pastas que o ESLint NÃO deve olhar (geradas automaticamente)
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "node_modules/**", "next-env.d.ts"]),
]);
