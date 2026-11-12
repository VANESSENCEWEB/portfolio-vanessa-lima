/* =========================================================
   vitest.setup.js — roda ANTES de cada arquivo de teste
   ---------------------------------------------------------
   1. jest-dom: verificações mais legíveis, ex.:
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
   2. cleanup: "desmonta" o que foi desenhado depois de cada teste
   ========================================================= */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
