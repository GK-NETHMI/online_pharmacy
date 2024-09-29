import express  from 'express';
import mongoose from 'mongoose';
import { Product } from '../Models/Product.js';

const router = express.Router();

// Get all products
router.get('/'),async(res,req) => {
    try{
        const product = await Product.find();
        res.json(product);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

// Get single product
router.get('/:id',async(res,req)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.json(product);
     } catch(err){
            res.status(500).json({message: err.message});
     }    
});

//Delete product
router.delete('/:id',async(res,req) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.json({message: 'Product deleted'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

// Update product
router.put('/:id',async(res,req)=>{
    try{
    const product = await Product.findByIdAndUpdate(req.params.id);
    if(!product){
        return res.status(404).json({message: 'Product not found'});
    }
    res.json({product});
}
catch(err){
    res.status(500).json({message: err.message});
}
});

// Add product
router.post('/',async(res,req)=>{
    const product = new Product ({
        PID :req.body.PID,
        PName :req.body.PName,
        PDescription :req.body.PDescription,
        PPrice :req.body.PPrice,
        PQuantity :req.body.PQuantity,
        PCategory :req.body.PCategory,
        PImage :req.body.PImage,
    });
    try{
        const newproduct = await Product.save();
        res.status(201).json(newproduct);
    }catch (err){
        res.status(500).json(err);
    }
});

export default router;