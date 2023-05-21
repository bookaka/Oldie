import mongoose  from "mongoose";

const CartSchema = new mongoose.Schema({
    _idUser: {
        type: String,
        required: true,
    },
    _idSp: {
        type: Array,
        required: true,
    },
    
},{timestamps: true}
)
const Cart = mongoose.model('Cart',CartSchame);
export default Cart;