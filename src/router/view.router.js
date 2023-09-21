 import { Router } from "express";
 import ProductManager from "../dao/managers/productManager.js";

 const productManager = new ProductManager('./data/products.json')
 const router = Router()
 
 router.get("/", async (req, res) => {
    const productsList = await productManager.getProducts({})     
    res.render("home", {productsList})
})

router.get("/realTimeProducts", async (req, res) => {
    const productsList = await productManager.getProducts({})     
    res.render("realTimeProducts", {productsList})
})


 export default router 