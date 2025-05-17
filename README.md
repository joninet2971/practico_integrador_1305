# Sistema de Gestión - Práctica Integradora (Dockerizado)

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx" />
</div>

## 📋 Descripción

Este sistema de gestión es una aplicación full-stack que permite administrar usuarios y productos. Desarrollado como práctica integradora para el curso de Programación 3, implementa operaciones CRUD completas con una interfaz atractiva y moderna. La aplicación ha sido completamente dockerizada para facilitar su despliegue y ejecución.

## ✨ Características

- **Interfaz moderna** con Bootstrap y FontAwesome
- **Gestión de usuarios** completa (crear, ver, editar, eliminar)
- **Gestión de productos** completa (crear, ver, editar, eliminar)
- **Exportación a PDF** de listados
- **Validación de formularios**
- **Diseño responsive** adaptable a todos los dispositivos
- **Mensajes informativos** claros al usuario
- **Containerizado con Docker** para facilitar despliegue y desarrollo
- **Persistencia de datos** mediante volúmenes de Docker
- **Servidor web Nginx** para servir la aplicación frontend

## 🛠️ Tecnologías utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **CORS** - Middleware para habilitar CORS
- **JSON** - Almacenamiento de datos
- **Docker** - Containerización

### Frontend
- **React** - Biblioteca para construir interfaces
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap** - Framework CSS
- **FontAwesome** - Iconos vectoriales
- **Formik y Yup** - Manejo y validación de formularios
- **Nginx** - Servidor web para producción
- **Docker** - Containerización

### Infraestructura
- **Docker Compose** - Orquestación de contenedores
- **Volúmenes Docker** - Persistencia de datos

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
│   ├── index.js            # Punto de entrada del servidor
│   └── Dockerfile          # Configuración para contenedor Backend
│
├── frontend/               # Aplicación React
│   ├── public/             # Archivos públicos
│   ├── src/                # Código fuente
│   │   ├── context/        # Contextos para estado global
│   │   │   ├── ProductoContext.jsx
│   │   │   └── UsuarioContext.jsx
│   │   ├── products/       # Componentes para productos
│   │   │   ├── ProductoForm.jsx
│   │   │   ├── ProductoView.jsx
│   │   │   └── index.jsx
│   │   ├── usuarios/       # Componentes para usuarios
│   │   │   ├── UsuarioForm.jsx
│   │   │   ├── UsuarioView.jsx
│   │   │   └── index.jsx
│   │   ├── utils/          # Utilidades
│   │   │   └── ExportToPdf.js
│   │   ├── App.jsx         # Componente principal
│   │   └── index.js        # Punto de entrada
│   ├── nginx.conf          # Configuración de Nginx
│   └── Dockerfile          # Configuración para contenedor Frontend
│
└── docker-compose.yml      # Configuración de Docker Compose
```

## ⚙️ Instalación y ejecución

### Requisitos previos
- Docker
- Docker Compose

### Ejecución con Docker Compose

Para iniciar toda la aplicación con un solo comando:

```bash
# En la raíz del proyecto donde está el archivo docker-compose.yml
docker-compose up -d
```

Esto creará y ejecutará los siguientes contenedores:
- **Backend**: API Node.js en Express disponible en http://localhost:4000
- **Frontend**: Aplicación React servida por Nginx disponible en http://localhost

### Detener la aplicación

```bash
docker-compose down
```

### Reconstruir contenedores después de cambios

```bash
docker-compose down && docker-compose up -d --build
```

### Verificar logs

```bash
# Ver los logs del backend
docker logs backend

# Ver los logs del frontend
docker logs frontend
```

### Persistencia de datos

La aplicación utiliza un volumen Docker (`db_data`) para asegurar que los datos persistan incluso si los contenedores se detienen o se eliminan.

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
![Gestión de Usuarios](https://i.postimg.cc/tghny5n2/Pasted-image.png)

### Gestión de Productos
![Gestión de Productos](https://i.postimg.cc/xC5kN1Rm/Pasted-image-2.png)

### Formularios
![Formularios](https://i.postimg.cc/prdmfMG6/Pasted-image-3.png)


## 🧑‍💻 Autor

Desarrollado como práctica integradora para el curso de Programación 3.

---

<div align="center">
  <p>Hecho con React + Express + Docker</p>
</div>
