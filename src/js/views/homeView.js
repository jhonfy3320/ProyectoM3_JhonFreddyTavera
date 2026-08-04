/**
 * ==========================================================
 * HeroVerse AI
 * Vista Home
 * ==========================================================
 *
 * Esta vista representa la pantalla principal de bienvenida.
 *
 * En esta primera versión solamente devuelve un HTML básico.
 *
 * Más adelante aquí mostraremos:
 * - Descripción de la aplicación.
 * - Personajes disponibles.
 * - Botón para comenzar el chat.
 * ==========================================================
 */

export function homeView() {
    return `
        <section class="view">
            <h2>🏠 Home</h2>
            <p>
                Bienvenido a HeroVerse AI.
            </p>
        </section>
    `;
}