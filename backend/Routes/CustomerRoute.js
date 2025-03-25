import express from 'express';
import { Customer } from '../Models/Customer.js'; // Adjust path if necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Create Customer
router.post('/customer', async (req, res) => {
    try {
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.CusPassword, salt);

        const newCustomer = new Customer({
            CusName: req.body.CusName,
            CusEmail: req.body.CusEmail,
            CusPhone: req.body.CusPhone,
            CusAddress: req.body.CusAddress,
            CusPassword: hashedPassword,
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

// Login Customer
router.post('/customer/login', async (req, res) => {
    try {
        const { CusEmail, CusPassword } = req.body;

        // Find customer by email
        const customer = await Customer.findOne({ CusEmail });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(CusPassword, customer.CusPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                id: customer.CusID,
                email: customer.CusEmail,
                name: customer.CusName
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Send response without password
        const customerResponse = {
            CusID: customer.CusID,
            CusName: customer.CusName,
            CusEmail: customer.CusEmail,
            CusPhone: customer.CusPhone,
            CusAddress: customer.CusAddress,
            CusAge: customer.CusAge,
            CusGender: customer.CusGender,
            CusProfile: customer.CusProfile,
            token
        };

        res.status(200).json(customerResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
