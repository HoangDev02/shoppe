const cartModel = require('../models/cartModel')
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const cartController = {

    getCarts : async (req,res,next) => {
        try {
            const cart = await cartModel.find()
            res.status(200).json(cart) 
        }catch (err) {

        }
    },
    getCart : async (req,res,next) => {
        try {
            const cart = await cartModel.find({userId: req.params.userId})
            if(!cart) {
                res.status(404).send("cart wrong")
            }
            res.status(200).json(cart) 
        }catch (err) {
            next(err)
        }
    },
    addCart: async(req,res,next) => {
        const {name,price,img,productId} = req.body
        const quantity = Number.parseInt(req.body.quantity);
        const userId = req.params.userId
        const user = await userModel.findById({_id: userId})
        if(!userId || !user) {
            return res.status(400).send({ status: false, message: "Invalid user ID" });
        }
        // let product_Id = req.body.productId;
        let product_Id = await productModel.findById(productId);
        if(!product_Id) {
            return res.status(400).send({ status: false, message: "Invalid product_id" });
        }
        let cart = await cartModel.findOne({userId: userId})
        if(cart) {
            let itemIndex = cart.products.findIndex(p => p.productId == productId)
            // console.log("Index", indexFound)
            if (itemIndex != -1) {
                cart.products[itemIndex].quantity = cart.products[itemIndex].quantity + quantity;
                cart.products[itemIndex].total = cart.products[itemIndex].quantity * product_Id.price;
                cart.products[itemIndex].price = product_Id.price
                cart.subtotal = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
              } else if(quantity > 0) {
                cart.products.push({ productId: productId ,quantity: quantity, name,price,img,  total: parseInt(product_Id.price * quantity).toFixed(2)});
                cart.subtotal = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
              }
              cart = await cart.save();
              return res.status(200).json({ status: true, updatedCart: cart });
        }else {
            const carts=  await cartModel.create({
                userId,
                products: [{ productId: productId, quantity:quantity, name:name,img,price:price ,total: parseInt(product_Id.price * quantity)}],
                subtotal: parseInt(product_Id.price * quantity)
              });
              return res.status(201).json(carts);
        }
    },
    deleteCart: async(req,res,next) => {
        const userId = req.params.userId
        let productId = req.body.ProductId
        let cart = await cartModel.findOne({ userId: userId })
        if(!cart) {
            res.status(400).send('back')
        }
        let itemIndex = cart.products.findIndex(p => p.productId == productId)
        if(itemIndex >= -1) {
            cart.products.splice(itemIndex, 1);
            cart = await cart.save()
            return res.status(200).send("delete cart")
        }
        res.status(400).send("Item does not exist in cart")
    }
}
module.exports = cartController
