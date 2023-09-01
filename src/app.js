import express  from "express";
import viewsRouter from "./router/view.router.js"
import handlebars from 'express-handlebars'
import productsRouter from "./router/product.router.js";
import cartsRouter from "./router/cart.router.js";
import {Server} from "socket.io";

const app = express()
app.use(express.json())
app.use(express.static("./src/public"))
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')



app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)




const httpServer= app.listen(8080, () => {console.log ('Server Up!')}) 
const socketServer = new Server(httpServer)


socketServer.on ("connection", async (socket) => {
    console.log("client connected ID:", socket.id)
 
   socket.on('productList', productListSocket => {
        socket.emit("products", productListSocket)  
   })
})

