import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
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
        chapters: [
            {
                type: chapterSchema,
                required: true
            }
        ],
    },
    {
        timestamps: true,
    }
);

subjectSchema.pre('find', function(next) {
    this.populate('chapters.notes');
    next();
});

export const Subject = mongoose.model("Subject", subjectSchema);
