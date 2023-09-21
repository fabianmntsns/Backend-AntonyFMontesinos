import { cartModel } from "../models/carts.model";

class CartManager{
    
    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean()
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    }





    
}