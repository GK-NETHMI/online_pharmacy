import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Add mongoose import

// Routes imports
import CustomerRoute from './Routes/CustomerRoute.js';
import ProductRoute from './Routes/ProductRoute.js';
import EmpRoute from './Routes/EmpRoute.js';
import OrderRoute from './Routes/OrderRoute.js';

// Initialize Express
const app = express();

// Environment Configuration - LOAD FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// Verify critical environment variables
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined or not loaded from .env");
  process.exit(1);
} else {
  console.log("JWT_SECRET loaded successfully");
}

if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined");
  process.exit(1);
}

// Database Connection - PLACE THIS BEFORE ROUTES
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/customer', CustomerRoute);
app.use('/product', ProductRoute);
app.use('/emp', EmpRoute);
app.use('/order', OrderRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

startServer();