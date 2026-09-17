import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";

const vercelConfigPath = new URL("../vercel.json", import.meta.url);

function getVercelConfig() {
  if (!existsSync(vercelConfigPath)) {
    return null;
  }

  return JSON.parse(readFileSync(vercelConfigPath, "utf8"));
}

describe("Vercel deployment configuration", () => {
  it("debe incluir vercel.json en la raíz del proyecto", () => {
    expect(existsSync(vercelConfigPath)).toBe(true);
  });

  it("debe redirigir las rutas SPA hacia index.html", () => {
    const config = getVercelConfig();

    expect(config).not.toBeNull();
    expect(config.$schema).toBe("https://openapi.vercel.sh/vercel.json");
    expect(config.rewrites).toEqual([
      {
        source: "/(.*)",
        destination: "/index.html",
      },
    ]);
  });

  it("no debe utilizar configuración legacy de rutas o builds", () => {
    const config = getVercelConfig();

    expect(config).not.toBeNull();
    expect(config.routes).toBeUndefined();
    expect(config.builds).toBeUndefined();
    expect(config.cleanUrls).not.toBe(true);
  });
});