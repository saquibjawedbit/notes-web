import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    video: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
