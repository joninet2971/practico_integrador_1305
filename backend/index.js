const express = require('express')
const cors = require('cors')

const app = express()

const port = 4000

// Habilitar CORS para todas las rutas
app.use(cors())

// Middleware para procesar JSON
app.use(express.json())

const usuariosRoutes= require('./routes/usuarios.routes')
app.use('/usuarios', usuariosRoutes)

const productosRoutes= require('./routes/productos.routes')
app.use('/productos', productosRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
