import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        CusID: {
            type: String,
            unique: true
        },
        CusName: {
            type: String,
            required: true
        },
        CusEmail: {
            type: String,
            required: true
        },
        CusPhone: {
            type: String,
            required: true
        },
        CusAddress: {
            type: String,
            required: true
        },
        CusPassword: {
            type: String,
            required: true
        },
        CusAge: {
            type: Number,
            required: true
        },
        CusGender: {
            type: String,
            required: true
        },
        CusProfile: {
            type: String
        },
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Auto-generate CusID with pattern "Cus0001M", "Cus0002M", ...
CustomerSchema.pre("save", async function (next) {
    if (!this.CusID) {
        const lastCustomer = await mongoose.model("Customer").findOne().sort({ CusID: -1 });
        let newID = "Cus0001M"; // Default if no customers exist

        if (lastCustomer && lastCustomer.CusID) {
            const lastNumber = parseInt(lastCustomer.CusID.replace("Cus", "").replace("M", ""), 10);
            const nextNumber = lastNumber + 1;
            newID = `Cus${String(nextNumber).padStart(4, "0")}M`;
        }

        this.CusID = newID;
    }
    next();
});

// Create and export the Customer model
export const Customer = mongoose.model("Customer", CustomerSchema);
