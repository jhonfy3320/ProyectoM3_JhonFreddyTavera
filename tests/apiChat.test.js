import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";

const { generateContentMock } = vi.hoisted(() => ({
  generateContentMock: vi.fn(),
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    constructor() {
      this.models = {
        generateContent: generateContentMock,
      };
    }
  },
}));

import handler from "../api/chat.js";

describe("API Chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env.GEMINI_API_KEY = "test-api-key";

    generateContentMock.mockResolvedValue({
      text: "Respuesta simulada.",
    });
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  it("debe aplicar el system prompt de Sherlock Holmes", async () => {
    const request = {
      method: "POST",
      body: {
        characterId: "sherlock",
        messages: [
          {
            role: "user",
            content: "Hola Sherlock",
          },
        ],
      },
    };

    const json = vi.fn();

    const response = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await handler(request, response);

    expect(generateContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          systemInstruction: expect.stringContaining(
            "Eres Sherlock Holmes"
          ),
        }),
      })
    );
  });

  it("debe aplicar el system prompt del Capitán América", async () => {
    const request = {
      method: "POST",
      body: {
        characterId: "captain-america",
        messages: [
          {
            role: "user",
            content: "Hola Capitán",
          },
        ],
      },
    };

    const json = vi.fn();

    const response = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await handler(request, response);

    expect(generateContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          systemInstruction: expect.stringContaining(
            "Eres el Capitán América"
          ),
        }),
      })
    );
  });

  it("debe aplicar el system prompt de Jack Sparrow", async () => {
    const request = {
      method: "POST",
      body: {
        characterId: "jack-sparrow",
        messages: [
          {
            role: "user",
            content: "Hola Jack",
          },
        ],
      },
    };

    const json = vi.fn();

    const response = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await handler(request, response);

    expect(generateContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          systemInstruction: expect.stringContaining(
            "Eres Jack Sparrow"
          ),
        }),
      })
    );
  });

  it("debe rechazar un characterId inexistente", async () => {
    const request = {
      method: "POST",
      body: {
        characterId: "personaje-inexistente",
        messages: [
          {
            role: "user",
            content: "Hola",
          },
        ],
      },
    };

    const json = vi.fn();

    const response = {
      status: vi.fn(() => ({
        json,
      })),
    };

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith({
      error: "El personaje seleccionado no es válido.",
    });

    expect(generateContentMock).not.toHaveBeenCalled();
  });
});