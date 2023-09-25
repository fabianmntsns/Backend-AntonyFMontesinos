import mongoose from "mongoose";
import { productsModel } from "../models/products.model.js";

class ProductManagerDB {

    async addProduct(product) {
        try {
            return await productsModel.create(product)
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async getProducts() {
        try {
            return await productsModel.find({})
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async getProductById(id) {
        try{
            const objectId = new mongoose.Types.ObjectId(id)
            const product = await productsModel.find({ _id: objectId })
            if (!product) return '[404] No encontrado'
            return product[0]
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async updateProduct(id, updateProduct) {
        try {
            const objectId = new mongoose.Types.ObjectId(id)
            const product = await productsModel.findOneAndUpdate({ _id: objectId }, updateProduct)
            if (!product) return '[404] No encontrado'
            return this.getProductById(id)
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async deleteProduct(id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id)
            const result = await productsModel.deleteOne({ _id: objectId })
            if (!result.deletedCount) return '[404] No se pudo eliminar este producto'
            return this.getProducts()
        } catch (e) {
            return "[400] " + e.message
        }
    }
}

export default ProductManagerDB