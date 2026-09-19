# 🦸 HeroVerse AI

> **Single Page Application conversacional con múltiples personajes impulsados por Google Gemini AI.**

HeroVerse AI es una aplicación web interactiva desarrollada como proyecto integrador de **Full Stack Development**. Combina desarrollo frontend moderno, arquitectura modular, gestión de estado, navegación SPA, testing automatizado, Serverless Functions e Inteligencia Artificial generativa.

La aplicación permite seleccionar entre distintos personajes y mantener conversaciones independientes con cada uno. Cada personaje posee su propia identidad, descripción, comportamiento y `System Prompt`, de modo que Google Gemini adapta sus respuestas al personaje seleccionado.

---

## 🌐 Aplicación

### 🚀 Demo en producción

**HeroVerse AI**

https://hero-verse-ai.vercel.app/

### 📊 Enlace de evaluación con UTM

https://hero-verse-ai.vercel.app/?utm_source=github&utm_medium=readme&utm_campaign=heroverse_ai

### 📦 Repositorio

https://github.com/jhonfy3320/HeroVerse-AI

---

<a id="tabla-de-contenidos"></a>

## 📌 Tabla de contenidos

- [Descripción](#descripcion)
- [Objetivos del proyecto](#objetivos)
- [Funcionalidades principales](#funcionalidades)
- [Personajes disponibles](#personajes)
- [Arquitectura](#arquitectura)
- [Flujo de conversación](#flujo-conversacion)
- [Tecnologías utilizadas](#tecnologias)
- [Integración con Google Gemini](#gemini)
- [Seguridad y privacidad](#seguridad)
- [Routing SPA](#routing)
- [Testing](#testing)
- [Estructura del proyecto](#estructura)
- [Instalación](#instalacion)
- [Variables de entorno](#variables-entorno)
- [Ejecución local](#ejecucion)
- [Scripts disponibles](#scripts)
- [Build de producción](#build)
- [Deployment en Vercel](#deployment)
- [Decisiones de arquitectura](#decisiones-arquitectura)
- [Design System](#design-system)
- [Recursos relacionados](#recursos)
- [Autor](#autor)
- [Nota sobre los personajes](#nota-personajes)
- [Estado del proyecto](#estado-proyecto)

---

<a id="descripcion"></a>

# 🧠 Descripción

**HeroVerse AI** es una Single Page Application que permite mantener conversaciones con personajes ficticios mediante Inteligencia Artificial generativa.

El proyecto fue diseñado para demostrar cómo una aplicación frontend moderna puede integrarse de forma segura con una API de Inteligencia Artificial, manteniendo una arquitectura organizada y responsabilidades claramente separadas.

La experiencia se apoya en tres principios principales:

1. **Identidad propia por personaje.**
2. **Contexto de conversación independiente.**
3. **Integración segura con Google Gemini.**

Cada personaje cuenta con:

- Identificador único.
- Nombre.
- Imagen.
- Descripción.
- Personalidad.
- Identidad visual.
- `System Prompt`.
- Historial de conversación independiente.

Por lo tanto, cambiar de personaje no representa únicamente un cambio visual: también modifica el comportamiento, el tono y el estilo de las respuestas generadas por la IA.

---

<a id="objetivos"></a>

# 🎯 Objetivos del proyecto

HeroVerse AI fue desarrollado para integrar en un mismo proyecto diferentes conceptos de desarrollo frontend, arquitectura web, Inteligencia Artificial, testing y deployment.

Los principales objetivos fueron:

- Construir una **Single Page Application**.
- Implementar navegación mediante **History API**.
- Crear las vistas `Home`, `Chat` y `About`.
- Diseñar una interfaz **responsive y Mobile First**.
- Utilizar **CSS Grid, Flexbox y Media Queries**.
- Crear un Design System propio.
- Implementar una arquitectura modular.
- Separar responsabilidades entre vistas, estado, servicios, controladores y backend.
- Gestionar conversaciones mediante estado en el frontend.
- Mantener historiales independientes por personaje.
- Restaurar el historial correspondiente al cambiar de personaje.
- Implementar programación asíncrona mediante `async/await`.
- Utilizar `fetch()` para comunicación HTTP.
- Integrar **Google Gemini API**.
- Diseñar `System Prompts` específicos por personaje.
- Mantener la API Key fuera del frontend.
- Implementar una **Vercel Serverless Function** como backend seguro.
- Validar y limitar las solicitudes enviadas a Gemini.
- Manejar errores HTTP de manera controlada.
- Implementar estados de error recuperables.
- Evitar problemas de concurrencia en el chat.
- Implementar pruebas automatizadas con **Vitest**.
- Utilizar mocks para probar Gemini sin consumir la API real.
- Preparar la aplicación para deployment en **Vercel**.
- Aplicar buenas prácticas de seguridad y privacidad.

---

<a id="funcionalidades"></a>

# ✨ Funcionalidades principales

## 🧭 Navegación SPA

HeroVerse utiliza **History API** para permitir navegación entre vistas sin recargar completamente la página.

Las rutas principales son:

```text
/home
/chat
/about
```

El router se encarga de:

-  Detectar la ruta actual. 
-  Renderizar la vista correspondiente. 
-  Actualizar la URL con `pushState()`. 
-  Responder a eventos `popstate`. 
-  Sincronizar el estado visual de la navegación. 
-  Gestionar `aria-current="page"` para accesibilidad. 
-  Mostrar una vista de error cuando la ruta no existe. 

---

## 🦸 Selección dinámica de personajes

La aplicación permite seleccionar el personaje con el que se desea conversar.

La selección determina:

-  Nombre mostrado. 
-  Avatar. 
-  Descripción. 
-  Identidad visual. 
-  Personalidad. 
- `System Prompt`. 
-  Historial activo. 

La información de los personajes se encuentra centralizada para evitar duplicaciones y mantener una única fuente de verdad.

---

## 💬 Conversaciones independientes

Una de las funcionalidades principales de HeroVerse es mantener un historial separado para cada personaje.

```
Sherlock Holmes
└── Conversación independiente

Capitán América
└── Conversación independiente

Jack Sparrow
└── Conversación independiente
```

Esto significa que el usuario puede:

1.  Conversar con Sherlock Holmes. 
2.  Cambiar al Capitán América. 
3.  Iniciar una conversación diferente. 
4.  Regresar posteriormente a Sherlock. 
5.  Recuperar el contexto que tenía con ese personaje. 

Las conversaciones no se mezclan entre personajes.

---

## 🧠 Personalidades mediante System Prompts

HeroVerse no utiliza un único asistente genérico.

Cada personaje posee instrucciones específicas que son enviadas a Google Gemini desde el backend.

Los `System Prompts` permiten modificar:

-  Tono. 
-  Vocabulario. 
-  Forma de razonar. 
-  Estilo de comunicación. 
-  Personalidad. 
-  Comportamiento esperado. 

---

## ⚡ Control de concurrencia

HeroVerse controla las solicitudes realizadas al modelo para evitar respuestas fuera de orden.

Mientras existe una solicitud pendiente:

-  No se inicia una segunda petición simultánea. 
-  La respuesta permanece asociada al personaje que originó la solicitud. 
-  Cambiar de personaje durante una petición no mezcla historiales. 

Esto protege la coherencia de la conversación.

---

## 🚨 Manejo recuperable de errores

Cuando Gemini o el backend producen un error:

-  Se elimina el indicador de escritura. 
-  El mensaje de error se muestra de forma segura. 
-  El error no se guarda dentro del historial. 
-  El usuario puede volver a intentar. 
-  La interfaz regresa a un estado utilizable. 
-  No se muestran detalles internos sensibles. 

---

## 📝 Composer responsive

El área de escritura fue diseñada para permitir mensajes largos de forma cómoda.

Incluye:

- `textarea` amplio. 
-  Altura adaptable. 
-  Scroll vertical cuando es necesario. 
-  Botón de envío integrado. 
-  Estados de foco accesibles. 
-  Diseño responsive. 
-  Adaptación específica para dispositivos móviles. 

---

## 🎨 Identidad visual dinámica

HeroVerse dispone de un Design System propio basado en una estética:

-  Dark AI Interface. 
-  Purple / Cyan. 
-  Aurora ambiental. 
-  Glassmorphism. 
-  Superficies jerarquizadas. 
-  Gradientes de marca. 
-  Glows. 
-  Animaciones ambientales. 
-  Responsive Design. 

Cada personaje mantiene además una identidad visual particular.

---

\<a id="personajes">\</a>

# 🕵️ Personajes disponibles

HeroVerse AI cuenta actualmente con tres personajes.

Cada uno posee:

-  Imagen propia. 
-  Descripción. 
-  Personalidad. 
- `System Prompt`. 
-  Acento visual. 
-  Historial independiente. 

---

## 🔍 Sherlock Holmes

**Perfil:** detective consultor brillante, observador y profundamente analítico.

Su personalidad se caracteriza por:

-  Inteligencia extraordinaria. 
-  Capacidad de observación. 
-  Razonamiento deductivo. 
-  Pensamiento lógico. 
-  Atención a los detalles. 
-  Lenguaje elegante y preciso. 
-  Seguridad intelectual. 

Su `System Prompt` orienta a Gemini para responder con un estilo lógico, analítico y deductivo.

---

## 🛡️ Capitán América

**Perfil:** héroe guiado por el liderazgo, la disciplina y un profundo sentido de responsabilidad.

Su personalidad se caracteriza por:

-  Liderazgo. 
-  Disciplina. 
-  Valentía. 
-  Responsabilidad. 
-  Respeto. 
-  Perseverancia. 
-  Justicia. 
-  Trabajo en equipo. 

Su `System Prompt` orienta a Gemini hacia una comunicación respetuosa, firme y basada en principios.

---

## 🏴‍☠️ Jack Sparrow

**Perfil:** capitán pirata carismático, astuto, ingenioso e impredecible.

Su personalidad se caracteriza por:

-  Astucia. 
-  Improvisación. 
-  Humor. 
-  Ironía. 
-  Carisma. 
-  Pensamiento poco convencional. 
-  Comportamiento impredecible. 

Su `System Prompt` busca que Gemini conserve un estilo humorístico, irónico y espontáneo.

---

\<a id="arquitectura">\</a>

# 🏗️ Arquitectura

HeroVerse utiliza una arquitectura modular orientada a separar responsabilidades.

## Responsabilidades principales

| Capa         | Responsabilidad                                  |
| ------------ | ------------------------------------------------ |
| `views`             | Construcción de Home, Chat y About              |
| `router`            | Navegación SPA                                  |
| `characters`        | Información, selección y prompts de personajes  |
| `engine`            | Estado y flujo de conversación                  |
| `components`        | Componentes reutilizables                       |
| `ui`                | Renderizado dinámico del chat                   |
| `services`          | Comunicación HTTP desde el frontend             |
| `api`               | Validación, seguridad y comunicación con Gemini |
| `styles`            | Design System, layout y estilos                 |

---

\<a id="flujo-conversacion">\</a>

# 🔄 Flujo de conversación

Cuando el usuario envía un mensaje ocurre el siguiente proceso:

```
Usuario
   ↓
Chat Controller
   ↓
Chat Store
   ↓
Chat Engine
   ↓
Gemini Service
   ↓
POST /api/chat
   ↓
Validación del payload
   ↓
Selección del System Prompt
   ↓
Google Gemini API
   ↓
Respuesta
   ↓
Gemini Service
   ↓
Chat Controller
   ↓
Chat Renderer
   ↓
Usuario
```

El navegador **no se comunica directamente con Google Gemini**.

La comunicación siempre pasa por el endpoint seguro:

```
/api/chat
```

---

\<a id="tecnologias">\</a>

# 🛠️ Tecnologías utilizadas

| Tecnología        | Uso dentro de HeroVerse              |
| ----------------- | ------------------------------------ |
| HTML5                             | Estructura semántica               |
| CSS3                              | Diseño, animaciones y responsive   |
| JavaScript                        | Lógica principal                   |
| ES Modules                        | Modularización del código          |
| Vite                              | Desarrollo y build                 |
| History API                       | Routing SPA                        |
| Fetch API                         | Comunicación HTTP                  |
| Google Gemini API                 | Inteligencia Artificial generativa |
| `@google/genai`                   | SDK utilizado para Gemini          |
| Vercel Functions                  | Backend serverless                 |
| Vitest                            | Testing automatizado               |
| Git                               | Control de versiones               |
| GitHub                            | Repositorio                        |
| Vercel                            | Hosting y deployment               |

## Dependencias principales

```
@google/genai
vite
vitest
```

---

## 🔗 Documentación de tecnologías

-  HTML
   [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 
-  CSS
   [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 
-  JavaScript
   [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 
-  JavaScript Modules
   [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 
-  History API
   [https://developer.mozilla.org/en-US/docs/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 
-  Fetch API
   [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 
-  Google Gemini API
   [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs) 
-  Vite
   [https://vite.dev/](https://vite.dev/) 
-  Vitest
   [https://vitest.dev/](https://vitest.dev/) 
-  Vercel Functions
   [https://vercel.com/docs/functions](https://vercel.com/docs/functions) 
-  Git
   [https://git-scm.com/](https://git-scm.com/) 
-  GitHub
   https://github.com/ 

---

\<a id="gemini">\</a>

# 🤖 Integración con Google Gemini

Google Gemini es el motor de Inteligencia Artificial generativa utilizado por HeroVerse.

La arquitectura utilizada es:

```
Frontend
   ↓
Gemini Service
   ↓
POST /api/chat
   ↓
Vercel Serverless Function
   ↓
Google Gemini API
```

La integración se realiza en el servidor utilizando:

```
import { GoogleGenAI } from "@google/genai";
```

La API Key nunca se incorpora al bundle del navegador.

---

## Payload enviado al backend

El frontend envía información con una estructura similar a:

```
{
  "characterId": "sherlock",
  "messages": [
    {
      "role": "user",
      "content": "Hola Sherlock"
    }
  ]
}
```

---

## Procesamiento en `/api/chat`

El endpoint:

1.  Comprueba el método HTTP. 
2.  Verifica la API Key. 
3.  Valida el `body`. 
4.  Valida `characterId`. 
5.  Comprueba que el personaje exista. 
6.  Valida el historial. 
7.  Comprueba los roles. 
8.  Valida el contenido. 
9.  Aplica límites de tamaño. 
10.  Obtiene el `System Prompt`. 
11.  Convierte el historial al formato requerido por Gemini. 
12.  Ejecuta la petición al modelo. 
13.  Normaliza la respuesta. 
14.  Devuelve el resultado al frontend. 

---

## Respuesta

El frontend recibe una estructura similar a:

```
{
  "role": "model",
  "content": "Respuesta generada por Gemini."
}
```

---

\<a id="seguridad">\</a>

# 🔐 Seguridad y privacidad

HeroVerse implementa diferentes controles para reducir riesgos en la integración con Google Gemini.

---

## API Key protegida

La credencial:

```
GEMINI_API_KEY
```

existe únicamente como variable de entorno del servidor.

Nunca debe declararse como:

```
VITE_GEMINI_API_KEY
```

porque las variables expuestas mediante Vite podrían incluirse en el código del frontend.

---

## Validación del endpoint

`/api/chat` verifica:

-  Método HTTP. 
-  Existencia del body. 
-  Tipo del body. 
-  Existencia de `characterId`. 
-  Tipo de `characterId`. 
-  Personajes permitidos. 
-  Existencia de `messages`. 
-  Tipo del historial. 
-  Historial vacío. 
-  Estructura de cada mensaje. 
-  Roles permitidos. 
-  Contenido vacío. 
-  Tamaño individual. 
-  Tamaño total. 

---

## Límites internos

El endpoint incorpora límites preventivos.

```
Máximo de mensajes:       50
Máximo por mensaje:       4000 caracteres
Máximo del contexto:      30000 caracteres
Máximo de salida Gemini:  800 tokens
```

Estos límites ayudan a controlar:

-  Payloads excesivos. 
-  Consumo innecesario. 
-  Uso abusivo. 
-  Respuestas excesivamente largas. 

---

## Privacidad

Las respuestas utilizan headers orientados a evitar almacenamiento innecesario:

```
Cache-Control: no-store
Pragma: no-cache
X-Content-Type-Options: nosniff
```

Además, el backend evita registrar deliberadamente:

-  Contenido de las conversaciones. 
-  Historial transformado. 
-  API Key. 
- `System Prompt`. 
-  Objetos completos de errores del SDK. 

---

## Rate limit y disponibilidad

HeroVerse maneja respuestas como:

```
429 Too Many Requests
503 Service Unavailable
```

Cuando corresponde, el backend incluye:

```
Retry-After
```

para indicar un tiempo de espera antes de intentar nuevamente.

---

## Renderizado seguro

Los mensajes del chat se procesan evitando insertar directamente HTML no confiable en el DOM.

Esto reduce riesgos asociados a contenido generado dinámicamente.

---

\<a id="routing">\</a>

# 🧭 Routing SPA

HeroVerse utiliza un router propio construido sobre **History API**.

Ejemplo conceptual:

```
history.pushState({}, "", "/chat");
```

El router también escucha:

```
popstate
```

para manejar los botones:

-  Atrás. 
-  Adelante. 

La navegación mantiene sincronizados:

-  Ruta actual. 
-  Vista activa. 
-  Clase visual `active`. 
- `aria-current="page"`. 

---

## SPA fallback

El proyecto incluye:

```
vercel.json
```

con configuración de rewrite para que las rutas de la SPA puedan resolverse mediante `index.html` en Vercel.

---

\<a id="testing">\</a>

# 🧪 Testing

HeroVerse utiliza **Vitest** para validar funcionalidades, arquitectura y configuración.

La suite cubre áreas como:

-  Definición de personajes. 
-  Selección de personajes. 
-  Historial independiente. 
-  Chat Store. 
-  Chat Engine. 
-  Chat Controller. 
-  Concurrencia. 
-  Restauración de conversaciones. 
-  Manejo recuperable de errores. 
-  Message Bubble. 
-  Seguridad del renderizado. 
-  Identidad dinámica. 
-  Chat Renderer. 
-  Chat View. 
-  Navegación SPA. 
-  Servicio de Gemini. 
-  API Chat. 
-  Validación del backend. 
-  Hardening del endpoint. 
-  Configuración de Vercel. 
-  Arquitectura CSS. 
-  Design System. 
-  Layout de contenido. 

Las solicitudes reales hacia Google Gemini son reemplazadas mediante **mocks** durante los tests.

Esto permite:

-  Evitar consumo de cuota. 
-  Ejecutar tests rápidamente. 
-  Simular errores HTTP. 
-  Crear pruebas deterministas. 
-  Probar escenarios de fallo. 

---

## Ejecutar toda la suite

```
npm test -- --run
```

---

## Ejecutar un archivo específico

```
npm test -- --run tests/apiChat.test.js
```

---

\<a id="estructura">\</a>

# 📁 Estructura del proyecto

```
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
│   │   └── characters/
│   │
│   ├── characters/
│   │   ├── CharacterSelector.js
│   │   ├── characterController.js
│   │   ├── characterPrompts.js
│   │   └── characters.js
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
│   ├── apiChat.test.js
│   ├── apiHardening.test.js
│   ├── characterIdentity.test.js
│   ├── characters.test.js
│   ├── chatConcurrency.test.js
│   ├── chatController.test.js
│   ├── chatEngine.test.js
│   ├── chatError.test.js
│   ├── chatRendererError.test.js
│   ├── chatRendererIdentity.test.js
│   ├── chatStore.test.js
│   ├── chatView.test.js
│   ├── contentLayout.test.js
│   ├── cssArchitecture.test.js
│   ├── designSystem.test.js
│   ├── geminiService.test.js
│   ├── messageBubble.test.js
│   ├── navigation.test.js
│   └── vercelConfig.test.js
│
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── README.md
```

---

\<a id="instalacion">\</a>

# ⚙️ Instalación

## Requisitos

Para ejecutar HeroVerse localmente se necesita:

-  Node.js. 
-  npm. 
-  Git. 
-  Una API Key válida de Google Gemini. 

---

## 1. Clonar el repositorio

```
git clone https://github.com/jhonfy3320/HeroVerse-AI.git
```

Entrar al proyecto:

```
cd HeroVerse-AI
```

---

## 2. Instalar dependencias

```
npm install
```

---

\<a id="variables-entorno">\</a>

# 🔑 Variables de entorno

Crea en la raíz del proyecto:

```
.env.local
```

Agrega:

```
GEMINI_API_KEY=tu_api_key_de_google_gemini
```

> **Importante:** nunca publiques una API Key real en GitHub.

El archivo `.env.local` debe permanecer excluido mediante `.gitignore`.

---

\<a id="ejecucion">\</a>

# ▶️ Ejecución local

Inicia Vite con:

```
npm run dev
```

La aplicación estará disponible normalmente en:

```
http://localhost:5173/
```

---

\<a id="scripts">\</a>

# 📜 Scripts disponibles

| Comando             | Descripción                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Inicia el servidor de desarrollo   |
| `npm run build`     | Genera el bundle de producción     |
| `npm run preview`   | Previsualiza el build              |
| `npm test`          | Ejecuta Vitest en modo interactivo |
| `npm test -- --run` | Ejecuta toda la suite una sola vez |

---

\<a id="build">\</a>

# 📦 Build de producción

Genera el build con:

```
npm run build
```

Los archivos optimizados se generan en:

```
dist/
```

Antes de publicar cambios se recomienda ejecutar:

```
npm test -- --run
npm run build
```

Ambos comandos deben finalizar correctamente.

---

\<a id="deployment">\</a>

# 🚀 Deployment en Vercel

HeroVerse está preparado para ser desplegado mediante **Vercel**.

## Variable requerida

Dentro de las variables de entorno del proyecto debe configurarse:

```
GEMINI_API_KEY
```

---

## Serverless Function

Vercel detecta:

```
/api/chat.js
```

como función backend.

El frontend realiza solicitudes a:

```
POST /api/chat
```

y esta función se comunica con Google Gemini.

---

## SPA fallback

El archivo:

```
vercel.json
```

contiene la configuración destinada a resolver rutas de la SPA mediante `index.html`.

---

## URL de producción

```
https://hero-verse-ai.vercel.app/
```

---

## URL con parámetros UTM

Para enlaces publicados desde GitHub puede utilizarse:

```
https://hero-verse-ai.vercel.app/?utm_source=github&utm_medium=readme&utm_campaign=heroverse_ai
```

Los parámetros representan:

```
utm_source   = github
utm_medium   = readme
utm_campaign = heroverse_ai
```

Esto permite identificar claramente el origen del enlace utilizado para acceder a la aplicación.

---

\<a id="decisiones-arquitectura">\</a>

# 🧩 Decisiones de arquitectura

## Estado separado por personaje

HeroVerse no utiliza un único historial global.

Cada personaje dispone de su propia conversación.

Esto evita uno de los problemas habituales en aplicaciones multipersonaje: mezclar mensajes entre identidades.

---

## Fuente única de personajes

La información principal de los personajes se centraliza en:

```
src/characters/characters.js
```

Esto permite reutilizar:

-  Nombre. 
-  Imagen. 
-  Descripción. 
-  Personalidad. 

sin mantener copias inconsistentes.

---

## Prompts separados

Las instrucciones enviadas a Gemini se gestionan mediante:

```
src/characters/characterPrompts.js
```

Cada `characterId` corresponde a un prompt específico.

---

## API intermedia

El frontend no conoce la API Key.

La comunicación sigue este patrón:

```
Frontend
↓
/api/chat
↓
Gemini
```

---

## Serialización de solicitudes

Mientras existe una respuesta pendiente se evita iniciar otra operación simultánea que pueda modificar incorrectamente el historial.

---

## Manejo recuperable de errores

Los errores se representan como estado temporal de UI y no como mensajes permanentes dentro de la conversación.

---

## DOM seguro

El contenido generado dinámicamente se procesa antes de insertarse en la interfaz.

---

## CSS modular

Los estilos se dividen según responsabilidad:

```
variables.css
layout.css
components.css
characters.css
```

Esto evita concentrar toda la presentación de la aplicación en un único archivo.

---

\<a id="design-system">\</a>

# 🎨 Design System

HeroVerse utiliza un Design System centralizado mediante Custom Properties de CSS.

El sistema define:

-  Colores principales. 
-  Colores secundarios. 
-  Colores semánticos. 
-  Superficies. 
-  Tipografías. 
-  Escala tipográfica. 
-  Espaciados. 
-  Bordes. 
-  Radios. 
-  Sombras. 
-  Gradientes. 
-  Glows. 
-  Transiciones. 
-  Estados de interacción. 
-  Colores específicos por personaje. 

---

## Identidad visual

La interfaz utiliza una combinación de:

```
Dark AI Interface
+
Purple
+
Cyan
+
Aurora ambiental
+
Glass surfaces
+
Character accents
```

Los personajes poseen acentos visuales diferenciados:

```
Sherlock Holmes
→ Cyan

Capitán América
→ Rojo / Azul

Jack Sparrow
→ Ámbar
```

Esto permite mantener una marca general HeroVerse sin perder la personalidad individual de cada personaje.

---

\<a id="recursos">\</a>

# 📚 Recursos relacionados

## Google Gemini

[https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)

## Vite

[https://vite.dev/](https://vite.dev/)

## Vitest

[https://vitest.dev/](https://vitest.dev/)

## Vercel

[https://vercel.com/](https://vercel.com/)

## MDN Web Docs

[https://developer.mozilla.org/](https://developer.mozilla.org/)

## Git

[https://git-scm.com/](https://git-scm.com/)

## Repositorio de HeroVerse AI

https://github.com/jhonfy3320/HeroVerse-AI

---

\<a id="autor">\</a>

# 👨‍💻 Autor

## Freddy Tavera

Estudiante de **Ingeniería Informática**, con formación orientada al desarrollo de software, desarrollo Full Stack, Data Science e Inteligencia Artificial.

HeroVerse AI fue desarrollado como proyecto académico y práctico para integrar conocimientos relacionados con:

-  Desarrollo frontend. 
-  Arquitectura de software. 
-  APIs. 
-  JavaScript moderno. 
-  Testing. 
-  Seguridad. 
-  Serverless Functions. 
-  Deployment. 
-  Inteligencia Artificial generativa. 

---

\<a id="nota-personajes">\</a>

# ⚠️ Nota sobre los personajes

HeroVerse AI es un proyecto académico, educativo y demostrativo.

Los nombres, imágenes e identidades de los personajes utilizados pertenecen a sus respectivos titulares.

Este proyecto no está afiliado, patrocinado ni respaldado oficialmente por los propietarios de dichas propiedades intelectuales.

---

\<a id="estado-proyecto">\</a>

# ✅ Estado del proyecto

Actualmente HeroVerse AI cuenta con:

-  ✅ Single Page Application. 
-  ✅ Navegación mediante History API. 
-  ✅ Home, Chat y About. 
-  ✅ Tres personajes. 
-  ✅ Selector dinámico. 
-  ✅ Personalidad independiente. 
-  ✅ `System Prompt` por personaje. 
-  ✅ Historial independiente. 
-  ✅ Restauración de conversaciones. 
-  ✅ Identidad dinámica en el chat. 
-  ✅ Control de concurrencia. 
-  ✅ Manejo recuperable de errores. 
-  ✅ Composer responsive. 
-  ✅ Renderizado seguro de mensajes. 
-  ✅ Integración con Google Gemini. 
-  ✅ API Key protegida. 
-  ✅ Serverless Function en Vercel. 
-  ✅ Validación estricta del endpoint. 
-  ✅ Límites internos del payload. 
-  ✅ Gestión de respuestas `429` y `503`. 
-  ✅ Headers de privacidad. 
-  ✅ SPA fallback configurado. 
-  ✅ Design System propio. 
-  ✅ Aurora visual y estilos por personaje. 
-  ✅ Diseño responsive. 
-  ✅ Suite de testing automatizado. 
-  ✅ Build de producción mediante Vite. 
-  ✅ Deployment preparado para Vercel. 
-  ✅ Documentación técnica completa. 

---

## 🏁 Quality Gate

Antes de considerar una versión lista para producción:

```
npm test -- --run
npm run build
git diff --check
```

Los tres procesos deben completarse correctamente.

---

<div align="center"> 

### 🦸 HeroVerse AI

**Heroes · Legends · Intelligence**

Built with JavaScript, Google Gemini AI and Vercel.

</div>
