import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
}from "vitest";

const {
    getMessagesMock,
    getActiveCharacterIdMock,
    sendMessageMock,
} = vi.hoisted(() => ({
    getMessagesMock: vi.fn(),
    getActiveCharacterIdMock: vi.fn(),
    sendMessageMock: vi.fn(),
}));

vi.mock("../src/engine/chatStore.js", () => ({
    getMessages: getMessagesMock,
    getActiveCharacterId: getActiveCharacterIdMock,
}));
vi.mock("../src/services/geminiService.js", () => ({
  sendMessage: sendMessageMock,
}));

import { generateResponse } from "../src/engine/chatEngine.js";

describe("Chat Engine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe enviar al servicio el historial y el characterId activo", async () => {
    const messages = [
      {
        role: "user",
        content: "Hola Sherlock",
      },
    ];

    getMessagesMock.mockReturnValue(messages);
    getActiveCharacterIdMock.mockReturnValue("sherlock");

    sendMessageMock.mockResolvedValue({
      role: "assistant",
      content: "Elemental.",
      usage: null,
    });

    const result = await generateResponse();

    expect(sendMessageMock).toHaveBeenCalledWith(
      messages,
      "sherlock"
    );

    expect(result).toEqual({
      role: "assistant",
      content: "Elemental.",
      usage: null,
    });
  });
});