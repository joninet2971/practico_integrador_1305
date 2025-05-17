# Sistema de Gestión - Práctica Integradora

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
</div>

## 📋 Descripción

Este sistema de gestión es una aplicación full-stack que permite administrar usuarios y productos. Desarrollado como práctica integradora para el curso de Programación 3, implementa operaciones CRUD completas con una interfaz atractiva y moderna.

## ✨ Características

- **Interfaz moderna** con Bootstrap y FontAwesome
- **Gestión de usuarios** completa (crear, ver, editar, eliminar)
- **Gestión de productos** completa (crear, ver, editar, eliminar)
- **Exportación a PDF** de listados
- **Validación de formularios**
- **Diseño responsive** adaptable a todos los dispositivos
- **Mensajes informativos** claros al usuario

## 🛠️ Tecnologías utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **CORS** - Middleware para habilitar CORS
- **JSON** - Almacenamiento de datos

### Frontend
- **React** - Biblioteca para construir interfaces
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap** - Framework CSS
- **FontAwesome** - Iconos vectoriales
- **Formik y Yup** - Manejo y validación de formularios

## 📂 Estructura del proyecto

```
practico_integrador_1305/
├── backend/                # Servidor Node.js
│   ├── controllers/        # Controladores de la API
│   │   ├── productos.controllers.js
│   │   └── usuarios.controllers.js
│   ├── routes/             # Definición de rutas
│   │   ├── productos.routes.js
│   │   └── usuarios.routes.js
│   ├── db/                 # Base de datos JSON
│   └── index.js            # Punto de entrada del servidor
│
└── frontend/               # Aplicación React
    ├── public/             # Archivos públicos
    └── src/                # Código fuente
        ├── context/        # Contextos para estado global
        │   ├── ProductoContext.jsx
        │   └── UsuarioContext.jsx
        ├── products/       # Componentes para productos
        │   ├── ProductoForm.jsx
        │   ├── ProductoView.jsx
        │   └── index.jsx
        ├── usuarios/       # Componentes para usuarios
        │   ├── UsuarioForm.jsx
        │   ├── UsuarioView.jsx
        │   └── index.jsx
        ├── utils/          # Utilidades
        │   └── ExportToPdf.js
        ├── App.jsx         # Componente principal
        └── index.js        # Punto de entrada
```

## ⚙️ Instalación y ejecución

### Requisitos previos
- Node.js (v14 o superior)
- npm o yarn

### Backend

```bash
# Navega al directorio del backend
cd backend

# Instala las dependencias
npm install

# Inicia el servidor en modo desarrollo
npm run dev
```

El servidor estará disponible en http://localhost:4000

### Frontend

```bash
# Navega al directorio del frontend
cd frontend

# Instala las dependencias
npm install

# Inicia la aplicación React
npm start
```

La aplicación estará disponible en http://localhost:3000

## 🚀 Endpoints API

### Usuarios
- `GET /usuarios` - Obtener todos los usuarios
- `GET /usuarios/:id` - Obtener un usuario por ID
- `POST /usuarios` - Crear un nuevo usuario
- `PUT /usuarios/:id` - Actualizar un usuario
- `DELETE /usuarios/:id` - Eliminar un usuario

### Productos
- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener un producto por ID
- `POST /productos` - Crear un nuevo producto
- `PUT /productos/:id` - Actualizar un producto
- `DELETE /productos/:id` - Eliminar un producto

## 📱 Capturas de pantalla

### Gestión de Usuarios
![Gestión de Usuarios](https://via.placeholder.com/800x400?text=Gesti%C3%B3n+de+Usuarios)

### Gestión de Productos
![Gestión de Productos](https://via.placeholder.com/800x400?text=Gesti%C3%B3n+de+Productos)

### Formularios
![Formularios](https://via.placeholder.com/800x400?text=Formularios)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 🧑‍💻 Autor

Desarrollado como práctica integradora para el curso de Programación 3.

---

<div align="center">
  <p>Hecho con ❤️ y React + Express</p>
</div>
