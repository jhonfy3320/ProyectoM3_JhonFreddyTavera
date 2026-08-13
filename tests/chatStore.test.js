import { describe, it, expect, beforeEach } from "vitest";

import {
  addMessage,
  getMessages,
  clearMessages,
  hasMessages,
  setActiveCharacter,
  getActiveCharacterId,
  getActiveCharacter,
} from "../src/engine/chatStore.js";

describe("Chat Store de HeroVerse AI", () => {
  beforeEach(() => {
    clearMessages();
  });

  describe("Historial de mensajes", () => {
    it("debe comenzar sin mensajes", () => {
      expect(hasMessages()).toBe(false);
      expect(getMessages()).toEqual([]);
    });

    it("debe agregar un mensaje al historial", () => {
      const message = {
        role: "user",
        content: "Hola Sherlock",
      };

      addMessage(message);

      expect(hasMessages()).toBe(true);
      expect(getMessages()).toEqual([message]);
    });

    it("debe mantener varios mensajes en orden", () => {
      const userMessage = {
        role: "user",
        content: "Hola Sherlock",
      };

      const assistantMessage = {
        role: "assistant",
        content: "Un placer saludarle.",
      };

      addMessage(userMessage);
      addMessage(assistantMessage);

      expect(getMessages()).toEqual([
        userMessage,
        assistantMessage,
      ]);
    });

    it("debe devolver una copia del historial", () => {
      const message = {
        role: "user",
        content: "Mensaje de prueba",
      };

      addMessage(message);

      const messages = getMessages();

      messages.push({
        role: "assistant",
        content: "Este mensaje no debería afectar el Store",
      });

      expect(getMessages()).toHaveLength(1);
    });

    it("debe eliminar todos los mensajes", () => {
      addMessage({
        role: "user",
        content: "Hola",
      });

      expect(hasMessages()).toBe(true);

      clearMessages();

      expect(hasMessages()).toBe(false);
      expect(getMessages()).toEqual([]);
    });
  });

  describe("Personaje activo", () => {
    it("debe iniciar con Sherlock Holmes", () => {
      expect(getActiveCharacterId()).toBe("sherlock");
    });

    it("debe cambiar a Capitán América", () => {
      setActiveCharacter("captain-america");

      expect(getActiveCharacterId()).toBe(
        "captain-america"
      );
    });

    it("debe cambiar a Jack Sparrow", () => {
      setActiveCharacter("jack-sparrow");

      expect(getActiveCharacterId()).toBe(
        "jack-sparrow"
      );
    });

    it("debe devolver el personaje activo", () => {
      setActiveCharacter("captain-america");

      const character = getActiveCharacter();

      expect(character).toBeDefined();
      expect(character.id).toBe("captain-america");
      expect(character.name).toBe("Capitán América");
    });

    it("debe rechazar un personaje inexistente", () => {
      expect(() => {
        setActiveCharacter("personaje-inexistente");
      }).toThrow();
    });
  });
});