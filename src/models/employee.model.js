import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        e_name: {
            type: String,
            required: true,
            trim: true,
        },
        e_sin: {
            type: String,
            required: false,
        },
        e_availability: {
            type: String,
            required: false,
        },
        e_phone: {
            type: String,
            required: true,
        },
        e_email: {
            type: String,
            required: false,
            lowercase: true,
        },
        e_address: {
            type: String,
            required: false,
        },
        e_documents: [
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


const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;