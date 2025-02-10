import express from 'express';
import { Emp } from '../Models/Employee.js';

const router = express.Router();

// Create Admin
router.post('/emp', async (req, res) => {
    try {
        const newEmp = new Emp({
            EmpName: req.body.EmpName,
            EmpEmail: req.body.EmpEmail,
            EmpPhone: req.body.EmpPhone,
            EmpAddress: req.body.EmpAddress,
            EmpPassword: req.body.EmpPassword,
            EmpAge: req.body.EmpAge,
            EmpGender: req.body.EmpGender,
            EmpProfile: req.body.EmpProfile,
        });

        await newEmp.save();
        res.status(201).json(newEmp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Admins
router.get('/emp', async (req, res) => {
    try {
        const emps = await Emp.find();
        res.status(200).json(emps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Admin by ID
router.get('/emp/:id', async (req, res) => {
    try {
        const emp = await Emp.findOne({ EmpID: req.params.id });
        if (!emp) return res.status(404).json({ message: "Admin not found" });
        res.status(200).json(emp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Admin
router.put('/emp/:id', async (req, res) => {
    try {
        const emp = await Emp.findOneAndUpdate(
            { EmpID: req.params.id },
            req.body,
            { new: true }
        );
        if (!emp) return res.status(404).json({ message: "Admin not found" });
        res.status(200).json(emp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Admin
router.delete('/emp/:id', async (req, res) => {
    try {
        const emp = await Emp.findOneAndDelete({ EmpID: req.params.id });
        if (!emp) return res.status(404).json({ message: "Admin not found" });
        res.status(200).json({ message: "Admin deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
