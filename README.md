
# BidFinder - Frontend

Este repositorio contiene el código fuente de la interfaz de usuario para **BidFinder**, la plataforma que permite visualizar subastas del BOE geolocalizadas y procesadas por IA.

El objetivo de esta aplicación es ofrecer una experiencia de usuario fluida (SPA), permitiendo la búsqueda interactiva mediante mapas, filtrado avanzado y visualización detallada de los datos servidos por nuestra API.

---

## 1. Stack Tecnológico y Calidad de Código

Para mantener la consistencia y calidad en el equipo, utilizamos las siguientes herramientas obligatorias:

* **Runtime:** Node.js (versión 22).
* **Build Tool:** **Vite** (v5++).
* **Framework/Librería:** **React** (v19.1).
* **Lenguaje:** **TypeScript** (Tipado estático para evitar errores en tiempo de ejecución).
* **Linting & Formatting:**
* **ESLint:** Configurado para React + TypeScript.
* **Prettier:** Para unificar el formato visual (comillas, espacios, etc.).
* **Husky:** Hooks de Git que ejecutan el linter antes de cada commit (`pre-commit`) para asegurar que no se sube código "sucio".

---
## 2. Convenciones de Código (Coding Standards)

Es fundamental seguir estas reglas para que el código sea uniforme entre todos los desarrolladores:

### 2.1 Definición de Variables y Tipos

* Usa **`const`** por defecto para todo.
* Usa **`let`** únicamente si la variable va a cambiar de estado (aunque preferimos `useState`).
* Utiliza **Interfaces** de TypeScript para definir la forma de los datos (Props, Modelos API).

### 2.2 Módulos e Importaciones

* Utilizamos **ES Modules** (estándar en Vite).
* ✅ `import { AuctionCard } from './components/AuctionCard';`
* ✅ `export const useAuctions = ...;`
* Orden de imports: Primero librerías externas (React, Router), luego componentes internos, luego estilos/assets.

### 2.3 Asincronía

* Usa siempre **`async` / `await**` para llamadas a la API dentro de los `useEffect` o manejadores de eventos.
* Gestiona los estados de carga (`isLoading`) y error (`isError`) en la interfaz.

### 2.4 Naming Conventions (Nombres)

| Elemento | Convención | Ejemplo |
| --- | --- | --- |
| **Componentes (Archivos y Funciones)** | `PascalCase` | `AuctionCard.tsx`, `NavBar.tsx` |
| **Variables y Funciones (Hooks/Utils)** | `camelCase` | `getUserProfile`, `formatDate` |
| **Custom Hooks** | `camelCase` (prefijo `use`) | `useFetchAuctions.ts`, `useAuth.ts` |
| **Interfaces y Tipos** | `PascalCase` | `AuctionProps`, `UserResponse` |
| **Constantes Globales** | `UPPER_SNAKE_CASE` | `MAX_MAP_ZOOM`, `API_BASE_URL` |
| **Estilos / Assets** | `snake_case` | `main_styles.css`, `logo_bidfinder.svg` |

---

## 3. Estructura del Proyecto


Organización por features (feature-sliced):

```text
src/
├─ assets/                # Imágenes, fuentes y archivos estáticos globales
├─ components/            # Componentes UI globales y layouts reutilizables
│  └─ layout/             # Navbar, Footer, Sidebar, etc. (globales)
│  └─ ui/                 # Botones, tarjetas, paginadores, etc. (globales)
├─ features/              # Cada feature tiene su propia carpeta con todo lo necesario
│  ├─ landing/            # Lógica, componentes y páginas de la landing
│  ├─ dashboard/          # Lógica y páginas del dashboard
│  ├─ map/                # Módulos de mapa, hooks, servicios, componentes
│  └─ subastas/           # Todo lo relacionado con subastas
├─ types/                 # Tipos globales de TypeScript
├─ utils/                 # Funciones auxiliares y formateadores globales
├─ App.tsx                # Componente raíz y configuración de rutas
└─ main.tsx               # Punto de entrada de Vite
```

### Descripción de carpetas principales:

