import { Router } from "express"
import MessageManagerDB from "../dao/managers/messageManagerMongoDB.js"


const router = Router()
const mm = new MessageManagerDB()

router.get('/', async (req, res) => {

    const result = await mm.getMessages()
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ status: 'success', payload: result })
})

router.post('/', async (req, res) => {
    const newMessage = req.body
    const result = await mm.addMessage(newMessage)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
})


export default router