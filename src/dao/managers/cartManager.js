import fs from 'fs'
import ProductManager from './productManager.js'


class CartManager {
    #path

    constructor(path) {
        this.#path = path
        this.#init()
    }

    async #init() {
        if (!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2))
        }
    }

    #generateID(carts) {
        return (carts.length === 0) ? 1 : carts[carts.length - 1].id + 1
    }

    async addCart() {

        if (!fs.existsSync(this.#path))
            return '[404] El archivo no existe en la base de datos'

        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let carts = JSON.parse(data)

        const cartToAdd = { id: this.#generateID(carts), products: [] }
        carts.push(cartToAdd)
        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2))
        return cartToAdd
    }

    async getCartById(id) {

        if (!fs.existsSync(this.#path))
            return '[404] El archivo no existe en la base de datos'

        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let carts = JSON.parse(data)

        const cart = carts.find(item => item.id === id)
        if (!cart) {
            return `[404] El carrito con el ID:${id} no existe`
        }
        return cart
    }

    async addProductToCart(pid, cid) {

        if (!fs.existsSync(this.#path))
        return '[404] El archivo no existe en la base de datos'

        const productManager = new ProductManager('./data/products.json')        
        const result = await productManager.getProductById(pid)  
        if (typeof result == 'string') {
            return result
        }

        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let carts = JSON.parse(data)

        const cart = carts.find(item => item.id === cid)
        if (!cart) {
            return `[401] El carrito con el ID:${cid} no existe`
        }

        const product = cart.products.find(item => item.id === pid)
        if (!product) {
            cart.products.push({ id: pid, quantity: 1 })

        } else {
            cart.products = cart.products.map(prod => {
                if (prod.id === pid) {
                    return { ...prod, quantity: (prod.quantity + 1) };

                }
                return prod
            });
        }

        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2))

        return cart




    }

}

export default CartManager