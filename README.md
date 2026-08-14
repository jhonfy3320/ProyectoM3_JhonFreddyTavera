# 🚀 HeroVerse AI

> **Single Page Application (SPA) de conversaciones con personajes ficticios mediante Google Gemini AI**

HeroVerse AI es una aplicación web interactiva desarrollada como proyecto integrador del módulo Full Stack Developer.

La aplicación permite al usuario mantener conversaciones con personajes ficticios utilizando Inteligencia Artificial generativa mediante **Google Gemini AI**.

El proyecto fue desarrollado siguiendo una arquitectura modular basada en responsabilidades separadas entre vistas, componentes, estado, lógica de negocio, servicios y backend serverless.

---

## 🌐 Aplicación desplegada

### 🚀 Demo

**Aplicación en producción:**

https://hero-verse-ai.vercel.app

### 📦 Repositorio

https://github.com/jhonfy3320/HeroVerse-AI

---

# 🎯 Objetivo del proyecto

El objetivo principal de HeroVerse AI es construir una **Single Page Application responsive** capaz de integrar una API de Inteligencia Artificial de manera segura.

El proyecto busca demostrar conocimientos en:

- Desarrollo frontend.
- JavaScript moderno.
- Arquitectura SPA.
- History API.
- Routing.
- Gestión de estado.
- Programación asíncrona.
- Fetch API.
- Consumo de APIs.
- Transformación de datos JSON.
- Prompt Engineering.
- Integración con Google Gemini.
- Serverless Functions.
- Seguridad de API Keys.
- Testing unitario.
- Diseño responsive.
- Deployment en Vercel.

---

# 🧠 Descripción de HeroVerse AI

HeroVerse AI permite seleccionar diferentes personajes y conversar con ellos mediante Inteligencia Artificial.

Cada personaje posee:

- Nombre.
- Imagen.
- Descripción.
- Personalidad.
- System Prompt propio.

Esto permite que cada personaje responda de acuerdo con su personalidad y estilo de comunicación.

Actualmente la aplicación cuenta con tres personajes:

1. Sherlock Holmes
2. Capitán América
3. Jack Sparrow

---

# 🕵️ Personajes disponibles

## Sherlock Holmes

Sherlock Holmes es un detective consultor caracterizado por:

- Extraordinaria capacidad de observación.
- Deducción lógica.
- Pensamiento analítico.
- Inteligencia.
- Lenguaje elegante y preciso.
- Seguridad intelectual.

Su System Prompt está diseñado para mantener una personalidad lógica, analítica y deductiva durante la conversación.

---

## 🛡️ Capitán América

El Capitán América representa un personaje caracterizado por:

- Liderazgo.
- Disciplina.
- Valentía.
- Responsabilidad.
- Respeto.
- Justicia.

Su System Prompt orienta a Gemini para responder de manera honorable, responsable y orientada al liderazgo.

---

## 🏴‍☠️ Jack Sparrow

Jack Sparrow posee una personalidad caracterizada por:

- Astucia.
- Improvisación.
- Humor.
- Ironía.
- Imprevisibilidad.
- Carisma.

Su System Prompt busca mantener un estilo de comunicación humorístico, irónico e impredecible.

---
# 🦸 HeroVerse AI

> Single Page Application (SPA) de conversaciones con personajes ficticios utilizando Inteligencia Artificial generativa mediante Google Gemini AI.

---

## 🚀 Aplicación desplegada

🌐 **Demo:**  
https://hero-verse-ai.vercel.app

📦 **Repositorio:**  
https://github.com/jhonfy3320/HeroVerse-AI

HeroVerse AI es una aplicación web desarrollada como una **Single Page Application (SPA)** que permite a los usuarios mantener conversaciones con personajes ficticios mediante Inteligencia Artificial generativa.

El proyecto integra un frontend moderno desarrollado con **HTML, CSS y JavaScript**, una arquitectura basada en módulos, gestión de estado, routing mediante History API, consumo de APIs mediante `fetch()` y una **Vercel Serverless Function** encargada de comunicarse de forma segura con Google Gemini.

Como funcionalidad adicional al alcance mínimo, HeroVerse AI incorpora un sistema de **múltiples personajes**, permitiendo seleccionar entre:

- 🕵️ Sherlock Holmes
- 🛡️ Capitán América
- 🏴‍☠️ Jack Sparrow

Cada personaje posee su propia personalidad y `System Prompt`, permitiendo que las respuestas de Gemini mantengan un estilo diferente según el personaje seleccionado.

---

# 🎯 Objetivos del proyecto

Los principales objetivos de HeroVerse AI fueron:

- Diseñar una interfaz responsive utilizando metodología **Mobile First**.
- Aplicar **Flexbox, CSS Grid y Media Queries**.
- Construir una **Single Page Application**.
- Implementar navegación mediante **History API**.
- Crear las vistas `Home`, `Chat` y `About`.
- Gestionar operaciones asíncronas utilizando `Promises`, `async/await` y `fetch`.
- Transformar y normalizar respuestas provenientes de una API.
- Implementar un sistema de conversación con contexto.
- Diseñar `System Prompts` específicos para cada personaje.
- Integrar Google Gemini AI.
- Mantener la API Key fuera del frontend.
- Utilizar una **Vercel Serverless Function** como proxy seguro.
- Implementar manejo de errores HTTP.
- Implementar pruebas unitarias utilizando **Vitest**.
- Mockear las peticiones para evitar consumir Gemini durante los tests.
- Desplegar la aplicación en Vercel.
- Utilizar Inteligencia Artificial como herramienta de desarrollo y aprendizaje.

---

# ✨ Funcionalidades implementadas

## 🧭 Navegación SPA

La aplicación utiliza navegación sin recarga mediante History API.

Rutas principales:

```text
/home
/chat
/about

## 🚀 Demo

https://hero-verse-ai.vercel.app

## 📦 Repositorio

https://github.com/jhonfy3320/HeroVerse-AI

---

# 🛠️ Instalación

## Requisitos

- Node.js 22+
- npm
- Git
- Vercel CLI
- API Key de Google Gemini

## Clonar el proyecto

```bash
git clone https://github.com/jhonfy3320/HeroVerse-AI.git
cd HeroVerse-AI

# 🏗️ Arquitectura del proyecto
HeroVerse AI utiliza una arquitectura modular para separar responsabilidades.

```text
HeroVerse-AI/
│
├── api/
│   └── chat.js
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── characters/
│   │   ├── characters.js
│   │   └── CharacterSelector.js
│   │
│   ├── components/
│   │   └── MessageBubble.js
│   │
│   ├── engine/
│   │   ├── chatController.js
│   │   ├── chatEngine.js
│   │   └── chatStore.js
│   │
│   ├── router/
│   │   └── router.js
│   │
│   ├── services/
│   │   └── geminiService.js
│   │
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── characters.css
│   │
│   ├── ui/
│   │   └── chatRenderer.js
│   │
│   ├── views/
│   │   ├── homeView.js
│   │   ├── chatView.js
│   │   └── aboutView.js
│   │
│   └── main.js
│
├── tests/
│   ├── characters.test.js
│   ├── chatStore.test.js
│   └── geminiService.test.js
│
├── .env.local
├── .gitignore
├── package.json
├── vite.config.js
└── README.md