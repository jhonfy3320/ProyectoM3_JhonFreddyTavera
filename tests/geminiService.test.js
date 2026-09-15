import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";

import { sendMessage } from "../src/services/geminiService.js";

describe("Gemini Service", () => {

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debe enviar el characterId y el historial al backend", async () => {
    const characterId = "sherlock";

    const messages = [
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ];

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        content: "Un placer saludarle, Freddy.",
        usage: {
          inputTokens: 10,
          outputTokens: 8,
        },
      }),
    });

    const result = await sendMessage(messages, characterId);

    expect(fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterId,
          messages,
        }),
      })
    );
    expect(result).toEqual({
      role: "assistant",
      content: "Un placer saludarle, Freddy.",
      usage: {
        inputTokens: 10,
        outputTokens: 8,
      },
    });
  });
  it("debe rechazar un historial que no sea un array", async () => {
    await expect(
      sendMessage("Hola Sherlock")
    ).rejects.toThrow(
      "El historial debe ser un array."
    );
  });

  it("debe manejar un error de conexión", async () => {
    fetch.mockRejectedValue(
      new TypeError("Failed to fetch")
    );

    await expect(
      sendMessage([
        {
          role: "user",
          content: "Hola Sherlock",
        },
      ])
    ).rejects.toThrow(
      "No fue posible conectar con el servidor. Verifica tu conexión."
    );
  });

//Agregamos el test de 400
it("debe manejar un error HTTP 400", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 400,
    json: async () => ({
      error: "El historial de mensajes es obligatorio.",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El historial de mensajes es obligatorio."
  );
});
// 401 — autorización
it("debe manejar un error HTTP 401", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 401,
    json: async () => ({
      error: "Unauthorized",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El servicio de IA no está autorizado correctamente."
  );
});
// 403 — autorización
it("debe manejar un error HTTP 403", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 403,
    json: async () => ({
      error: "Forbidden",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El servicio de IA no está autorizado correctamente."
  );
});
//429 — Rate Limit
it("debe manejar un error HTTP 429 de rate limit", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 429,
    json: async () => ({
      error: "Quota exceeded",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El servicio de IA está temporalmente saturado. Intenta nuevamente en unos segundos."
  );
});
//500 Error Interno 
it("debe manejar un error HTTP 500", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 500,
    json: async () => ({
      error: "Error interno del servidor.",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "Error interno del servidor."
  );
});
// — Bad Gateway
it("debe manejar un error HTTP 502", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 502,
    json: async () => ({
      error: "Bad Gateway.",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "Bad Gateway."
  );
});
// 503 — Servicio no disponible
it("debe manejar un error HTTP 503", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 503,
    json: async () => ({
      error: "El servicio de IA no está disponible.",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El servicio de IA no está disponible."
  );
});
/// Nuvo 
it("debe rechazar una respuesta 200 sin content", async () => {
  fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El servidor respondió correctamente, pero no devolvió una respuesta válida."
  );
});

it("debe rechazar una respuesta 200 con content vacío", async () => {
  fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      content: "",
    }),
  });

  await expect(
    sendMessage([
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ])
  ).rejects.toThrow(
    "El servidor respondió correctamente, pero no devolvió una respuesta válida."
  );
});

it("debe aceptar una respuesta 200 con content válido", async () => {
  fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      content: "Saludos, Freddy.",
    }),
  });

  const result = await sendMessage([
    {
      role: "user",
      content: "Hola Sherlock",
    },
  ]);

  expect(result).toEqual({
    role: "assistant",
    content: "Saludos, Freddy.",
    usage: null,
  });
});
});