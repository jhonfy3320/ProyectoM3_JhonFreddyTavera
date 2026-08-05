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
    <section class="home-view">
      <div class="hero-section">
        <span class="badge">
          🤖 Powered by Google Gemini AI
        </span>
        <h2 class="hero-title">
          Conversa con los héroes más legendarios
        </h2>
        <p class="hero-description">
          HeroVerse AI te permite mantener conversaciones naturales
          con personajes icónicos utilizando Inteligencia Artificial.
          Cada personaje posee una personalidad única y responde
          manteniendo su esencia durante toda la conversación.
        </p>
        <a href="/chat" class="btn btn-primary" data-link>
          Comenzar conversación
        </a>
      </div>

      <section class="characters-section">
        <h3>Personajes disponibles</h3>
        <div class="characters-grid">
          
          <article class="character-card">
            <div class="avatar-container">
              🕵️
            </div>
            <h4>Sherlock Holmes</h4>
            <p>
              El detective más brillante del mundo.
              Observador, lógico y extremadamente analítico.
            </p>
          </article>

          <article class="character-card">
            <div class="avatar-container">
              🏴‍☠️
            </div>
            <h4>Jack Sparrow</h4>
            <p>
              Astuto, impredecible y con un humor único.
              Siempre encuentra una salida inesperada.
            </p>
          </article>

          <article class="character-card">
            <div class="avatar-container">
              🛡️
            </div>
            <h4>Capitán América</h4>
            <p>
              Líder nato, honorable y dispuesto a proteger
              a cualquiera que necesite ayuda.
            </p>
          </article>

        </div>
      </section>
    </section>
  `;
}