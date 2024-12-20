import mongoose, { Schema } from "mongoose";

const transactionSchema = mongoose.Schema(
    {
        noteId: {
            type: Schema.Types.ObjectId,
            ref: "Note",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderId: {
            type: String,
            required: true, // Razorpay Order ID (e.g., "order_xxxxx")
        },
        paymentId: {
            type: String, // Razorpay Payment ID (e.g., "pay_xxxxx")
        },
        signature: {
            type: String, // Razorpay Signature for verifying authenticity
        },
        amount: {
            type: Number,
            required: true, // Transaction amount in the smallest currency unit (e.g., paise for INR)
        },
        currency: {
            type: String,
            required: true,
            default: 'INR', // Currency code, INR",
        },
        status: {
            type: String,
            enum: ['created', 'authorized', 'captured', 'failed', 'refunded'],
            default: 'created', // Transaction status
        },
    },
    {
        timestamps: true,
    }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);