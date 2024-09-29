import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema(
    {
        CusID:{
            type: String,
            required: true,
        },
        CusName:{
            type: String,
            required: true,
        },
        CusEmail:{
            type: String,
            required: true,
        },
        CusPhone:{
            type: String,
            required: true,
        },
        CusAddress:{
            type: String,
            required: true,
        },
        CusPassword:{
            type: String,
            required: true,
        },
        CusAge:{
            type: Number,
            required: true,
        },
        CusGender:{
            type: String,
            required: true,
        },
        CusProfile:{
            type: String,
        },
    }
)

export const Customer = mongoose.model('Customer', CustomerSchema);