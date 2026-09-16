import {
  describe,
  it,
  expect,
} from "vitest";

import { MessageBubble } from "../src/components/MessageBubble.js";

describe("Character identity in MessageBubble", () => {
  const character = {
    id: "jack-sparrow",
    name: "Jack Sparrow",
    image: "/jack-sparrow.jpg",
  };

  it("debe renderizar la identidad del personaje en mensajes del asistente", () => {
    const html = MessageBubble(
      {
        role: "assistant",
        content: "¿Dónde está mi barco?",
      },
      character
    );

    expect(html).toContain("Jack Sparrow");
    expect(html).toContain("/jack-sparrow.jpg");

    expect(html).toContain(
      'alt="Jack Sparrow"'
    );

    expect(html).not.toContain(
      "<strong>AI</strong>"
    );

    expect(html).not.toContain("🤖");
  });

  it("debe mantener la identidad del usuario en sus propios mensajes", () => {
    const html = MessageBubble(
      {
        role: "user",
        content: "Hola Jack",
      },
      character
    );

    expect(html).toContain("Tú");

    expect(html).not.toContain(
      "<strong>Jack Sparrow</strong>"
    );
  });
});