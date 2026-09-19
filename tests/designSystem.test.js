import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const variablesCss = readFileSync(
  new URL("../src/styles/variables.css", import.meta.url),
  "utf8"
);

const layoutCss = readFileSync(
  new URL("../src/styles/layout.css", import.meta.url),
  "utf8"
);

const charactersCss = readFileSync(
  new URL("../src/styles/characters.css", import.meta.url),
  "utf8"
);

describe("HeroVerse design system", () => {
  it("debe definir los tokens principales de marca", () => {
    expect(variablesCss).toContain("--color-brand:");
    expect(variablesCss).toContain("--color-brand-light:");
    expect(variablesCss).toContain("--color-accent:");
    expect(variablesCss).toContain("--color-highlight:");
  });

  it("debe definir una jerarquía de superficies", () => {
    expect(variablesCss).toContain("--color-background:");
    expect(variablesCss).toContain("--color-surface:");
    expect(variablesCss).toContain("--color-surface-elevated:");
    expect(variablesCss).toContain("--color-surface-soft:");
  });

  it("debe definir tokens visuales específicos para los personajes", () => {
    expect(variablesCss).toContain("--character-sherlock:");
    expect(variablesCss).toContain("--character-captain:");
    expect(variablesCss).toContain("--character-jack:");
  });

  it("debe definir gradientes y efectos propios de HeroVerse", () => {
    expect(variablesCss).toContain("--gradient-brand:");
    expect(variablesCss).toContain("--gradient-hero:");
    expect(variablesCss).toContain("--shadow-glow:");
  });

  it("no debe contener valores tipográficos inválidos", () => {
    expect(variablesCss).not.toContain("2,5rem");
    expect(variablesCss).toContain("--fs-xxl: 2.5rem");
  });

  it("debe aplicar la identidad de marca al fondo global", () => {
    expect(layoutCss).toContain("var(--gradient-app)");
  });

  it("debe consumir los colores de personaje desde el design system", () => {
    expect(charactersCss).toContain("var(--character-sherlock)");
    expect(charactersCss).toContain("var(--character-captain)");
    expect(charactersCss).toContain("var(--character-jack)");
  });
  it("debe definir los colores ambientales de la aurora", () => {
  expect(variablesCss).toContain(
    "--color-aurora-purple:"
  );

  expect(variablesCss).toContain(
    "--color-aurora-cyan:"
  );

  expect(variablesCss).toContain(
    "--color-aurora-magenta:"
  );
});

it("debe implementar una aurora global animada", () => {
  expect(layoutCss).toMatch(
    /body::before/
  );

  expect(layoutCss).toContain(
    "@keyframes heroVerseAurora"
  );
});

it("debe respetar la preferencia de reducción de movimiento", () => {
  expect(layoutCss).toContain(
    "prefers-reduced-motion: reduce"
  );
});

it("debe definir glows independientes para los personajes", () => {
  expect(variablesCss).toContain(
    "--character-sherlock-glow:"
  );

  expect(variablesCss).toContain(
    "--character-captain-glow:"
  );

  expect(variablesCss).toContain(
    "--character-jack-glow:"
  );
 });
});