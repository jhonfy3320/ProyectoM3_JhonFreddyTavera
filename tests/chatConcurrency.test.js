import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  renderChat: vi.fn(),
  showTypingIndicator: vi.fn(),
  hideTypingIndicator: vi.fn(),

  generateResponse: vi.fn(),

  addMessage: vi.fn(),
  getActiveCharacterId: vi.fn(),
}));

vi.mock("../src/ui/chatRenderer.js", () => ({
  renderChat: mocks.renderChat,
  showTypingIndicator: mocks.showTypingIndicator,
  hideTypingIndicator: mocks.hideTypingIndicator,
}));

vi.mock("../src/engine/chatEngine.js", () => ({
  generateResponse: mocks.generateResponse,
}));

vi.mock("../src/engine/chatStore.js", () => ({
  addMessage: mocks.addMessage,
  getActiveCharacterId: mocks.getActiveCharacterId,
}));

import { initChatController } from "../src/engine/chatController.js";

describe("Chat concurrency", () => {
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
  });

  it("debe guardar la respuesta en el personaje que originó la solicitud", async () => {
    let resolveResponse;

    mocks.getActiveCharacterId.mockReturnValue("sherlock");

    mocks.generateResponse.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveResponse = resolve;
        })
    );

    initChatController();

    submitHandler({
      preventDefault: vi.fn(),
    });

    // El usuario cambia de personaje mientras Gemini responde.
    mocks.getActiveCharacterId.mockReturnValue("jack-sparrow");

    resolveResponse({
      role: "assistant",
      content: "Respuesta para Sherlock",
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(mocks.addMessage).toHaveBeenCalledWith(
      {
        role: "assistant",
        content: "Respuesta para Sherlock",
      },
      "sherlock"
    );
  });
  it("debe impedir un segundo envío mientras existe una solicitud en curso", async () => {
  let resolveResponse;

  mocks.getActiveCharacterId.mockReturnValue("sherlock");

  mocks.generateResponse.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveResponse = resolve;
      })
  );

  initChatController();

  // Primer mensaje.
  input.value = "Primer mensaje";

  submitHandler({
    preventDefault: vi.fn(),
  });

  // Segundo intento mientras Gemini sigue respondiendo.
  input.value = "Segundo mensaje";

  submitHandler({
    preventDefault: vi.fn(),
  });

  expect(mocks.generateResponse).toHaveBeenCalledTimes(1);

  expect(mocks.addMessage).toHaveBeenCalledTimes(1);

  expect(mocks.addMessage).toHaveBeenCalledWith(
    {
      role: "user",
      content: "Primer mensaje",
    },
    "sherlock"
  );

  // Finalizamos la solicitud pendiente para no dejar
  // una Promise abierta durante el test.
  resolveResponse({
    role: "assistant",
    content: "Respuesta de Sherlock",
  });

  await Promise.resolve();
  await Promise.resolve();
 });
});