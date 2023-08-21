import fs from 'fs'


class  ProductManager {
    #path

    constructor(path) {
        this.#path = path
        this.#init()
    }

    async #init(){
        if(!fs.existsSync(this.#path)) {
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2))
        }
    }

    #generateID(products) {
        return(products.length === 0) ? 1 : products [products.length - 1].id + 1
    }

    async addCart(products) {

        if(!fs.existsSync(this.#path))
        return 'El archivo no existe en la base de datos'

        let data = await fs.promises.readFile(this.#path, 'utf-8')
        let carts = JSON.parse(data)

        const cartToAdd = { id: this.#generateID(products), products}
        carts.push(cartToAdd)
        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2))
        return cartToAdd
    }

}