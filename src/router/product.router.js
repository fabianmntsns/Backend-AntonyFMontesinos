import { Router } from "express"
import ProductManager from "../productManager.js"
import ProductManagerDB from "../dao/managers/productManagerMongoDB.js"

const router = Router()
const pm = new ProductManagerDB()
const productManager = new ProductManager('./data/products.json')


router.get('/', async (req, res) => {
    const result = await pm.getProducts()
    const limit = req.query.limit
    if (typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0]. slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(200).json({ status: 'success', payload: result.slice(0, limit)})
})

router.get('/:pid', async (req, res) => {
    const id = req.params.pid
    const result = await pm.getProductById(id)
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }

    res.status(200).json({ status:'success', payload: result})
})

router.post('/', async (req, res ) => {
    const product = req.body
    const result = await pm.addProduct(product)
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(201).json({ status: 'success', payload: result})
}) 

router.put('/:pid', async(req, res) => {
    const id =  req.params.pid
    const updateProduct = req.body
    const result = await pm.updateProduct(id, updateProduct)
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(200).json({status: 'success', payload: result})
})

router.delete('/:pid', async(req, res) => {
    const id = req.params.pid
    const result = await pm.deleteProduct(id)
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(200).json({status: 'success', payload: result})
})


export default router
