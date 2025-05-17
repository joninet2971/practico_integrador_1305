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
const getUsuario = (req, res) => {
  db = leerDB() // Refresh data from file
  res.json(db.usuarios);
}

// get usuario by id
const getUsuarioById = (req, res) => {
    const id = parseInt(req.params.id); // Convertir a número
    db = leerDB() // Refresh data from file
    const usuario = db.usuarios.find((usuario) => usuario.id === id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  }

// Create a new Usuario
const createUsuario = (req, res) => {
    db = leerDB() // Refresh data from file
    const newUsuario = req.body;
    const emailDuplicado = db.usuarios.find((usuario) => usuario.email === newUsuario.email);
    if (emailDuplicado) {
        res.json({ mensaje: 'Ya existe el email en la base de datos'});

    } else if (newUsuario.email.trim() === "") {
        res.json({ mensaje: 'el email no debe estar vacio'});

    } else {
        newUsuario.id = db.usuarios.length > 0 ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
        db.usuarios.push(newUsuario);
        guardarDB(db); // Save to file
        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: newUsuario });
    }
}

// put usuario by id
const putUsuario = (req, res) => {
    db = leerDB() // Refresh data from file
    const id = parseInt(req.params.id); // Convertir a número
    const usuarioEncontrado = db.usuarios.find((usuario) => usuario.id === id);
    if (usuarioEncontrado) {
        usuarioEncontrado.nombre = req.body.nombre;
        usuarioEncontrado.email = req.body.email;
        usuarioEncontrado.usuario = req.body.usuario;
        usuarioEncontrado.edad = req.body.edad;
        guardarDB(db); // Save to file
        res.json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioEncontrado });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
}

//delete usuario
const deleteUsuario = (req, res) => {
    db = leerDB() // Refresh data from file
    const id = parseInt(req.params.id); // Convertir a número
    const usuarioIndex = db.usuarios.findIndex((usuario) => usuario.id === id);
    if (usuarioIndex !== -1) {
        const deletedUsuario = db.usuarios[usuarioIndex];
        db.usuarios = db.usuarios.filter((usuario) => usuario.id !== id);
        guardarDB(db); // Save to file
        res.json({ mensaje: 'Usuario eliminado correctamente', usuario: deletedUsuario });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
}

module.exports = {
    getUsuario,
    getUsuarioById,
    createUsuario,
    putUsuario,
    deleteUsuario
}