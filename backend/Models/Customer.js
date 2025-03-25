import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CustomerSchema = new mongoose.Schema({
  CusID: {
    type: String,
    unique: true,
    immutable: true,
  },
  CusName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
  },
  CusEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  CusPhone: {
    type: String,
    required: [true, "Phone is required"],
    match: [/^\d{10}$/, "Phone must be 10 digits"],
  },
  CusAddress: {
    type: String,
    required: [true, "Address is required"],
  },
  CusPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  CusAge: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Minimum age is 18"],
    max: [100, "Maximum age is 100"],
  },
  CusGender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female", "Other"],
  },
  CusProfile: {
    type: String,
    default: "default-profile.jpg",
  },
}, { timestamps: true });

// Auto-generate CusID
CustomerSchema.pre("save", async function (next) {
  if (!this.CusID) {
    const count = await mongoose.model("Customer").countDocuments();
    this.CusID = `CUS${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

// Hash password before saving
CustomerSchema.pre("save", async function (next) {
  if (!this.isModified("CusPassword")) return next();
  this.CusPassword = await bcrypt.hash(this.CusPassword, 12);
  next();
});

// Method to compare passwords
CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.CusPassword);
};

export const Customer = mongoose.model("Customer", CustomerSchema);