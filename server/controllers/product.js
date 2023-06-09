import User from "../models/User.js";

import Product from "../models/Product.js";

import Comment from "../models/Comment.js";
import Cart from "../models/Cart.js";	
import Order from "../models/Order.js";
import multer from 'multer';

/** find product */

export const searchProduct = async (req,res) =>{
    try{
      const { name, type } = req.query;
      if (name && !type) {
        const ragex = new RegExp(`${name}`,"i");
        Product.find({TenSp: ragex})
            .then((products)=>{
                res.status(200).json(products)
            })
      }  else if (!name && type){
        const ragex = new RegExp(`${type}`,"i");
        Product.find({LoaiSp: ragex})
            .then((products)=>{
                res.status(200).json(products)
            })
      }else if (name && type){
        const nameSp = new RegExp(`${name}`,"i");
        const loaiSp = new RegExp(`${type}`,"i");
        Product.find({TenSp: nameSp},{LoaiSp: loaiSp})
            .then((products)=>{
                res.status(200).json(products)
            })
      } else{
        Product.find({})
          .then((products)=>{
            res.status(200).json(products)
          })

      }

                
    }catch(e){
        res.status(500).json({error: e.message});
    }
}
export const infProduct = async (req, res) => {
    try{
        let _idP =  req.params.idP;
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
      let _idP = req.params.idP;
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
    let _idSeller = req.params.idS;
    let _idP = req.params.idP;
    const product = Product.findOne({_id: _idP})

    Product.findOneAndUpdate({_id: _idP},
      {$set:{SoLuong: product.SoLuong-req.body.SoLuong}})
    Cart.findOneAndUpdate({_idUser: _idUser},
      { $pull: { _idSp: _idP } }, 
      { new: true })
    
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
  