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
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
            required: true,
        },
        purchasedBy: {
            type: [mongoose.Schema.Types.ObjectId], //Array of ObjectIds referencing Users
            ref: "User",
            default: [],
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