import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema({
    _idUser: {
        type: String,
        required: true,
    },
    _idNguoiban: {
        type: String,
        required: true,
    },
    _idSp: {
        type: String,
        required: true,
    },
    
    SoLuong: Number,
   
    DiaChiGiaoHang: String,
    ChiPhiVanChuyen: Number,
    Tongtien: Number,
    TrangThai: String
},{timestamps: true}
)
const Order = mongoose.model('Order',OrderSchame);
export default Order;