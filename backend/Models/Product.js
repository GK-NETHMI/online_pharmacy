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
        },
    },
    {
        timestamps: true // To add createdAt and updatedAt timestamps automatically
    }
);

// Auto-generate PID with pattern "Product001", "Product002", ...
ProductSchema.pre("save", async function (next) {
    if (!this.PID) {
        const lastProduct = await mongoose.model("Product").findOne().sort({ PID: -1 });
        let newID = "Product001"; // Default if no products exist

        if (lastProduct && lastProduct.PID) {
            const lastNumber = parseInt(lastProduct.PID.replace("Product", ""), 10);
            const nextNumber = lastNumber + 1;
            newID = `Product${String(nextNumber).padStart(3, "0")}`;
        }

        this.PID = newID;
    }
    next();
});

// Create and export the Product model
export const Product = mongoose.model("Product", ProductSchema);
