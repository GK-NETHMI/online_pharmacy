import mongoose from "mongoose";

const EmpSchema = new mongoose.Schema(
    {
        EmpID: {
            type: String,
            unique: true
        },
        EmpName: {
            type: String,
            required: true,
        },
        EmpEmail: {
            type: String,
            required: true,
        },
        EmpPhone: {
            type: String,
            required: true,
        },
        EmpAddress: {
            type: String,
            required: true,
        },
        EmpPassword: {
            type: String,
            required: true,
        },
        EmpAge: {
            type: Number,
            required: true,
        },
        EmpGender: {
            type: String,
            required: true,
        },
        EmpProfile: {
            type: String,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Auto-generate AdID with pattern "Emp001", "Emp002", ...
EmpSchema.pre("save", async function (next) {
    if (!this.EmpID) {
        const lastEmp = await mongoose.model("Employee").findOne().sort({ EmpID: -1 });
        let newID = "Emp001"; // Default if no admins exist

        if (lastEmp && lastEmp.EmpID) {
            const lastNumber = parseInt(lastEmp.EmpID.replace("Emp", ""), 10);
            const nextNumber = lastNumber + 1;
            newID = `Emp${String(nextNumber).padStart(3, "0")}`;
        }

        this.EmpID = newID;
    }
    next();
});

// Create and export the Admin model
export const Emp = mongoose.model("Employee", EmpSchema);
