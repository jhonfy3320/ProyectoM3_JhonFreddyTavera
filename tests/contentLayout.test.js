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
  it("debe explicar las funcionalidades principales de HeroVerse", () => {
  expect(homeView).toContain("conversación independiente");
  expect(homeView).toContain("Google Gemini");
  expect(homeView).toContain("Serverless Function");
});

 it("debe incluir enlaces técnicos externos seguros", () => {
  expect(aboutView).toContain("ai.google.dev/gemini-api/docs");
  expect(aboutView).toContain("github.com/jhonfy3320/HeroVerse-AI");
  expect(aboutView).toContain('rel="noopener noreferrer"');
});

 it("debe obtener los perfiles desde la fuente central de personajes", () => {
  expect(aboutView).toContain('from "../characters/characters.js"');
  expect(aboutView).toContain("characterProfiles");
});
});