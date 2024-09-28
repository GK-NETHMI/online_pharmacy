import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, mongoDBURL } from './config.js';


const app = express();
app.use(express.json());
app.use(cors());

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
    