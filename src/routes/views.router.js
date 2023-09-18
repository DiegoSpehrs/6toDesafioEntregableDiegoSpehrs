import { Router } from "express";
import  {productMongo}  from "../managers/products/ProductsMongo.js";


const router = Router()




router.get('/',async(req,res) =>{
    const allProducts = await productMongo.getProducts();
    res.render("bodyHome",{ products: allProducts })
})

router.get('/realtimeproducts',async(req,res)=>{    
    const allProducts = await productMongo.getProducts();
    res.render("realTimeProducts",{ products: allProducts })
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/singup',(req,res)=>{
    res.render('singup')
})

router.get('/adminHome',(req,res)=>{
    res.render('adminHome')
})

router.get('/clientHome',(req,res)=>{
    res.render('cleintHome')
})


export default router