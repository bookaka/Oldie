import User from "../models/User.js";

import Product from "../models/Product.js";

import Comment from "../models/Comment.js";

/** Post product */
export const  postProduct= async (req,res)=>{
    try {
      
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct);


    }catch(e){
        res.status(500).json({error: e.message});
    }
}
export const  getProduct= async (req,res)=>{
    try {
        let _idUser =  req.params.id;
        _idUser = _idUser.slice(1,_idUser.length)
        const products = await Product.find({ _idUser });

        res.status(200).json(products)

    }catch(e){
        res.status(500).json({error: e.message});
    }
}
export const cmtProduct= async (req,res)=>{
    try {
      
        const newCmt = new Comment(req.body)
        const savedCmt = await newCmt.save()
        res.status(201).json(savedCmt);


    }catch(e){
        res.status(500).json({error: e.message});
    }
}