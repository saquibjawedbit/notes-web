import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds referencing Notes
        ref: "Note", 
        default: [],
    },
});

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        grade: {
            type: String,
            enum: ["IX", "X", "XI", "XII", "JEE", "NEET"],
            required: true,
            index: true
        },
        chapters: {
            type: [chapterSchema], // Array of chapter objects
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Subject = mongoose.model("Subject", subjectSchema);
