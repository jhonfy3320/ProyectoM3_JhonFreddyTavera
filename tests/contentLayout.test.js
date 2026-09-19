import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const homeView = readFileSync(
  new URL("../src/views/homeView.js", import.meta.url),
  "utf8"
);

const aboutView = readFileSync(
  new URL("../src/views/aboutView.js", import.meta.url),
  "utf8"
);

const componentsCss = readFileSync(
  new URL("../src/styles/components.css", import.meta.url),
  "utf8"
);

describe("HeroVerse content layout", () => {
  it("debe utilizar una composición editorial en Home", () => {
    expect(homeView).toContain('class="hero-copy"');
    expect(homeView).toContain('class="hero-experience"');
  });

  it("debe mostrar información resumida de la experiencia HeroVerse", () => {
    expect(homeView).toContain("Contexto independiente");
    expect(homeView).toContain("Google Gemini AI");
  });

  it("debe utilizar un grid editorial en About", () => {
    expect(aboutView).toContain('class="about-grid"');
    expect(aboutView).toContain("about-card--featured");
  });

  it("debe utilizar componentes visuales para tecnologías y arquitectura", () => {
    expect(aboutView).toContain('class="tech-grid"');
    expect(aboutView).toContain('class="architecture-flow"');
    expect(componentsCss).toMatch(/\.about-grid\s*\{/);
  });
});