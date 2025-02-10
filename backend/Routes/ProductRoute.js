import express from 'express';
import { Product } from '../Models/Product.js'; // Adjust path if necessary

const router = express.Router();

// Create Product
router.post('/product', async (req, res) => {
    try {
        const newProduct = new Product({
            PName: req.body.PName,
            PDescription: req.body.PDescription,
            PPrice: req.body.PPrice,
            PQuantity: req.body.PQuantity,
            PCategory: req.body.PCategory,
            PImage: req.body.PImage,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Products
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Product by ID
router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ PID: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Product
router.put('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { PID: req.params.id },
            req.body,
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Product
router.delete('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ PID: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
