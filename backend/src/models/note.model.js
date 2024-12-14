import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const noteScheme = new mongoose.Schema(
    {
        pdfFile: {
            type: String, //Cloudinary URL
            required: true,
        },
        thumbnail: {
            type: String, //Cloudinary URL
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        purchased: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean, 
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

noteScheme.plugin(mongooseAggregatePaginate);

export const Note = mongoose.model("Note", noteScheme);