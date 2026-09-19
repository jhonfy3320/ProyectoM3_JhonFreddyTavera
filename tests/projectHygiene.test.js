import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

const indexHtml = readFileSync(projectFile("index.html"), "utf8");

const charactersJs = readFileSync(
  projectFile("src/characters/characters.js"),
  "utf8"
);

const apiChatJs = readFileSync(projectFile("api/chat.js"), "utf8");

describe("Project hygiene", () => {
  it("no debe conservar assets legacy sin uso", () => {
    expect(existsSync(projectFile("src/assets/hero.png"))).toBe(false);
    expect(existsSync(projectFile("src/assets/javascript.svg"))).toBe(false);
  });

  it("debe utilizar nombres normalizados para los assets de personajes", () => {
    expect(
      existsSync(projectFile("src/assets/characters/sherlock-holmes.webp"))
    ).toBe(true);

    expect(
      existsSync(projectFile("src/assets/characters/captain-america.jpg"))
    ).toBe(true);

    expect(
      existsSync(projectFile("src/assets/characters/jack-sparrow.jpg"))
    ).toBe(true);

    expect(
      existsSync(projectFile("src/assets/characters/Holmes.webp"))
    ).toBe(false);

    expect(
      existsSync(projectFile("src/assets/characters/capitanamerica.jpg"))
    ).toBe(false);

    expect(
      existsSync(projectFile("src/assets/characters/Jacck.jpg"))
    ).toBe(false);
  });

  it("debe importar los assets normalizados desde characters.js", () => {
    expect(charactersJs).toContain("sherlock-holmes.webp");
    expect(charactersJs).toContain("captain-america.jpg");
    expect(charactersJs).toContain("jack-sparrow.jpg");

    expect(charactersJs).not.toContain("Holmes.webp");
    expect(charactersJs).not.toContain("capitanamerica.jpg");
    expect(charactersJs).not.toContain("Jacck.jpg");
  });

  it("no debe conservar el enlace CSS legacy comentado", () => {
    expect(indexHtml).not.toContain('<!--link rel="stylesheet"');
  });

  it("no debe conservar código prototipo antiguo en la API", () => {
    expect(apiChatJs).not.toContain("Respuesta temporal");
    expect(apiChatJs).not.toContain("En esta primera versión");
    expect(apiChatJs).not.toContain("Historial recibido");
    expect(apiChatJs).not.toContain("Historial transformado");
  });
});