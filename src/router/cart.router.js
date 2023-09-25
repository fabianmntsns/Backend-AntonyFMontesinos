import { Router } from "express"
import CartManager from "../cartManager.js"
import CartManagerDB from "../dao/managers/cartManagerMongoDB.js"

const router = Router()
const cm = new CartManagerDB()

router.post('/', async (req, res ) => {
    const result = await cm.addCart()
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(201).json({status: 'success', payload: result})
})

router.get('/:cid', async (req, res) => {
    const id = req.params.cid
    const result = await cm.getCartById(id)
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(200).json({ status: 'success', payload: result})
})

router.post('/:cid/product/:pid', async (req, res)  => {
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await cm.addProductToCart(pid, cid)
    if(typeof result == 'string'){
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({ error: result.slice(6)})
    }
    res.status(201).json({ status: 'success', payload: result})
})

export default router