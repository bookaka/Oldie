import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { response } from "express";


/** REGISTER USER */

export const register = async(req,res) =>{
    try{
        const {
            username,
            password,
            hoten,
            SDT,
            email
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            password:passwordHash,
            hoten,
            hinhanh: null,
            SDT,
            diachi: null,
            gioitinh: null,
            email,
            role
        });
        const saveUser = await newUser.save();

        res.status(201).json(saveUser);

    }catch(err){
        res.status(500).json({error: err.message});            
    }
}

/*  LOGGING IN*/
export const login = async (req, res)=>{
    try{
        const { username , password} = req.body;
        const user = await User.findOne({username: username})
        if (!user) return res.status(400).json({message: `User not found`});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: `"Invalid password"`});

        const token = jwt.sign({id: user._id}, process.env.JWT)
        delete user.password
        res.status(200).json({token,user})
    } catch(err){
        res.status(500).json({message: err.message})
    }
}