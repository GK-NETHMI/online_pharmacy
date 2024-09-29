import express from 'express';
import mongoose from 'mongoose';
import {Customer} from '../Models/Customer.js';

const router = express.Router();

// Get all customers

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get a single customer

router.get('/:id', async(req, res) => {
    try{
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Create a new customer

router.post('/', async (req, res) => {
    try {
         const newCustomer = {
        CusID: req.body.CusID,
        CusName: req.body.CusName,
        CusEmail: req.body.CusEmail,
        CusPhone: req.body.CusPhone,
        CusAddress: req.body.CusAddress,
        CusPassword: req.body.CusPassword,
        CusAge: req.body.CusAge,
        CusGender: req.body.CusGender,
        CusProfile: req.body.CusProfile,
    };
        const createdCustomer = await Customer.create(newCustomer);
        return res.status(201).send(createdCustomer);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update a customer

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Delete a customer

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.json({message: 'Customer deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

export default router;

