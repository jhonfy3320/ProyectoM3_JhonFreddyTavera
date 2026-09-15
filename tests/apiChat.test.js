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
  it("debe rechazar una solicitud sin body", async () => {
  const request = {
    method: "POST",
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
    error: "El cuerpo de la solicitud es obligatorio.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});
it("debe rechazar una solicitud sin characterId", async () => {
  const request = {
    method: "POST",
    body: {
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
    error: "El characterId es obligatorio.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar un characterId que no sea string", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: 123,
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
    error: "El characterId debe ser un texto válido.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar propiedades heredadas como characterId", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "toString",
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
it("debe rechazar una solicitud sin messages", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
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
    error: "El historial de mensajes es obligatorio.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar messages cuando no sea un array", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
      messages: "Hola Sherlock",
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
    error: "El historial de mensajes debe ser un array.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar un historial de mensajes vacío", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
      messages: [],
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
    error: "El historial de mensajes no puede estar vacío.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});
it("debe rechazar elementos de messages que no sean objetos válidos", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
      messages: [
        {
          role: "user",
          content: "Hola",
        },
        null,
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
    error: "Cada mensaje debe ser un objeto válido.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar mensajes con un role no permitido", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
      messages: [
        {
          role: "admin",
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
    error: 'El role de cada mensaje debe ser "user" o "assistant".',
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar mensajes cuyo content no sea string", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
      messages: [
        {
          role: "user",
          content: 123,
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
    error: "El contenido de cada mensaje debe ser un texto válido.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});

it("debe rechazar mensajes cuyo content esté vacío", async () => {
  const request = {
    method: "POST",
    body: {
      characterId: "sherlock",
      messages: [
        {
          role: "user",
          content: "   ",
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
    error: "El contenido de cada mensaje debe ser un texto válido.",
  });

  expect(generateContentMock).not.toHaveBeenCalled();
});
});