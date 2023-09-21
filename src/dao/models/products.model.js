import mongoose from "mongoose";

const productCollection = "products"
const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        requited: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true 
    }
})

export const productsModel= mongoose.model(productCollection,productSchema)