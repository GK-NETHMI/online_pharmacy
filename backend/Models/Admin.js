import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema(
    {
        AdID:{
            type: String,
            required: true,
        },
        AdName:{
            type: String,
            required: true,
        },
        AdEmail:{
            type: String,
            required: true,
        },
        AdPhone:{
            type: String,
            required: true,
        },
        AdAddress:{
            type: String,
            required: true,
        },
        AdPassword:{
            type: String,
            required: true,
        },
        Adage:{
            type: Number,
            required: true,
        },
        AdGender:{
            type: String,
            required: true,
        },
        AdProfile:{
            type: String,
        },
    }
)

export const Admin = mongoose.model('Customer', AdminSchema);