import { describe, it, expect } from "vitest";
import { characters } from "../src/characters/characters.js";

describe("Modelo de personajes de HeroVerse AI", () => {
  it("debe contener los tres personajes disponibles", () => {
    expect(characters).toHaveLength(3);
  });

  it("debe contener a Sherlock Holmes", () => {
    const sherlock = characters.find(
      (character) => character.id === "sherlock"
    );

    expect(sherlock).toBeDefined();
    expect(sherlock.name).toBe("Sherlock Holmes");
  });

  it("debe contener al Capitán América", () => {
    const captainAmerica = characters.find(
      (character) => character.id === "captain-america"
    );

    expect(captainAmerica).toBeDefined();
    expect(captainAmerica.name).toBe("Capitán América");
  });

  it("debe contener a Jack Sparrow", () => {
    const jackSparrow = characters.find(
      (character) => character.id === "jack-sparrow"
    );

    expect(jackSparrow).toBeDefined();
    expect(jackSparrow.name).toBe("Jack Sparrow");
  });

  it("cada personaje debe tener los datos necesarios", () => {
    characters.forEach((character) => {
      expect(character.id).toBeDefined();
      expect(character.name).toBeDefined();
      expect(character.image).toBeDefined();
      expect(character.description).toBeDefined();
      expect(character.personality).toBeDefined();
    });
  });
});