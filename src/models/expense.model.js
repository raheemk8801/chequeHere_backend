import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier", 
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        description: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["Payment Scheduled", "Payment Debited"], 
            required: true,
        },
        paymentType: {
            type: String,
            enum: ["Cash", "Cheque", "Credit Card", "E Transfer"], 
            required: true,
        },
        documents: [
            {
                docName: {
                    type: String,
                    required: false,
                },
                fileUrl: {
                    type: String,
                    required: false,
                },
                fileType: {
                    type: String,
                },
                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ]

    },
    { timestamps: true }
);


const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;