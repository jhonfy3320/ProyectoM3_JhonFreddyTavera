import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

const mocks = vi.hoisted(() => ({
  getMessages: vi.fn(),
  getActiveCharacter: vi.fn(),
  MessageBubble: vi.fn(),
}));

vi.mock("../src/engine/chatStore.js", () => ({
  getMessages: mocks.getMessages,
  getActiveCharacter: mocks.getActiveCharacter,
}));

vi.mock("../src/components/MessageBubble.js", () => ({
  MessageBubble: mocks.MessageBubble,
}));

import {
  renderChat,
  showTypingIndicator,
} from "../src/ui/chatRenderer.js";

describe("Chat Renderer Character Identity", () => {
  let container;

  const character = {
    id: "jack-sparrow",
    name: "Jack Sparrow",
    image: "/jack-sparrow.jpg",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    container = {
      innerHTML: "",
      insertAdjacentHTML: vi.fn(),
      scrollTop: 0,
      scrollHeight: 100,
    };

    global.document = {
      getElementById: vi.fn((id) => {
        if (id === "messages") {
          return container;
        }

        return null;
      }),
    };

    mocks.getActiveCharacter.mockReturnValue(character);
  });

  it("debe pasar el personaje activo a cada MessageBubble", () => {
    const message = {
      role: "assistant",
      content: "Respuesta de Jack",
    };

    mocks.getMessages.mockReturnValue([message]);

    mocks.MessageBubble.mockReturnValue(
      "<article>Respuesta</article>"
    );

    renderChat();

    expect(mocks.getActiveCharacter).toHaveBeenCalled();

    expect(mocks.MessageBubble).toHaveBeenCalledWith(
      message,
      character
    );
  });

  it("debe mostrar la identidad del personaje activo en el indicador de escritura", () => {
    showTypingIndicator();

    expect(mocks.getActiveCharacter).toHaveBeenCalled();

    expect(container.insertAdjacentHTML).toHaveBeenCalledTimes(1);

    const html = container.insertAdjacentHTML.mock.calls[0][1];

    expect(html).toContain("Jack Sparrow");
    expect(html).toContain("/jack-sparrow.jpg");
    expect(html).not.toContain("Sherlock Holmes");
    expect(html).not.toContain("🤖");
  });
});