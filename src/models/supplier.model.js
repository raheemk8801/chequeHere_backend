import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        s_name: {
            type: String,
            required: true,
            trim: true,
        },
        s_pst: {
            type: String,
            required: false,
        },
        s_website: {
            type: String,
            required: false,
        },
        s_phone: {
            type: String,
            required: false,
        },
        s_email: {
            type: String,
            required: false,
            lowercase: true,
        },
        s_address: {
            type: String,
            required: false,
        },

    },
    { timestamps: true }
);


const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;