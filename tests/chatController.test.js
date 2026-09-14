import { describe, it, expect, vi, beforeEach } from "vitest";

const renderChatMock = vi.fn();

vi.mock("../src/ui/chatRenderer.js", () => ({
  renderChat: renderChatMock,
  showTypingIndicator: vi.fn(),
  hideTypingIndicator: vi.fn(),
}));

vi.mock("../src/engine/chatEngine.js", () => ({
  generateResponse: vi.fn(),
}));

describe("Chat Controller", () => {
  beforeEach(() => {
    renderChatMock.mockClear();

    global.document = {
      getElementById: vi.fn((id) => {
        if (id === "chat-form") {
          return {
            addEventListener: vi.fn(),
          };
        }

        if (id === "chat-input") {
          return {};
        }

        return null;
      }),
    };
  });

  it("debe restaurar el historial al montar el chat", async () => {
    const { initChatController } = await import(
      "../src/engine/chatController.js"
    );

    initChatController();

    expect(renderChatMock).toHaveBeenCalledTimes(1);
  });
});
