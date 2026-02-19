import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
    {
       date: {
            type: Date,
            required: true,
        },
        total_cash: {
            type: Number,
            required: true,
            min: 0,
        },
        total_debit: {
            type: Number,
            required: true,
            min: 0,
        },
        total_etransfer: {
            type: Number,
            required: true,
            min: 0,
        },
        total_credit: {
            type: Number,
            required: true,
            min: 0,
        },
        
    },
    { timestamps: true }
);


const Sales = mongoose.model("Sales", salesSchema);

export default Sales;