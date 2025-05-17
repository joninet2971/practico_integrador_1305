const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../db/db.json')

const leerDB = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8')
        console.log("db", data);
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading database file:', error)
        return { usuarios: [], productos: [] }
    }
}

const guardarDB = (db) => {
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8')
}

let db = leerDB()

// Get all Usuarios
const getProductos = (req, res) => {
  db = leerDB() // Refresh data from file
  res.json(db.productos);
}

// get usuario by id
const getProductoById = (req, res) => {
    const id = parseInt(req.params.id); // Convertir a número
    db = leerDB() // Refresh data from file
    const producto = db.productos.find((producto) => producto.id === id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  }

// Create a new Usuario
const createProducto = (req, res) => {
    db = leerDB() 
    const newProducto = req.body;
    const productoDuplicado = db.productos.find((producto) => producto.nombre === newProducto.nombre);
    if (productoDuplicado) {
        res.json({ mensaje: 'Ya existe ese nombre'});

    } else if (newProducto.nombre.trim() === "") {
        res.json({ mensaje: 'el nombre no debe estar vacio'});

    } else {
        newProducto.id = db.productos.length > 0 ? Math.max(...db.productos.map(u => u.id)) + 1 : 1;
        db.productos.push(newProducto);
        guardarDB(db); // Save to file
        res.status(201).json({ mensaje: 'Producto creado correctamente', producto: newProducto });
    }
}

// put usuario by id
const putProducto = (req, res) => {
    db = leerDB() // Refresh data from file
    const id = parseInt(req.params.id); // Convertir a número
    const productoEncontrado = db.productos.find((producto) => producto.id === id);
    if (productoEncontrado) {
        productoEncontrado.nombre = req.body.nombre;
        productoEncontrado.descripcion = req.body.descripcion;
        productoEncontrado.precio = req.body.precio;
        guardarDB(db); // Save to file
        res.json({ mensaje: 'Producto actualizado correctamente', producto: productoEncontrado });
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
}

//delete usuario
const deleteProducto = (req, res) => {
    db = leerDB() // Refresh data from file
    const id = parseInt(req.params.id); // Convertir a número
    const productoIndex = db.productos.findIndex((producto) => producto.id === id);
    if (productoIndex !== -1) {
        const deletedProducto = db.productos[productoIndex];
        db.productos = db.productos.filter((producto) => producto.id !== id);
        guardarDB(db); // Save to file
        res.json({ mensaje: 'producto eliminado correctamente', producto: deletedProducto });
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
}

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    putProducto,
    deleteProducto
}