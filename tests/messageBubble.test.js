import { describe, it, expect } from "vitest";
import { MessageBubble } from "../src/components/MessageBubble.js";

describe("MessageBubble", () => {
  it("debe escapar contenido HTML potencialmente malicioso", () => {
    const message = {
      role: "user",
      content: `<img src=x onerror="alert('XSS')">`,
    };

    const html = MessageBubble(message);

    expect(html).toContain(
      "&lt;img src=x onerror=&quot;alert(&#039;XSS&#039;)&quot;&gt;"
    );

    expect(html).not.toContain(
      `<img src=x onerror="alert('XSS')">`
    );
  });
});