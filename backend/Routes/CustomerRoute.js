import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Customer } from "../models/Customer.js";
import multer from "multer";
import path from "path";
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Secure JWT secret check
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("Missing/insecure JWT_SECRET in .env");
}

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

// Helper functions
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// @route   POST /api/customers/register
router.post(
  '/register',
  upload.single('CusProfile'),
  [
    body('CusName').trim().notEmpty().isLength({ min: 3 }),
    body('CusEmail').isEmail().normalizeEmail(),
    body('CusPhone').matches(/^\d{10}$/),
    body('CusPassword').isLength({ min: 8 }),
    body('CusAge').isInt({ min: 18, max: 100 }),
    body('CusGender').isIn(['Male', 'Female', 'Other']),
    body('CusAddress').notEmpty()
  ],
  async (req, res) => {
    try {
      validateRequest(req, res);

      const { CusEmail } = req.body;
      if (await Customer.findOne({ CusEmail })) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const customer = new Customer({
        ...req.body,
        CusProfile: req.file?.path || 'default-profile.jpg'
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
      // Clean up uploaded file if registration fails
      if (req.file?.path) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      res.status(500).json({ message: 'Registration failed', error: err.message });
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