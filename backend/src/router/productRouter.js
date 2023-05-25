const express = require('express')
const router = express.Router()
const productController = require('../app/controller/productController')
const middlewate = require('../app/middleware/middleware')

router.post('/create',productController.createProduct)
router.put('/update/:id',productController.updateProduct)
router.delete('/delete/:id',middlewate.verifyUser,productController.deleteProduct)

//get product
router.get('/edit/:id', productController.editProduct)
router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)
module.exports = router