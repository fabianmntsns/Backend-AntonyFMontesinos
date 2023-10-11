import { Router } from "express";
import ProductManagerDB from "../dao/managers/productManagerMongoDB.js";
import messageManagerDB from "../dao/managers/messageManagerMongoDB.js";
import { PORT } from "../app.js";
import { getProducts } from "./product.router.js";
import CartManagerDB from "../dao/managers/cartManagerMongoDB.js";
import { publicRoutes } from "../middlewares/auth.middleware.js";


const pm = new ProductManagerDB()
const cm = new CartManagerDB
const mm = new messageManagerDB()

const router = Router()

router.get("/products", publicRoutes,  async (req, res) => {
    const pageResult = await getProducts(req, res)
    if (typeof pageResult == 'object') {
        const totalPages = []
        let link
        for (let index = 1; index <= pageResult.totalPages; index++) {
            if (!req.query.page) {
                link = `http://${req.hostname}:${PORT}${req.originalUrl}?page=${index}`
            } else {
                const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${index}`)
                link = `http://${req.hostname}:${PORT}${modifiedUrl}`
            }
            totalPages.push({ page: index, link })
        }
        
        const user = req.session.user
        res.render("home", {
            user, products: pageResult.payload,
            paginateInfo: {
                hasPrevPage: pageResult.hasPrevPage,
                hasNextPage: pageResult.hasNextPage,
                prevLink: pageResult.prevLink,
                nextLink: pageResult.nextLink,
                totalPages
            }
        })
    } else {
        const error = pageResult.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: pageResult.slice(6) })
    }
})

router.get("/realTimeProducts", publicRoutes,  async (req, res) => {
    const result = await getProducts(req, res)
    const productsList = result.payload 

    res.render("realTimeProducts", { productsList })
})


router.get("/chat", publicRoutes, async (req, res) => {
    const messagesList = await mm.getMessages()

    res.render("chat", { messagesList })


})

router.get('/carts/:cid', publicRoutes,  async (req, res) => {
    const cid = req.params.cid
    const result = await cm.getCartById(cid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }

    res.render('cart', { cart: result })

})


router.get('/products/:pid', publicRoutes, async (req, res) => {
    const pid = req.params.pid
    const result = await pm.getProductById(pid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }

    res.render('product', { prod: result })

})

export default router 