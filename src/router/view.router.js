 import { Router } from "express";
 import ProductManager from "../productManager.js";

 const productManager = new ProductManager('./data/products.json')


 const router = Router()


 router.get("/", async (req, res) => {
    const productsList = await productManager.getProducts({})     
    res.render("home", {productsList})
})

router.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts")
})


 export default router 