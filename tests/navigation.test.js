import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";

const mocks = vi.hoisted(() => ({
  homeView: vi.fn(() => "<section>Home</section>"),
  chatView: vi.fn(() => "<section>Chat</section>"),
  aboutView: vi.fn(() => "<section>About</section>"),
}));

vi.mock("../src/views/homeView.js", () => ({
  homeView: mocks.homeView,
}));

vi.mock("../src/views/chatView.js", () => ({
  chatView: mocks.chatView,
}));

vi.mock("../src/views/aboutView.js", () => ({
  aboutView: mocks.aboutView,
}));

import { router } from "../src/router/router.js";

const indexHtml = readFileSync(
  new URL("../index.html", import.meta.url),
  "utf8"
);

describe("Navigation state", () => {
  let app;
  let links;

  function createLink(href) {
    const attributes = new Map([["href", href]]);
    const classes = new Set();

    return {
      getAttribute: vi.fn((name) => attributes.get(name) ?? null),

      setAttribute: vi.fn((name, value) => {
        attributes.set(name, value);
      }),

      removeAttribute: vi.fn((name) => {
        attributes.delete(name);
      }),

      classList: {
        toggle: vi.fn((className, force) => {
          if (force) {
            classes.add(className);
          } else {
            classes.delete(className);
          }
        }),

        contains: vi.fn((className) => classes.has(className)),
      },

      hasAttribute(name) {
        return attributes.has(name);
      },

      readAttribute(name) {
        return attributes.get(name);
      },
    };
  }

  beforeEach(() => {
    vi.clearAllMocks();

    app = {
      innerHTML: "",
    };

    links = [
      createLink("/home"),
      createLink("/chat"),
      createLink("/about"),
    ];

    global.document = {
      getElementById: vi.fn((id) => {
        if (id === "app") {
          return app;
        }

        return null;
      }),

      querySelectorAll: vi.fn((selector) => {
        if (selector === ".navigation [data-link]") {
          return links;
        }

        return [];
      }),
    };

    global.window = {
      location: {
        pathname: "/home",
      },
    };
  });

  it("debe utilizar la clase navigation en el HTML principal", () => {
  expect(indexHtml).toMatch(/<nav\s+class="navigation"/);
  });

  it("debe marcar como activo únicamente el enlace de la ruta actual", () => {
    window.location.pathname = "/chat";

    router();

    expect(links[0].classList.contains("active")).toBe(false);
    expect(links[1].classList.contains("active")).toBe(true);
    expect(links[2].classList.contains("active")).toBe(false);

    expect(links[1].readAttribute("aria-current")).toBe("page");
  });

  it("debe considerar la ruta raíz como Home", () => {
    window.location.pathname = "/";

    router();

    expect(links[0].classList.contains("active")).toBe(true);
    expect(links[0].readAttribute("aria-current")).toBe("page");
  });

  it("debe eliminar estados activos obsoletos al cambiar de ruta", () => {
    window.location.pathname = "/chat";
    router();

    window.location.pathname = "/about";
    router();

    expect(links[0].classList.contains("active")).toBe(false);
    expect(links[1].classList.contains("active")).toBe(false);
    expect(links[2].classList.contains("active")).toBe(true);

    expect(links[1].hasAttribute("aria-current")).toBe(false);
    expect(links[2].readAttribute("aria-current")).toBe("page");
  });
  it("no debe mantener ningún enlace activo en una ruta desconocida", () => {
  window.location.pathname = "/chat";
  router();

  window.location.pathname =
    "/ruta-inexistente";

  router();

  links.forEach((link) => {
    expect(
      link.classList.contains("active")
    ).toBe(false);

    expect(
      link.hasAttribute("aria-current")
    ).toBe(false);
  });
 });
});