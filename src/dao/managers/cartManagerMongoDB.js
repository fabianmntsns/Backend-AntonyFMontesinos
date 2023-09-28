import mongoose from "mongoose";
import ProductManagerDB from "./productManagerMongoDB.js";
import { cartModel } from "../models/carts.model.js";


class CartManagerDB {

    async addCart() {
        try {
            return await cartModel.create({ products: [] })
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async getCartById(id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id)
            const cart = await cartModel.find({ _id: objectId })
            if (!cart) return '[404] No encontrado'
            return cart[0]
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async addProductToCart(pid, cid) {
        try {
            const pm = new ProductManagerDB()
            const result = await pm.getProductById(pid)
            if (typeof result == 'string') {
                return result
            }

            const cart = await this.getCartById(cid)
            console.log(cart)
            const objectCid = new mongoose.Types.ObjectId(cid)
            const objectPid = new mongoose.Types.ObjectId(pid)

            const product = cart.products.find(item => item._id.toString() === objectPid.toString())
            if (!product) {
                cart.products.push({ _id:objectPid , quantity: 1 })

            } else {
                cart.products = cart.products.map(prod => {
                    if (prod._id.toString() === objectPid.toString()) {
                        return { ...prod, quantity: (prod.quantity + 1) };

                    }
                    return prod
                });
            }

            console.log(cart.products)
            
            await cartModel.findOneAndUpdate({ _id: objectCid }, { products: cart.products })
            return this.getCartById(cid)

        } catch (e) {
            return "[400] " + e.message
        }
    }
}

export default CartManagerDB