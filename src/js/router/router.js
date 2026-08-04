/**
 * ==========================================================
 * HeroVerse AI
 * Router Principal
 * ==========================================================
 *
 * Este módulo administra la navegación de la aplicación
 * utilizando History API.
 *
 * Responsabilidades:
 * - Detectar la ruta actual.
 * - Seleccionar la vista correspondiente.
 * - Renderizar la vista dentro del contenedor principal.
 * ==========================================================
 */

import { homeView } from "../views/homeView.js";
import { chatView } from "../views/chatView.js";
import { aboutView } from "../views/aboutView.js";

/**
 * Renderiza la vista correspondiente según la URL.
 */
export function router() {
  // Contenedor principal de la aplicación
  const app = document.getElementById("app");

  // Ruta actual del navegador
  const path = window.location.pathname;
  console.log("📍 Ruta actual:", path);

  switch (path) {
    case "/":
    case "/home":
      app.innerHTML = homeView();
      break;

    case "/chat":
      app.innerHTML = chatView();
      break;

    case "/about":
      app.innerHTML = aboutView();
      break;

    default:
      app.innerHTML = `
        <section class="view">
          <h2>404</h2>
          <p>Página no encontrada.</p>
        </section>
      `;
      break;
  }
}