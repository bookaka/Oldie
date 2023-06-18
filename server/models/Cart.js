import mongoose  from "mongoose";

const CartItem = new mongoose.Schema({
    _idSp: {
        type: String,
    },
    amount: Number
})

const CartSchema = new mongoose.Schema({
    _idUser: {
        type: [CartItem],
    },
    cartItem:{
        type: Array
    }
    
},{timestamps: true}
)
const Cart = mongoose.model('Cart',CartSchema);
export default Cart;