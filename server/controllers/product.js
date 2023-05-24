import User from "../models/User.js";

import Product from "../models/Product.js";

import Comment from "../models/Comment.js";
import Cart from "../models/Cart.js";	
import Order from "../models/Order.js";

/** find product */

export const searchProduct = async (req,res) =>{
    try{
        const sreachQuery = req.query.q
        const ragex = new RegExp(`${sreachQuery}`,"i");
        Product.find({TenSp: ragex})
            .then((products)=>{
                res.status(200).json(products)
            })
           

                
    }catch(e){
        res.status(500).json({error: e.message});
    }
}
export const infProduct = async (req, res) => {
    try{
        let _idP =  req.params.idP;
        _idP = _idP.slice(1,_idP.length)
        const infProduct = await Product.findOne({_id:_idP});
        const cmts =await Comment.find({_idSp: _idP})
        res.status(200).json({infProduct,cmts})

    } catch(e){
        res.status(500).json({error: e.message});
    }
}
export const addCart = async (req, res) => {
    try {
      let _idUser = req.params.id;
      _idUser = _idUser.slice(1, _idUser.length);
      let _idP = req.params.idP;
      _idP = _idP.slice(1, _idP.length);
      let cart = await Cart.findOne({ _idUser });
  
      if (cart) {
        cart._idSp.push(_idP);
        await cart.save();
        res.status(200).json(cart);
      } else {
        const newCart = new Cart({
          _idUser: _idUser,
          _idSp: [_idP], // Đặt _idSp là một mảng chứa _idP
        });
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

export const postOrder = async (req, res) => {
  try{
    let _idUser = req.params.id;
    _idUser = _idUser.slice(1, _idUser.length);
    let _idSeller = req.params.idS;
    _idSeller = _idSeller.slice(1, _idSeller.length);
    let _idP = req.params.idP;
    _idP = _idP.slice(1, _idP.length);
    const newOrder = new Order({
      _idUser: _idUser,
      _idNguoiBan: _idSeller,
      _idSP: _idP,
      SoLuong: req.body.SoLuong,
      DiacChiGiaoHang: req.body.DiacChiGiaoHang,
      ChiPhiVanChuyen: req.body.ChiPhiVanChuyen,
      TongTien: req.body.TongTien,

    })
    const saveOrder = newOrder.save()
    res.status(201).json(saveOrder);

  }catch (e) {
    res.status(500).json({ error: e.message });
  }
}
  