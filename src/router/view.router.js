 import { Router } from "express";
 import ProductManagerDB from "../dao/managers/productManagerMongoDB.js";
 import messageManagerDB from "../dao/managers/messageManagerMongoDB.js";


 const pm = new ProductManagerDB()
 const mm = new messageManagerDB()

 const router = Router()
 
 router.get("/", async (req, res) => {
    const productsList = await pm.getProducts({})     
    res.render("home", {productsList})
})

router.get("/realTimeProducts", async (req, res) => {
    const productsList = await pm.getProducts({})     
    res.render("realTimeProducts", {productsList})
})

router.get("/chat", async(req, res) => {
    const messagesList = await mm.getMessages()

    res.render("chat", {messagesList})
})


 export default router 