* **`features/`**: Cada feature (ej: subastas, mapa, landing) contiene sus propios componentes, hooks, servicios y páginas. Así se reduce el acoplamiento y se mejora la escalabilidad.
* **`components/`**: Componentes UI y layouts globales, reutilizables en varias features (ej: Navbar, Footer, Button, Paginador).
* **`assets/`**: Imágenes, fuentes y archivos estáticos globales.
* **`types/`**: Tipos globales de TypeScript.
* **`utils/`**: Funciones auxiliares y formateadores globales.

> Para lógica, servicios o componentes exclusivos de una feature, siempre van dentro de la carpeta de esa feature.

---

## 4. Flujo de Trabajo (GitFlow + Scrum)

Trabajamos con una metodología ágil. El ciclo de vida de una funcionalidad es: **Análisis -> Implementación -> Pruebas -> Integración**.

### 4.1 Ramas Principales

* **`main`**: Código en producción. Estable.
* **`develop`**: Rama de integración. Aquí se mezclan las funcionalidades terminadas.

### 4.2 Pasos para desarrollar una funcionalidad

1. **Actualiza tu rama develop:**
```bash
git checkout develop
git pull origin develop

```


2. **Crea una rama para tu funcionalidad (Feature Branch):**
Usa el prefijo `feature/` seguido de una descripción corta en kebab-case.
```bash
git checkout -b feature/mapa-interactivo

```


3. **Desarrollo (Ciclo iterativo):**
* Implementa el componente/lógica siguiendo las convenciones.
* Asegúrate de tipar correctamente con TypeScript (evita el uso de `any`).
* *Commits:* Haz commits pequeños. Husky verificará el linter.


4. **Pruebas Locales:**
Asegúrate de que la aplicación compila y corre sin errores en la consola (`npm run dev`).
5. **Pull Request (Integración):**
* Sube tu rama: `git push origin feature/mapa-interactivo`.
* Abre un **Pull Request (PR)** hacia `develop`.
* **Code Review:** Otro compañero debe revisar tu código.


6. **Merge y CI/CD:**
Una vez aprobado, se hace merge a `develop`. Con cada integración a la rama develop se ejecutará el pipeline de CI/CD para asegurar la integridad.

---

## 5. Ejemplo de Código

Así debería ser un **Componente** (`src/components/AuctionCard.tsx`) siguiendo nuestras normas:

```tsx
import { useState } from 'react';
import { Auction } from '../types/Auction'; // Importar interfaz
import { formatDate } from '../utils/date_formatter';

// Definir las props con una interfaz
interface AuctionCardProps {
  auction: Auction;
  onViewDetails: (id: string) => void;
}

// Componente PascalCase
export const AuctionCard = ({ auction, onViewDetails }: AuctionCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div 
      className={`card ${isHovered ? 'shadow-lg' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{auction.title}</h3>
      <p>Precio: {auction.price} €</p>
      <span className="date">{formatDate(auction.closingDate)}</span>
      
      <button onClick={() => onViewDetails(auction.id)}>
        Ver Detalles
      </button>
    </div>
  );
};

```

---

## 6. Setup Local (Cómo arrancar)

1. **Clonar repositorio:**
```bash
git clone https://github.com/ORGANIZACION/bidfinder-frontend.git
cd bidfinder-frontend

```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Configurar entorno:**
Copia el archivo de ejemplo y configura la URL del backend.
```bash
cp .env.example .env

```


4. **Ejecutar en desarrollo:**
```bash
npm run dev

```

---

## 7. CI y despliegue en GitHub

Este repositorio ya incluye dos workflows de GitHub Actions:

* **CI:** `.github/workflows/ci.yml`
  * Se ejecuta en `push` y `pull_request` a `main`.
  * Instala dependencias con `npm ci` y compila con `npm run build`.

* **Deploy Pages:** `.github/workflows/deploy-pages.yml`
  * Se ejecuta en cada `push` a `main`.
  * Compila y publica `dist/` en GitHub Pages.

### Activar despliegue en GitHub Pages

1. Sube el repo a GitHub (si aun no esta publicado).
2. En GitHub, ve a `Settings > Pages`.
3. En `Build and deployment`, selecciona `Source: GitHub Actions`.
4. Haz push a `main` y el workflow `Deploy To GitHub Pages` publicara la web.

### Comandos utiles

```bash
# desarrollo
npm run dev

# build local (igual que CI)
npm run build
```
