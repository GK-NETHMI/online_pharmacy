import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Customer } from "../models/Customer.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles/");
  },
  filename: (req, file, cb) => {
    cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (JPEG, JPG, PNG) are allowed"));
    }
  },
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "30d",
  });
};

// @route   POST /api/customers/register
// @desc    Register a new customer
// @access  Public
router.post(
  "/register",
  upload.single("CusProfile"),
  [
    body("CusName").trim().notEmpty().withMessage("Name is required"),
    body("CusEmail").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("CusPhone").matches(/^\d{10}$/).withMessage("Phone must be 10 digits"),
    body("CusPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("CusAge").isInt({ min: 18, max: 100 }).withMessage("Age must be between 18-100"),
    body("CusGender").isIn(["Male", "Female", "Other"]).withMessage("Invalid gender"),
    body("CusAddress").notEmpty().withMessage("Address is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if customer already exists
      const customerExists = await Customer.findOne({ CusEmail: req.body.CusEmail });
      if (customerExists) {
        return res.status(400).json({ message: "Customer already exists" });
      }

      // Create new customer
      const customer = new Customer({
        CusName: req.body.CusName,
        CusEmail: req.body.CusEmail,
        CusPhone: req.body.CusPhone,
        CusAddress: req.body.CusAddress,
        CusPassword: req.body.CusPassword,
        CusAge: req.body.CusAge,
        CusGender: req.body.CusGender,
        CusProfile: req.file ? req.file.path : "default-profile.jpg",
      });

      // Save to database
      await customer.save();

      // Generate token
      const token = generateToken(customer._id);

      // Return response without password
      const customerResponse = {
        _id: customer._id,
        CusID: customer.CusID,
        CusName: customer.CusName,
        CusEmail: customer.CusEmail,
        CusProfile: customer.CusProfile,
        token,
      };

      res.status(201).json(customerResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   POST /api/customers/login
// @desc    Authenticate customer
// @access  Public
router.post(
  "/login",
  [
    body("CusEmail").isEmail().withMessage("Invalid email"),
    body("CusPassword").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { CusEmail, CusPassword } = req.body;

    try {
      const customer = await Customer.findOne({ CusEmail }).select("+CusPassword");
      
      if (!customer || !(await customer.comparePassword(CusPassword))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(customer._id);

      res.json({
        _id: customer._id,
        CusID: customer.CusID,
        CusName: customer.CusName,
        CusEmail: customer.CusEmail,
        CusProfile: customer.CusProfile,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   GET /api/customers
// @desc    Get all customers
// @access  Private/Admin
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().select("-CusPassword");
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/customers/:id
// @desc    Get customer by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select("-CusPassword");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/customers/:id
// @desc    Update customer
// @access  Private
router.put(
  "/:id",
  upload.single("CusProfile"),
  [
    body("CusName").optional().trim().notEmpty(),
    body("CusEmail").optional().isEmail(),
    body("CusPhone").optional().matches(/^\d{10}$/),
    body("CusAge").optional().isInt({ min: 18, max: 100 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updates = { ...req.body };
      
      // Handle file upload
      if (req.file) {
        updates.CusProfile = req.file.path;
      }

      // Don't allow password updates via this route
      if (updates.CusPassword) {
        return res.status(400).json({ message: "Use password reset route" });
      }

      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).select("-CusPassword");

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   DELETE /api/customers/:id
// @desc    Delete customer
// @access  Private/Admin
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;