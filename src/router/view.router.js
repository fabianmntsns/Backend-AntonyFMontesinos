import { Router } from "express";
import ProductManagerDB from "../dao/managers/productManagerMongoDB.js";
import messageManagerDB from "../dao/managers/messageManagerMongoDB.js";
import { PORT } from "../app.js";
import { getProducts } from "./product.router.js"


const pm = new ProductManagerDB()
const mm = new messageManagerDB()

const router = Router()

router.get("/", async (req, res) => {
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
        console.log(pageResult)
        res.render("home", {
            products: pageResult.payload,
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

router.get("/realTimeProducts", async (req, res) => {
    // const pageResult = await getProducts(req, res)
    // res.render("realTimeProducts", { pageResult })
})

router.get("/chat", async (req, res) => {
    const messagesList = await mm.getMessages()

    res.render("chat", { messagesList })
})


export default router 