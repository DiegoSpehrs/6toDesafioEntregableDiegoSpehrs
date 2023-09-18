import { Router } from "express";
import {userMongo} from '../managers/users/usersMongo.js';
import { productMongo } from "../managers/products/ProductsMongo.js";
import { compareData } from "../utils.js";

const router = new Router();

router.post('/', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json({message:'Sing up first'})
    }
    const userDB = await userMongo.findUser(username)
    const isPasswordValid = await compareData(password, userDB.password)
    if(!isPasswordValid){
        return res.status(401).json({message: 'Username or Password not valid'})
    }
    req.session['username'] = username
    res.status(200).json({message:'Session created', user:userDB})
    //const allProducts = await productMongo.getProducts();
    //res.render("bodyHome",{ products: allProducts })
})

export default router
