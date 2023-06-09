import User from "../models/User.js";

import Product from "../models/Product.js";

import Comment from "../models/Comment.js";
import Cart from "../models/Cart.js";	
import Order from "../models/Order.js";	
import Picture from "../models/Picture.js";
import path from 'path'

/** Post product */
export const  postProduct= async (req,res)=>{
    try {
        let _idUser =  req.params.id;
        const imageUrls = req.files.map(file => file.filename); 
        const newProduct = new Product({
            _idUser,
            TenSp:req.body.TenSp,
            LoaiSp:req.body.LoaiSp,
            HangSanXuat: req.body.HangSanXuat,
            SoLuong:req.body.SoLuong,
            MoTaChiTiet:req.body.MoTaChiTiet,
            Gia: req.body.Gia,
            DiaChi: req.body.DiaChi,
        })
        const savedProduct = await newProduct.save()
        const newPicture = new Picture({
            _ids: savedProduct._id,
            path: imageUrls
        })
        const savePicture = await newPicture.save()
        res.status(200).json({savedProduct,savePicture});


    }catch(e){
        res.status(500).json({error: e.message});
    }
}
/** Get products */
export const  getProduct= async (req,res)=>{
    try {
        const _idUser = req.params.id;
        const products = await Product.find({ _idUser });
        const productPromises = products.map(async (product) => {
            const images = await Image.find({ _idProduct: product._id });
            const productWithImages = {
                ...product._doc,
                images: images.map((image) => image.url),
              };
            return productWithImages;
        })
        const productsWithImages = await Promise.all(productPromises);
        res.status(200).json(productsWithImages)

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

/*  Post comment */
export const cmtProduct= async (req,res)=>{
    try {
      
        let _idUser = req.params.id;
        let _idP = req.params.idP;
        const newCmt = new Comment({
            _idUser: _idUser,
            _idSp: _idP,
            Diem: req.body.Diem,
            Cmt: req.body.Cmt,
        })
        const savedCmt = await newCmt.save()
        res.status(201).json(savedCmt);


    }catch(e){
        res.status(500).json({error: e.message});
    }
}
/** Get cart */
export const getCart= async (req,res)=>{
    try {
      
        let _idUser =  req.params.id;
        const cart = await Cart.findOne({ _idUser });
        const _idSps = cart._idSp
        const productPromises = _idSps.map(_idSp => Product.findOne({ _id: _idSp }));
        const products = await Promise.all(productPromises);
        res.status(200).json(products)
        


    }catch(e){
        res.status(500).json({error: e.message});
    }
}

/** update remove product */
export const removeProduct = async (req, res) => {
    try {
        let _idUser = req.params.id;
        let _idP = req.params.idP;

        const product = await Product.findOneAndRemove({ _id: _idP });
        if (product) {
            res.status(200).json({ message: "Delete Complete" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


/** update user */

export const updateUser= async (req,res)=>{
    try {
      
        let _id =  req.params.id;
        User.findOneAndUpdate({_id:_id},{hoten: req.body.hoten,
            hinhanh: req.body.hinhanh,
            SDT: req.body.SDT,
            diachi: req.body.diachi,
            gioitinh: req.body.gioitinh},
            { new: true })
        .then (updatedUser=>{
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else{
                res.status(400).send("invalid user")
            }
        })
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

/**Get Order */

export const getOrder = async (req, res) => {
    try{
        let _idUser = req.params.id;
        const orders = await Order.find({_idUser})
        res.status(200).json(orders);




    } catch(e){
        res.status(500).json({error: e.message});
    }
}

// Get Picture
export const getPicture = async (req, res) => {
    // const imageName = req.params.imageName;
    // const imagePath = path.join(process.cwd(), 'public/assets', imageName);
    // res.sendFile(imageName);
    try {
        const imageName = req.params.pictureName;
        const imagePath = path.join(process.cwd(), 'public/assets', imageName);
        res.sendFile(imagePath);
 

   } catch (e) {
    res.status(404).json(e.message);
   }
}


