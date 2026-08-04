/**
 * ==========================================
 * HeroVerse AI
 * Router Principal
 * ==========================================
 *
 * Este módulo administra la navegación de la
 * aplicación utilizando History API.
 *
 * En esta primera versión solamente registra
 * la ruta actual.
 *
 * Más adelante será el encargado de renderizar
 * las vistas Home, Chat y About.
 * ==========================================
 */

export function router() {

    const path = window.location.pathname;

    console.log("Ruta actual:", path);

}