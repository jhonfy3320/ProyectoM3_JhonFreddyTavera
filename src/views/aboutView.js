/**
 * ==========================================================
 * HeroVerse AI
 * Vista About
 * ==========================================================
* ==========================================================
 *
 * Presenta:
 * - Contexto del proyecto.
 * - Objetivo.
 * - Tecnologías.
 * - Arquitectura.
 * - Personajes.
 * - Autor.
 * ==========================================================
 */

import { characters } from "../characters/characters.js";

export function aboutView() {
  const characterProfiles = characters
    .map(
      (character) => `
        <li class="character-profile">
          <strong>${character.name}</strong>
          <span>${character.description}</span>
        </li>
      `
    )
    .join("");

  return `
    <section class="about-page">
      <header class="about-header">
        <span class="section-eyebrow">HERO UNIVERSE</span>
        <h2>Sobre HeroVerse AI</h2>
        <p>
          HeroVerse AI es una Single Page Application desarrollada como Proyecto Integrador del Módulo 3 de Full Stack Developer. El proyecto combina desarrollo frontend, arquitectura modular, Serverless Functions e Inteligencia Artificial generativa para construir una experiencia de chat basada en personajes con identidades diferenciadas.
        </p>
        <p>
          La aplicación fue diseñada para que el usuario pueda elegir un personaje, iniciar una conversación y cambiar posteriormente a otra identidad sin mezclar los historiales. Cada respuesta se genera utilizando Google Gemini y un system prompt específico para conservar el comportamiento esperado del personaje.
        </p>
      </header>

      <div class="about-grid">
        <!-- ==================================================
             OBJETIVO
        =================================================== -->
        <article class="about-card about-card--featured">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">🎯</span>
            <span class="about-card__eyebrow">MISIÓN</span>
          </div>

          <h3>Objetivo del proyecto</h3>

          <p class="about-card__lead">
            Construir una aplicación web interactiva capaz de ofrecer conversaciones naturales con personajes ficticios utilizando Inteligencia Artificial, manteniendo una separación clara entre la interfaz, la lógica de conversación y la integración con Google Gemini.
          </p>

          <p>
            HeroVerse busca demostrar cómo una SPA moderna puede combinar selección dinámica de personajes, conversaciones independientes, manejo de estados, navegación mediante History API, consumo seguro de servicios externos y una experiencia responsive en una única aplicación.
          </p>

          <p>
            La integración con Gemini se realiza exclusivamente desde una Serverless Function en Vercel. De esta manera, la clave privada permanece en el servidor y el frontend solamente se comunica con el endpoint interno de HeroVerse.
          </p>
        </article>

        <!-- ==================================================
             TECNOLOGÍAS
        =================================================== -->
        <article class="about-card about-card--stack">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">⚙</span>
            <span class="about-card__eyebrow">TECH STACK</span>
          </div>

          <h3>Tecnologías utilizadas</h3>

          <p>
            HeroVerse fue construido con tecnologías web modernas y herramientas orientadas al desarrollo, testing, Inteligencia Artificial y deployment. Puedes seleccionar cada tecnología para consultar su documentación o recurso oficial.
          </p>

          <ul class="tech-grid">
            <li class="tech-chip">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>HTML5</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>CSS3 · Mobile First</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>JavaScript ES Modules</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/History_API"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>History API · SPA</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Fetch API</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip tech-chip--accent">
              <a
                href="https://ai.google.dev/gemini-api/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Google Gemini API</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://vercel.com/docs/functions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Vercel Functions</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://vitest.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Vitest</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>

            <li class="tech-chip">
              <a
                href="https://github.com/jhonfy3320/HeroVerse-AI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Git & GitHub · Repositorio</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </article>

        <!-- ==================================================
             ARQUITECTURA
        =================================================== -->
        <article class="about-card about-card--architecture">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">◫</span>
            <span class="about-card__eyebrow">ARCHITECTURE</span>
          </div>

          <h3>Arquitectura modular</h3>

          <p>
            HeroVerse utiliza una arquitectura dividida por responsabilidades. Las vistas construyen la interfaz, el Router controla la navegación SPA, el Store mantiene el estado y los historiales independientes, los Controllers coordinan las interacciones y los Services administran la comunicación con el backend.
          </p>

          <p>
            Cuando el usuario envía un mensaje, el frontend prepara el historial del personaje activo y lo envía a <strong>/api/chat</strong>. La Serverless Function valida la solicitud, identifica el personaje, aplica su system prompt y posteriormente realiza la petición a Google Gemini.
          </p>

          <div class="architecture-flow">
            <span>Views</span>
            <span aria-hidden="true">→</span>
            <span>Router</span>
            <span aria-hidden="true">→</span>
            <span>Store</span>
            <span aria-hidden="true">→</span>
            <span>Services</span>
            <span aria-hidden="true">→</span>
            <span>Serverless API</span>
            <span aria-hidden="true">→</span>
            <span>Gemini</span>
          </div>
        </article>

        <!-- ==================================================
             PERSONAJES
        =================================================== -->
        <article class="about-card about-card--characters">
          <div class="about-card__top">
            <span class="about-card__icon" aria-hidden="true">🦸</span>
            <span class="about-card__eyebrow">CHARACTERS</span>
          </div>

          <h3>Personajes disponibles</h3>

          <p>
            Cada personaje dispone de una identidad propia, descripción visual y system prompt independiente. Esta separación permite que las respuestas cambien de tono, vocabulario y enfoque según la identidad seleccionada.
          </p>

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

          <ul class="character-profile-list">
            ${characterProfiles}
          </ul>
        </article>

        <!-- ==================================================
             AUTOR
        =================================================== -->
        <article class="about-card about-card--author">
          <div class="author-mark">FT</div>

          <div class="author-content">
            <span class="about-card__eyebrow">BUILT BY</span>

            <h3>Freddy Tavera</h3>

            <p>
              Proyecto desarrollado como parte del proceso de formación en Ingeniería Informática y desarrollo Full Stack, integrando conceptos de arquitectura frontend, APIs, testing, deployment e Inteligencia Artificial generativa.
            </p>

            <a
              class="about-inline-link"
              href="https://github.com/jhonfy3320/HeroVerse-AI"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver código fuente en GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="author-project">
            <span>HERO</span>
            <strong>VERSE AI</strong>
          </div>
        </article>
      </div>
    </section>
  `;
}