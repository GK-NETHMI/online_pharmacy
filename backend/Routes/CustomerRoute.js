import express from 'express';
import { Customer } from '../Models/Customer.js'; // Adjust path if necessary

const router = express.Router();

// Create Customer
router.post('/customer', async (req, res) => {
    try {
        const newCustomer = new Customer({
            CusName: req.body.CusName,
            CusEmail: req.body.CusEmail,
            CusPhone: req.body.CusPhone,
            CusAddress: req.body.CusAddress,
            CusPassword: req.body.CusPassword,
            CusAge: req.body.CusAge,
            CusGender: req.body.CusGender,
            CusProfile: req.body.CusProfile,
        });

        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Customers
router.get('/customer', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Customer by ID
router.get('/customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ CusID: req.params.id });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Customer
router.put('/customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            { CusID: req.params.id },
            req.body,
            { new: true }
        );
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Customer
router.delete('/customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findOneAndDelete({ CusID: req.params.id });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
