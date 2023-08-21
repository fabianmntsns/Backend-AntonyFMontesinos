import express  from "express";
import productsRouter from "./router/product.router.js";
import cartsRouter from "./router/cart.router.js";

const app = express()

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.listen(8080, () => console.log ('Server Up!'))

