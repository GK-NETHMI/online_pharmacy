import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        OID: {
            type: String,
            unique: true
        },
        OName: {
            type: String,
            required: true
        },
        OPrice: {
            type: Number,
            required: true
        },
        OQuantity: {
            type: Number,
            required: true
        },
        OCategory: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Auto-generate OID with pattern "Order01", "Order02", ...
OrderSchema.pre("save", async function (next) {
    if (!this.OID) {
        const lastOrder = await mongoose.model("Order").findOne().sort({ OID: -1 });
        let newID = "Order01"; // Default if no orders exist

        if (lastOrder && lastOrder.OID) {
            const lastNumber = parseInt(lastOrder.OID.replace("Order", ""), 10);
            const nextNumber = lastNumber + 1;
            newID = `Order${String(nextNumber).padStart(2, "0")}`;
        }

        this.OID = newID;
    }
    next();
});

// Create and export the Order model
export const Order = mongoose.model("Order", OrderSchema);
