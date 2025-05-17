const express = require('express')
const router = express.Router()

const {
    getUsuario,
    getUsuarioById,
    createUsuario,
    putUsuario,
    deleteUsuario

} = require('../controllers/usuarios.controllers')

router.get('/', getUsuario)
router.get('/:id', getUsuarioById)
router.post('/', createUsuario)
router.put('/:id', putUsuario)
router.delete('/:id', deleteUsuario)

module.exports = router
