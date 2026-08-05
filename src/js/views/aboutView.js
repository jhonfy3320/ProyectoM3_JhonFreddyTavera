/**
 * ==========================================================
 * HeroVerse AI
 * Vista About
 * ==========================================================
 *
 * Esta vista mostrará información del proyecto,
 * tecnologías utilizadas y descripción del personaje.
 *
 * En esta fase únicamente se construye la interfaz.
 * La lógica será implementada en la Fase 3.
 * ==========================================================
 */

export function aboutView() {
  return `
    <section class="about-page">

      <header class="about-header">
        <h2>Sobre HeroVerse AI</h2>
        <p>
          HeroVerse AI es una Single Page Application desarrollada como
          Proyecto Integrador del Módulo 3 de Full Stack Developer.
        </p>
      </header>

      <section class="about-card">
        <h3>🎯 Objetivo del Proyecto</h3>
        <p>
          Permitir que cualquier usuario pueda mantener conversaciones
          naturales con personajes ficticios mediante Inteligencia Artificial,
          utilizando Google Gemini de forma segura a través de
          Serverless Functions en Vercel.
        </p>
      </section>

      <section class="about-card">
        <h3>⚙ Tecnologías utilizadas</h3>
        <ul>
          <li>HTML5</li>
          <li>CSS3 (Mobile First)</li>
          <li>JavaScript ES Modules</li>
          <li>History API (SPA)</li>
          <li>Fetch API</li>
          <li>Google Gemini AI</li>
          <li>Vercel Functions</li>
          <li>Vitest</li>
          <li>Git & GitHub</li>
        </ul>
      </section>

      <section class="about-card">
        <h3>🏛 Arquitectura</h3>
        <p>
          El proyecto fue desarrollado utilizando una arquitectura
          modular basada en responsabilidades independientes:
        </p>
        <ul>
          <li>Views</li>
          <li>Router</li>
          <li>Services</li>
          <li>Components</li>
          <li>Utilities</li>
          <li>Serverless API</li>
        </ul>
      </section>

      <section class="about-card">
        <h3>🦸 Personajes disponibles</h3>
        <div class="character-list">
          <span class="badge">Sherlock Holmes</span>
          <span class="badge">Jack Sparrow</span>
          <span class="badge">Capitán América</span>
        </div>
      </section>

      <section class="about-card">
        <h3>👨‍💻 Autor</h3>
        <p>Freddy Tavera</p>
        <p>
          Estudiante de Ingeniería Informática y
          Full Stack Developer.
        </p>
      </section>

    </section>
  `;
}