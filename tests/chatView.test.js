import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

const mocks = vi.hoisted(() => ({
  initChatController: vi.fn(),
  getActiveCharacter: vi.fn(),
}));

vi.mock("../src/engine/chatController.js", () => ({
  initChatController: mocks.initChatController,
}));

vi.mock("../src/engine/chatStore.js", () => ({
  getActiveCharacter: mocks.getActiveCharacter,
}));

import { chatView } from "../src/views/chatView.js";

describe("Chat View DOM", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getActiveCharacter.mockReturnValue({
      id: "sherlock",
      name: "Sherlock Holmes",
      image: "/sherlock.webp",
      description: "Detective consultor.",
    });
  });

  it("debe renderizar un único contenedor para los mensajes del chat", () => {
    const html = chatView();

    const messagesContainers = html.match(/id="messages"/g) ?? [];

    expect(messagesContainers).toHaveLength(1);
    expect(html).not.toContain('id="chatMessages"');
  });

  it("debe conservar las clases y accesibilidad del contenedor de mensajes", () => {
    const html = chatView();

    expect(html).toContain('id="messages"');
    expect(html).toContain('class="chat-messages messages"');
    expect(html).toContain('aria-live="polite"');
  });
  it("debe renderizar un composer amplio, accesible y responsive", () => {
  const html = chatView();

  expect(html).toContain(
    'class="chat-form__input-wrapper"'
  );

  expect(html).toContain(
    'class="chat-form__input"'
  );

  expect(html).toContain(
    'class="chat-form__send btn btn-primary"'
  );

  expect(html).toContain(
    'rows="4"'
  );

  expect(html).toContain(
    'aria-label="Enviar mensaje"'
  );
});
});