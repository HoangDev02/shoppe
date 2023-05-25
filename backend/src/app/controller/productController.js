
const productModel = require('../models/product.model')

const productController = {
    createProduct: async(req,res,next) => {
        const newProduct = new productModel(req.body);
        try {
            await newProduct.save()
            res.status(200).json('create product success')
        } catch(err) {
            next(err)
        }
    },
    // editProduct: async(req,res,next) => {
    //     product.findById(req.params.id)
    //     .then(product => res.render('products/updateProduct', {
    //         product: mongooseToObject(product)
    //     }))
    //     .catch(next)
    // },

    //get
    editProduct: async(req,res,next) => {
        try {
            const editProduct = await productModel.findById(req.params.id);
            res.status(200).json(editProduct)
        }catch(err) {
            next(err)
        }
    },
    //put
    updateProduct: async(req,res,next) => {
        productModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(() => res.json('"update product success'))
        .catch(next)
    },
    //delete
    deleteProduct: async(req,res,next) => {
        productModel.findByIdAndDelete(req.params.id)
        .then(() =>res.json('delete product success'))
        .catch(next)
    },
    getProduct: async(req,res,next) => {
        try {
            const product = await productModel.findById(req.params.id);
            res.status(200).json(product)
        }catch(err) {
            next(err)
        }
    },
    getProducts: async(req,res,next) => {
        try {
            const product =await productModel.find();
            res.status(200).json( product)
        }catch(err) {
            next(err)
        }
    }
}

module.exports = productController