import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const componentsCss = readFileSync(
  new URL("../src/styles/components.css", import.meta.url),
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

describe("CSS architecture", () => {
  it("debe mantener los estilos de personajes únicamente en characters.css", () => {
    expect(charactersCss).toMatch(/\.character-selector\s*\{/);
    expect(charactersCss).toMatch(/\.character-card\s*\{/);

    expect(componentsCss).not.toMatch(/\.character-selector\s*\{/);
    expect(componentsCss).not.toMatch(/\.character-card\s*\{/);
  });

  it("debe mantener el layout del chat únicamente en layout.css", () => {
    expect(layoutCss).toMatch(/\.chat-header\s*\{/);

    expect(componentsCss).not.toMatch(/\.chat-header\s*\{/);
    expect(componentsCss).not.toMatch(/(^|\n)\s*main\s*\{/);
  });

  it("no debe conservar selectores legacy del chat", () => {
    expect(componentsCss).not.toMatch(/\.chat-message(?:\s|\.|:|\{)/);
    expect(componentsCss).not.toMatch(/\.message-bubble\s*\{/);
    expect(componentsCss).not.toMatch(/\.chat-avatar\s*\{/);
    expect(componentsCss).not.toMatch(/\.chat-content\s*\{/);

    // La implementación moderna debe permanecer.
    expect(componentsCss).toMatch(/\.message\s*\{/);
    expect(componentsCss).toMatch(/\.chat-form\s*\{/);
  });
});