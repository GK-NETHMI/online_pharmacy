import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import { PORT, mongoDBURL } from './config.js';

import  CustomerRoute from './Routes/CustomerRoute.js';
import  ProductRoute from './Routes/ProductRoute.js';
import  EmpRoute from './Routes/EmpRoute.js';
import  OrderRoute from './Routes/OrderRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/customer',CustomerRoute);
app.use('/product',ProductRoute);
app.use('/emp',EmpRoute);
app.use('/order',OrderRoute);

// Serve static files from uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
  });





// Connecting to the MongoDB database
mongoose.connect(mongoDBURL)
    .then(() =>{ 
        console.log('MongoDB connected...');
        app.listen(PORT, () => {
             console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) =>{
        console.log(error);
    });
    