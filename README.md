# BotSports Frontend

Este proyecto es el frontend de **BotSports**, una plataforma para gestionar ligas y bots que compiten entre sí. Está desarrollado con **Vue 3**, **Vite** y utiliza **TailwindCSS** para el diseño.

## Características

- **Gestión de Ligas**: Crea, visualiza y administra ligas.
- **Gestión de Bots**: Crea y personaliza bots para competir en las ligas.
- **Autenticación**: Inicio de sesión y registro de usuarios.

## Estructura del Proyecto

```plaintext
.editorconfig
.gitattributes
.gitignore
.prettierrc.json
env.d.ts
eslint.config.ts
index.html
LICENSE
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
.vscode/
public/
src/
├── assets/
├── components/
├── router/
├── store/
├── views/
└── main.ts
```

### Principales Directorios

- **`src/views/`**: Contiene las páginas principales como `HomePage`, `LoginPage`, `LeaguePage`, etc.
- **`src/components/`**: Componentes reutilizables como `HeaderApp`, `FooterApp`, `DropDown`, etc.
- **`src/store/`**: Gestión del estado global con Pinia.
- **`src/router/`**: Configuración de las rutas de la aplicación.

## Requisitos Previos

- **Node.js**: Versión 16 o superior.
- **npm**: Versión 7 o superior.

## Instalación

1. Clona este repositorio:

   ```sh
   git clone https://github.com/tu-usuario/botsports-frontend.git
   cd botsports-frontend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

## Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila y minifica el proyecto para producción.
- **`npm run preview`**: Previsualiza la aplicación compilada.
- **`npm run lint`**: Ejecuta ESLint para analizar el código.
- **`npm run format`**: Formatea el código con Prettier.

## Configuración

### Variables de Entorno

Asegúrate de configurar las variables de entorno necesarias en el backend para que las rutas de la API funcionen correctamente. Actualmente, las rutas están configuradas para apuntar a `http://localhost:8080`.

## Tecnologías Utilizadas

- **Vue 3**: Framework principal para la interfaz de usuario.
- **Vite**: Herramienta de construcción rápida.
- **TailwindCSS**: Framework de diseño para estilos rápidos y consistentes.
- **Pinia**: Gestión del estado global.
- **SweetAlert2**: Alertas personalizadas.