import express  from "express";

const app = express()

app.use(express.json())
app.use('api/products', productsRouter)
app.use('api/carts', cartsRouter)


app.listen(8080, () => console.log ('Server Up!'))

