import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";
import { razorpay } from "../utils/payementHandler.js";
import { Transaction } from "../models/transaction.model.js";
import crypto from "crypto";

const createOrder = asyncHandler(async (req, res) => {
    const { noteId } = req.body;

    if (!noteId) {
        throw new ApiError(400, "Note ID is required");
    }


    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    const amount = note.price * 100;

    const options = {
        amount,
        currency: "INR",
        receipt: `order_rcptid_${noteId}`,
    };

    const order = await razorpay.orders.create(options);

    const response = {...order, key_id: process.env.RAZORPAY_API_KEY, name: "HR Science", description: "Notes Purchase"};


    res.status(200).json(new ApiResponse(200, order, "Order created successfully"));
});

const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, noteId, amount } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database comes here
        const transaction = new Transaction({
            noteId: noteId,
            userId: req.user._id,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount: amount,
            status: "authorized",
        });
        try {
            await transaction.save();
        } catch (error) {
            console.error("Transaction save error:", error);
            throw new ApiError(500, "Failed to save transaction");
        }


        req.user.transactionHistory.push(transaction._id);
        req.user.purchasedPdf.push(noteId);


        await req.user.updateOne({ transactionHistory: req.user.transactionHistory, purchasedPdf: req.user.purchasedPdf });

        return res.status(200).json(new ApiResponse(200, transaction, "Payment verified successfully"));
    } else {
        throw ApiError(400, "Payment verification failed");
    }
});

export { createOrder, verifyPayment };