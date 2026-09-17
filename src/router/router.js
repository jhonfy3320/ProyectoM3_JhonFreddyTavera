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
/**
 * Sincroniza visual y semánticamente la navegación
 * principal con la ruta actual.
 */
export function syncNavigationState(path) {
  const normalizedPath = path === "/" ? "/home" : path;

  const links = document.querySelectorAll(".navigation [data-link]");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === normalizedPath;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}
export function router() {
  const app = document.getElementById("app");
  const path = window.location.pathname;

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
  }

  syncNavigationState(path);
}
/**
 * ==========================================================
 * Cambia la URL sin recargar la página.
 * ==========================================================
 */
export function navigate(path) {
  history.pushState({}, "", path);
  router();
}

/**
 * ==========================================================
 * Inicializa el Router.
 * ==========================================================
 */
export function initRouter() {
  /*
   * Captura todos los enlaces internos
   */
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");

    if (!link) return;

    event.preventDefault();
    navigate(link.getAttribute("href"));
  });

  /*
   * Detecta Back y Forward (Botones de Atrás/Adelante del navegador)
   */
  window.addEventListener("popstate", router);

  /*
   * Primera carga
   */
  router();
}