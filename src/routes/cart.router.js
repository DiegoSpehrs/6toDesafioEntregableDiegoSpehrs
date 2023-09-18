import { Router } from "express";
import {cartMongo} from '../managers/carts/CartsMongo.js';

const router = Router()

router.post('/',async(req,res)=>{
    const cartData = req.body
    try{
        const createCart = await cartMongo.createCart(cartData)
        res.status(200).json({message:'Cart',cart:createCart})
    }catch(error){
        res.status(500).json({error})
    }
})

router.post('/:cid',async(req,res)=>{
    const {cid} = req.params
    try {
      const newProduct = await cartMongo.addProduct(cid,req.body)
      console.log(newProduct)
      res.status(200).json({message:'Product added'})  
    } catch (error) {
        res.status(500).json({error})
    }
})



router.delete('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params
    try {
      const result = await cartMongo.productDelete(cid,pid)
      res.status(200).json({message:'Product deleted'})  
    } catch (error) {
        res.status(500).json({error})
    }
})

router.put('/:cid',async(req,res)=>{
    const {cid} = req.params
    try {
      const result = await cartMongo.getCartById(cid)
      res.status(200).json({message:'This is your cart'})  
    } catch (error) {
        res.status(500).json({error})
    }
})

router.put('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params
    const {quantity} = req.body
    try {
      const result = await cartMongo.updateProduct(cid,pid,quantity)
      res.status(200).json({message:'Product updated'})  
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:cid',async(req,res)=>{
    const {cid} = req.params
    try {
      const result = await cartMongo.cartDeleted(cid)
      res.status(200).json({message:'Cart deleted successfully'})  
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router