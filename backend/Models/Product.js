import mongoose from "mongoose";

// Define the Product Schema
const ProductSchema = new mongoose.Schema(
    {
        PID: {
            type: String,
            unique: true
        },
        PName: {
            type: String,
            required: true
        },
        PDescription: {
            type: String,
            required: true
        },
        PPrice: {
            type: Number,
            required: true
        },
        PQuantity: {
            type: Number,
            required: true
        },
        PCategory: {
            type: String,
            required: true
        },
        PImage: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true // To add createdAt and updatedAt timestamps automatically
    }
);

// Pre-save hook to generate PID with a custom pattern before saving
ProductSchema.pre('save', async function (next) {
    if (!this.PID) {
        // Example of generating a unique PID like 'PRD-XXXXXX' where X is a random number
        const randomID = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
        this.PID = `PRD-${randomID}`;

        // Optionally: Ensure uniqueness by checking the database (if you want to avoid random collision)
        const existingProduct = await mongoose.models.Product.findOne({ PID: this.PID });
        if (existingProduct) {
            return next(new Error('PID collision detected, please try again.'));
        }
    }
    next();
});

// Create and export the Product model
export const Product = mongoose.model("Product", ProductSchema);
