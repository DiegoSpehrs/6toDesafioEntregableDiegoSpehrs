import { Router } from "express";
import {productMongo} from '../managers/products/ProductsMongo.js';

const router = Router()

router.get('/',async(req,res)=>{
    try {
      const {limit,page,sort} = req.query
      const products = await productMongo.getProducts(limit,page,sort)
      res.status(200).json({products})

    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:pid',async(req,res)=>{
    const {pid} = req.params
    try {
      const products = await productMongo.getProductById(pid)
      res.status(200).json({message:'Product: ',products})  
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/',async(req,res)=>{
    try {
      const newProduct = await productMongo.addproduct(req.body)
      res.status(200).json({message:'new product create',product:newProduct})  
    } catch (error) {
        res.status(500).json({error})
    }
})

router.put('/:pid',async(req,res)=>{
    const {pid} = req.params
    try {
      const productUpdate = await productMongo.updateProduct(pid,req.body)
      res.status(200).json({message:'Product updated'})  
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:pid',async(req,res)=>{
    const {pid} = req.params
    try {
      const response = await productMongo.deleteProduct(pid)
      res.status(200).json({message:'Product deleted'})  
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router

