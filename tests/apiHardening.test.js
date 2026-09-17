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

function createRequest(overrides = {}) {
  return {
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
    ...overrides,
  };
}

function createResponse() {
  const json = vi.fn();

  const response = {
    setHeader: vi.fn(),
    status: vi.fn(() => ({
      json,
    })),
  };

  return {
    response,
    json,
  };
}

describe("API Chat production hardening", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env.GEMINI_API_KEY = "test-api-key";

    generateContentMock.mockResolvedValue({
      text: "Respuesta simulada.",
    });
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;

    vi.restoreAllMocks();
  });

  it("debe impedir cachear respuestas privadas del chat", async () => {
    const request = createRequest();
    const { response } = createResponse();

    await handler(request, response);

    expect(response.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "no-store, max-age=0"
    );
    expect(response.setHeader).toHaveBeenCalledWith(
      "Pragma",
      "no-cache"
    );
    expect(response.setHeader).toHaveBeenCalledWith(
      "X-Content-Type-Options",
      "nosniff"
    );
  });

  it("no debe registrar el contenido privado de la conversación", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const request = createRequest();
    const { response } = createResponse();

    await handler(request, response);

    expect(logSpy).not.toHaveBeenCalled();
  });

  it("debe rechazar historiales excesivamente grandes", async () => {
    const messages = Array.from({ length: 51 }, (_, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: `Mensaje ${index}`,
    }));

    const request = createRequest({
      body: {
        characterId: "sherlock",
        messages,
      },
    });

    const { response, json } = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(413);
    expect(json).toHaveBeenCalledWith({
      error: "El historial de conversación excede el límite permitido.",
    });
    expect(generateContentMock).not.toHaveBeenCalled();
  });

  it("debe rechazar mensajes individuales demasiado largos", async () => {
    const request = createRequest({
      body: {
        characterId: "sherlock",
        messages: [
          {
            role: "user",
            content: "a".repeat(4001),
          },
        ],
      },
    });

    const { response, json } = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(413);
    expect(json).toHaveBeenCalledWith({
      error: "Uno o más mensajes exceden el tamaño permitido.",
    });
    expect(generateContentMock).not.toHaveBeenCalled();
  });

  it("debe limitar el tamaño total del contexto enviado", async () => {
    const request = createRequest({
      body: {
        characterId: "sherlock",
        messages: Array.from({ length: 8 }, () => ({
          role: "user",
          content: "a".repeat(4000),
        })),
      },
    });

    const { response, json } = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(413);
    expect(json).toHaveBeenCalledWith({
      error: "El contenido total de la conversación excede el límite permitido.",
    });
    expect(generateContentMock).not.toHaveBeenCalled();
  });

  it("debe limitar la cantidad máxima de tokens generados por Gemini", async () => {
    const request = createRequest();
    const { response } = createResponse();

    await handler(request, response);

    expect(generateContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          maxOutputTokens: 800,
        }),
      })
    );
  });

  it("debe devolver 429 con Retry-After cuando Gemini aplique rate limit", async () => {
    generateContentMock.mockRejectedValueOnce(
      Object.assign(new Error("RESOURCE_EXHAUSTED"), {
        status: 429,
      })
    );

    const request = createRequest();
    const { response, json } = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(429);
    expect(response.setHeader).toHaveBeenCalledWith("Retry-After", "30");
    expect(json).toHaveBeenCalledWith({
      error: "El servicio de IA está temporalmente saturado. Intenta nuevamente en unos segundos.",
    });
  });
});