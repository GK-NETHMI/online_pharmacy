import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Customer } from "../Models/Customer.js";
import multer from "multer";
import path from "path";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// // Secure JWT secret check
// if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
//   throw new Error("Missing/insecure JWT_SECRET in .env");
// }

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/profiles');
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    mimetype && extname ? cb(null, true) : cb(new Error('Images only (JPEG, PNG, WEBP)'));
  }
});

// // Helper functions
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

router.post(
  '/register',
  upload.single('CusProfile'),
  [
    body('CusName').trim().notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('CusEmail').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('CusPhone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('CusPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('CusAge').isInt({ min: 18, max: 100 }).withMessage('Age must be between 18-100'),
    body('CusGender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('CusAddress').notEmpty().withMessage('Address is required')
  ],
  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file?.path) {
          await fs.unlink(req.file.path);
        }
        return res.status(400).json({ errors: errors.array() });
      }

      const { CusEmail, CusPassword } = req.body;
      
      // Check if user exists
      const existingCustomer = await Customer.findOne({ CusEmail });
      if (existingCustomer) {
        if (req.file?.path) {
          await fs.unlink(req.file.path);
        }
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(CusPassword, 10);

      // Create customer
      const customer = new Customer({
        ...req.body,
        CusPassword: hashedPassword,
        CusProfile: req.file?.path || path.join('public', 'images', 'default-profile.jpg')
      });

      await customer.save();

      res.status(201).json({
        _id: customer._id,
        CusID: customer.CusID,
        CusName: customer.CusName,
        CusEmail: customer.CusEmail,
        token: generateToken(customer._id)
      });

    } catch (err) {
      // Clean up uploaded file if error occurs
      if (req.file?.path) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      
      console.error('Registration error:', err);
      res.status(500).json({ 
        message: 'Registration failed', 
        error: process.env.NODE_ENV === 'development' ? err.message : undefined 
      });
    }
  }
);
// @route   POST /api/customers/login
router.post(
  '/login',
  [
    body('CusEmail').isEmail().normalizeEmail(),
    body('CusPassword').notEmpty()
  ],
  async (req, res) => {
    try {
      validateRequest(req, res);

      const { CusEmail, CusPassword } = req.body;
      const customer = await Customer.findOne({ CusEmail }).select('+CusPassword');

      if (!customer) {
        return res.status(404).json({ message: 'Account not found' });
      }

      if (!(await customer.comparePassword(CusPassword))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({
        _id: customer._id,
        CusName: customer.CusName,
        CusEmail: customer.CusEmail,
        token: generateToken(customer._id)
      });

    } catch (err) {
      res.status(500).json({ message: 'Login failed', error: err.message });
    }
  }
);

// @route   GET /api/customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().select('-CusPassword');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

// @route   GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select('-CusPassword');
    customer ? res.json(customer) : res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
});

// @route   PUT /api/customers/:id
router.put(
  '/:id',
  upload.single('CusProfile'),
  [
    body('CusName').optional().trim().isLength({ min: 3 }),
    body('CusEmail').optional().isEmail(),
    body('CusPhone').optional().matches(/^\d{10}$/),
    body('CusAge').optional().isInt({ min: 18, max: 100 })
  ],
  async (req, res) => {
    try {
      validateRequest(req, res);

      const updates = { ...req.body };
      let oldProfilePath;

      if (req.file) {
        oldProfilePath = (await Customer.findById(req.params.id))?.CusProfile;
        updates.CusProfile = req.file.path;
      }

      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).select('-CusPassword');

      if (!customer) {
        if (req.file) await fs.unlink(req.file.path).catch(console.error);
        return res.status(404).json({ message: 'Customer not found' });
      }

      // Delete old profile picture if updated
      if (oldProfilePath && oldProfilePath !== 'default-profile.jpg') {
        await fs.unlink(oldProfilePath).catch(console.error);
      }

      res.json(customer);

    } catch (err) {
      if (req.file?.path) await fs.unlink(req.file.path).catch(console.error);
      res.status(500).json({ message: 'Update failed', error: err.message });
    }
  }
);

// @route   DELETE /api/customers/:id
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Delete profile picture if exists
    if (customer.CusProfile && customer.CusProfile !== 'default-profile.jpg') {
      await fs.unlink(customer.CusProfile).catch(console.error);
    }

    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
});

export default router;