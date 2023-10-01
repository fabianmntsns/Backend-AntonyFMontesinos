import { Router } from "express"
import ProductManager from "../productManager.js"
import ProductManagerDB from "../dao/managers/productManagerMongoDB.js"
import { PORT } from "../app.js"

const router = Router()
const pm = new ProductManagerDB()
const productManager = new ProductManager('./data/products.json')


export const getProducts = async(req, res) =>{
    const limit = req.query.limit
    const page = req.query.page
    const sort = req.query.sort
    const availability = req.query.availability
    const category = req.query.category
    const result = await pm.getProducts(limit, page, sort, availability, category)
    // next y previus page
    let prevLink
    if (!req.query.page) {
        prevLink = `http://${req.hostname}:${PORT}${req.originalUrl}&page=${result.prevPage}`
    } else {
        const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${result.prevPage}`)
        prevLink = `http://${req.hostname}:${PORT}${modifiedUrl}`
    }
    let nextLink
    if (!req.query.page) {
        nextLink = `http://${req.hostname}:${PORT}${req.originalUrl}&page=${result.nextPage}`
    } else {
        const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${result.nextPage}`)
        nextLink = `http://${req.hostname}:${PORT}${modifiedUrl}`
    }
    if (typeof result === ' string') return result
    return {
            status: 'success', 
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? prevLink : null,
            nextLink: result.hasNextPage ? nextLink : null
        }
}

router.get('/', async (req, res) => {
    const result = await getProducts(req, res)

    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(200).json(result)

    
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid
    const result = await pm.getProductById(id)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }

    res.status(200).json({ status: 'success', payload: result })
})

router.post('/', async (req, res) => {
    const product = req.body
    const result = await pm.addProduct(product)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
})

router.put('/:pid', async (req, res) => {
    const id = req.params.pid
    const updateProduct = req.body
    const result = await pm.updateProduct(id, updateProduct)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ status: 'success', payload: result })
})

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    const result = await pm.deleteProduct(id)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ status: 'success', payload: result })
})


export default router
