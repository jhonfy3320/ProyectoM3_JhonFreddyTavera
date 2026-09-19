/**
 * ==========================================================
 * HeroVerse AI
 * Vista About
 * ==========================================================
 */

export function aboutView() {
  return `
    <section class="about-page">
      <header class="about-header">
        <span class="section-eyebrow">
          HERO UNIVERSE
        </span>

        <h2>
          Sobre HeroVerse AI
        </h2>

        <p>
          HeroVerse AI es una Single Page Application
          desarrollada como Proyecto Integrador del
          Módulo 3 de Full Stack Developer.
        </p>
      </header>

      <div class="about-grid">

        <!-- OBJETIVO -->
        <article class="about-card about-card--featured">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">
              🎯
            </span>

            <span class="about-card__eyebrow">
              MISIÓN
            </span>
          </div>

          <h3>
            Objetivo del proyecto
          </h3>

          <p class="about-card__lead">
            Permitir que cualquier usuario pueda
            mantener conversaciones naturales con
            personajes ficticios mediante Inteligencia
            Artificial, utilizando Google Gemini de
            forma segura a través de Serverless
            Functions en Vercel.
          </p>
        </article>

        <!-- TECNOLOGÍAS -->
        <article class="about-card about-card--stack">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">
              ⚙
            </span>

            <span class="about-card__eyebrow">
              TECH STACK
            </span>
          </div>

          <h3>
            Tecnologías utilizadas
          </h3>

          <ul class="tech-grid">
            <li class="tech-chip">
              HTML5
            </li>

            <li class="tech-chip">
              CSS3
            </li>

            <li class="tech-chip">
              JavaScript
            </li>

            <li class="tech-chip">
              History API
            </li>

            <li class="tech-chip">
              Fetch API
            </li>

            <li class="tech-chip tech-chip--accent">
              Google Gemini AI
            </li>

            <li class="tech-chip">
              Vercel Functions
            </li>

            <li class="tech-chip">
              Vitest
            </li>

            <li class="tech-chip">
              Git & GitHub
            </li>
          </ul>
        </article>

        <!-- ARQUITECTURA -->
        <article class="about-card about-card--architecture">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">
              ◫
            </span>

            <span class="about-card__eyebrow">
              ARCHITECTURE
            </span>
          </div>

          <h3>
            Arquitectura modular
          </h3>

          <p>
            El proyecto utiliza módulos con
            responsabilidades independientes,
            facilitando mantenimiento, testing
            y evolución.
          </p>

          <div class="architecture-flow">
            <span>
              Views
            </span>

            <span aria-hidden="true">
              →
            </span>

            <span>
              Router
            </span>

            <span aria-hidden="true">
              →
            </span>

            <span>
              Services
            </span>

            <span aria-hidden="true">
              →
            </span>

            <span>
              Components
            </span>

            <span aria-hidden="true">
              →
            </span>

            <span>
              Serverless API
            </span>
          </div>
        </article>

        <!-- PERSONAJES -->
        <article class="about-card about-card--characters">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">
              🦸
            </span>

            <span class="about-card__eyebrow">
              CHARACTERS
            </span>
          </div>

          <h3>
            Personajes disponibles
          </h3>

          <div class="character-list">
            <span class="character-chip character-chip--sherlock">
              Sherlock Holmes
            </span>

            <span class="character-chip character-chip--captain">
              Capitán América
            </span>

            <span class="character-chip character-chip--jack">
              Jack Sparrow
            </span>
          </div>
        </article>

        <!-- AUTOR -->
        <article class="about-card about-card--author">
          <div class="author-mark">
            FT
          </div>

          <div class="author-content">
            <span class="about-card__eyebrow">
              BUILT BY
            </span>

            <h3>
              Freddy Tavera
            </h3>

            <p>
              Estudiante de Ingeniería Informática
              y Full Stack Developer.
            </p>
          </div>

          <div class="author-project">
            <span>
              HERO
            </span>

            <strong>
              VERSE AI
            </strong>
          </div>
        </article>

      </div>

    </section>
  `;
}