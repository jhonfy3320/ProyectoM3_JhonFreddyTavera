import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

const mocks = vi.hoisted(() => ({
  renderChat: vi.fn(),
  showTypingIndicator: vi.fn(),
  hideTypingIndicator: vi.fn(),
  showChatError: vi.fn(),
  hideChatError: vi.fn(),

  generateResponse: vi.fn(),

  addMessage: vi.fn(),
  getActiveCharacterId: vi.fn(),
}));

vi.mock("../src/ui/chatRenderer.js", () => ({
  renderChat: mocks.renderChat,
  showTypingIndicator: mocks.showTypingIndicator,
  hideTypingIndicator: mocks.hideTypingIndicator,
  showChatError: mocks.showChatError,
  hideChatError: mocks.hideChatError,
}));

vi.mock("../src/engine/chatEngine.js", () => ({
  generateResponse: mocks.generateResponse,
}));

vi.mock("../src/engine/chatStore.js", () => ({
  addMessage: mocks.addMessage,
  getActiveCharacterId: mocks.getActiveCharacterId,
}));

import { initChatController } from "../src/engine/chatController.js";

describe("Chat recoverable error state", () => {
  let submitHandler;
  let input;

  beforeEach(() => {
    vi.clearAllMocks();

    submitHandler = undefined;

    input = {
      value: "Hola Sherlock",
    };

    const form = {
      addEventListener: vi.fn((event, handler) => {
        if (event === "submit") {
          submitHandler = handler;
        }
      }),
    };

    global.document = {
      getElementById: vi.fn((id) => {
        if (id === "chat-form") {
          return form;
        }

        if (id === "chat-input") {
          return input;
        }

        return null;
      }),
    };

    mocks.getActiveCharacterId.mockReturnValue("sherlock");
  });

  it("debe mostrar un error y permitir un nuevo intento", async () => {
    mocks.generateResponse
      .mockRejectedValueOnce(
        new Error("El servicio de IA no está disponible.")
      )
      .mockResolvedValueOnce({
        role: "assistant",
        content: "Ya estoy disponible.",
      });

    initChatController();

    // Primer envío: falla.
    submitHandler({
      preventDefault: vi.fn(),
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(mocks.showChatError).toHaveBeenCalledWith(
      "El servicio de IA no está disponible."
    );
    expect(mocks.addMessage).not.toHaveBeenCalledWith(
    {
        role: "assistant",
        content: "El servicio de IA no está disponible.",
    },
    "sherlock"
    );

    expect(mocks.hideTypingIndicator).toHaveBeenCalled();

    // Segundo intento después del error.
    input.value = "Intentar de nuevo";

    submitHandler({
      preventDefault: vi.fn(),
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(mocks.generateResponse).toHaveBeenCalledTimes(2);

    expect(mocks.addMessage).toHaveBeenCalledWith(
      {
        role: "assistant",
        content: "Ya estoy disponible.",
      },
      "sherlock"
    );
  });
  it("debe mostrar un mensaje seguro cuando el error no tenga formato válido", async () => {
  mocks.generateResponse.mockRejectedValueOnce(
    "error desconocido"
  );

  initChatController();

  submitHandler({
    preventDefault: vi.fn(),
  });

  await Promise.resolve();
  await Promise.resolve();

  expect(mocks.showChatError).toHaveBeenCalledWith(
    "No fue posible obtener una respuesta. Intenta nuevamente."
  );

  expect(mocks.hideTypingIndicator).toHaveBeenCalled();
});
});