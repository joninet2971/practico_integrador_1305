const express = require('express')
const router = express.Router()

const {
    getProductos,
    getProductoById,
    createProducto,
    putProducto,
    deleteProducto

} = require('../controllers/productos.controllers')

router.get('/', getProductos)
router.get('/:id', getProductoById)
router.post('/', createProducto)
router.put('/:id', putProducto)
router.delete('/:id', deleteProducto)




module.exports = router
