import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

vi.mock("../src/engine/chatStore.js", () => ({
  getMessages: vi.fn(() => []),
}));

vi.mock("../src/components/MessageBubble.js", () => ({
  MessageBubble: vi.fn(),
}));

import {
  showChatError,
  hideChatError,
} from "../src/ui/chatRenderer.js";

describe("Chat Renderer Error", () => {
  let container;
  let errorElement;
  let currentError;

  beforeEach(() => {
    currentError = null;

    container = {
      appendChild: vi.fn((element) => {
        currentError = element;
      }),
      scrollTop: 0,
      scrollHeight: 100,
    };

    errorElement = {
      id: "",
      className: "",
      textContent: "",
      setAttribute: vi.fn(),
      remove: vi.fn(),
    };

    global.document = {
      getElementById: vi.fn((id) => {
        if (id === "messages") {
          return container;
        }

        if (id === "chat-error") {
          return currentError;
        }

        return null;
      }),

      createElement: vi.fn(() => errorElement),
    };
  });

  it("debe renderizar el mensaje de error como texto seguro", () => {
    const maliciousContent = `<img src=x onerror="alert('XSS')">`;

    showChatError(maliciousContent);

    expect(errorElement.id).toBe("chat-error");
    expect(errorElement.className).toBe("chat-error");

    expect(errorElement.setAttribute).toHaveBeenCalledWith(
      "role",
      "alert"
    );

    expect(errorElement.textContent).toBe(
      maliciousContent
    );

    expect(container.appendChild).toHaveBeenCalledWith(
      errorElement
    );
  });

  it("debe eliminar el error visible", () => {
    currentError = errorElement;

    hideChatError();

    expect(errorElement.remove).toHaveBeenCalledTimes(1);
  });
});