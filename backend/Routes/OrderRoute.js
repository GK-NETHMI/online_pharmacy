import express from 'express';
import { Order } from '../Models/Order.js'; // Adjust path if necessary

const router = express.Router();

// Create Order
router.post('/order', async (req, res) => {
    try {
        const newOrder = new Order({
            OName: req.body.OName,
            OPrice: req.body.OPrice,
            OQuantity: req.body.OQuantity,
            OCategory: req.body.OCategory,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Orders
router.get('/order', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Order by ID
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ OID: req.params.id });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Order
router.put('/order/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { OID: req.params.id },
            req.body,
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Order
router.delete('/order/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ OID: req.params.id });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
