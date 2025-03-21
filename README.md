# Bigotes Pizzería Artesanal Alemana 🍕

Bienvenido al repositorio de **Bigotes Pizzería Artesanal Alemana**, una aplicación web diseñada para mostrar el menú, la historia y los servicios de una pizzería artesanal con un toque alemán. Este proyecto está construido con **React** y **Tailwind CSS**, ofreciendo un diseño moderno y responsivo.

## 📖 Descripción del Proyecto

Bigotes Pizzería es una aplicación web que permite a los usuarios:
- Explorar el menú de pizzas artesanales.
- Conocer la historia y la pasión detrás de la pizzería.
- Ver una galería de imágenes y un video sobre el arte de hacer pizzas.
- Contactar al restaurante a través de un formulario y encontrar su ubicación en un mapa.

El proyecto incluye:
- Un diseño responsivo con modo claro y oscuro.
- Componentes reutilizables como un header sticky, un carrusel de imágenes y un formulario de contacto.
- Integración de Google Fonts (Roboto y Lobster) para un estilo tipográfico único.
- Un video embebido de YouTube para mostrar el proceso de creación de pizzas.

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 16 o superior): Descárgalo desde [nodejs.org](https://nodejs.org/).
- **npm** o **yarn**: npm viene con Node.js, pero puedes instalar yarn con `npm install -g yarn` si lo prefieres.
- **Git**: Para clonar el repositorio. Descárgalo desde [git-scm.com](https://git-scm.com/).

## 🚀 Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/FedericoChalaca/Bigotes-pizzeria.git
Navega al directorio del proyecto:
bash

Contraer

Ajuste

Copiar
cd Bigotes-pizzeria
Instala las dependencias:
Si usas npm:
bash

Contraer

Ajuste

Copiar
npm install
O si usas yarn:
bash

Contraer

Ajuste

Copiar
yarn install
Configura las fuentes de Google Fonts (si no están incluidas):
Asegúrate de que el archivo public/index.html incluya el enlace:
html

Contraer

Ajuste

Copiar
<link href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
🏃‍♂️ Ejecución del Proyecto
Inicia el servidor de desarrollo:
Si usas npm:
bash

Contraer

Ajuste

Copiar
npm start
O si usas yarn:
bash

Contraer

Ajuste

Copiar
yarn start
Abre el proyecto en tu navegador:
Visita http://localhost:3000 (o el puerto indicado en la terminal).
🛠️ Estructura del Proyecto
text

Contraer

Ajuste

Copiar
Bigotes-pizzeria/
├── public/              # Archivos públicos (index.html, favicon, etc.)
├── src/                 # Código fuente
│   ├── components/      # Componentes reutilizables
│   │   ├── Layout.tsx   # Componente de diseño general (header, footer)
│   │   └── Home.tsx     # Página principal
│   ├── index.css        # Estilos globales (incluye Tailwind CSS y Google Fonts)
│   └── App.tsx          # Componente raíz de la aplicación
├── package.json         # Dependencias y scripts
├── tailwind.config.js   # Configuración de Tailwind CSS
└── README.md            # Este archivo
🎨 Tecnologías Utilizadas
React: Biblioteca para construir interfaces de usuario.
TypeScript: Para un desarrollo más seguro y tipado.
Tailwind CSS: Framework de estilos para un diseño moderno y responsivo.
React Router: Para la navegación entre páginas.
React Slick: Para el carrusel de imágenes en la galería.
Google Fonts: Fuentes personalizadas (Roboto y Lobster).
Lucide React: Iconos utilizados en el header y footer.
