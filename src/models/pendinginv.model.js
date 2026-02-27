import mongoose from "mongoose";

const pendinginvSchema = new mongoose.Schema(
    {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier", 
      required: true,
    },

    invoiceDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    commitmentDate: {
      type: Date, 
      required: false,
    },

    description: {
      type: String,
      trim: true,
    },

    documents: [
      {
        docName: {
          type: String,
        },
        fileUrl: {
          type: String,
        },
        fileType: {
          type: String,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

  },
  { timestamps: true }
);



const PendingInv = mongoose.model("PendingInv", pendinginvSchema);

export default PendingInv;