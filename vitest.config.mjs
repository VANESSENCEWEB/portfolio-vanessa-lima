/* =========================================================
   vitest.config.mjs — configuração dos testes (Vitest)
   ---------------------------------------------------------
   - plugin react: o Vitest entende JSX (<Botao />)
   - jsdom: um "navegador de mentira" (tem document, window...)
   - setupFiles: arquivo que roda antes de TODOS os testes
   - alias "@": o mesmo atalho do jsconfig.json
   Rodar: npm test
   ========================================================= */
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@/" aponta para a raiz do projeto
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    // describe, it, expect e vi sem precisar importar (os testes importam mesmo assim, para ficar claro)
    globals: true,
    setupFiles: ["./vitest.setup.js"],
    // Só procura testes dentro da pasta __tests__
    include: ["__tests__/**/*.test.{js,jsx}"],
    // Desfaz os "mocks" entre um teste e outro (um teste não suja o outro)
    restoreMocks: true,
    css: {
      // CSS Modules: devolve o próprio nome da classe (styles.botao → "botao")
      modules: { classNameStrategy: "non-scoped" },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["components/**", "data/**", "lib/**", "app/**/*.js"],
    },
  },
});
