 import { Router } from "express";
 import ProductManager from "../productManager.js";

 const pm = new ProductManager('./data/products.json')


 const router = Router()


 router.get("/", async (req, res) => {
    const productsList = await pm.getProducts({})     
    res.render("home", {productsList})
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts")
})


 export default router 