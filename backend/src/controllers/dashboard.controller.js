import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Subject } from "../models/subject.model.js";

const createSubject = asyncHandler(async (req, res) => {
    const {name, grade, chapters} = req.body;

    const thumbnailPath = req.files['thumbnail'][0].path;

    // Ensure all required fields are present
    if(!name || !grade || !chapters) {
        throw new ApiError(400, "name, grade and chapters are required");
    }

    //Jsonify chapter
    const chapterObject = JSON.parse(chapters);

    //Upload thumbnail
    const thumbnailUrl = await uploadOnCloudinary(thumbnailPath);

    //Create a chapter schema
    const subject = await Subject.create({
        name,
        grade,
        chapters: chapterObject,
        thumbnail: thumbnailUrl.secure_url,
    });


    const uid = subject._id;

    return res.status(201).json(
        new ApiResponse(201, uid, "Subject Created Successfully"),
    );
});

const uploadNotes = asyncHandler(async (req, res) => {
    const {title, description, price, isPublished} = req.body;

    const thumbnail = req.files["thumbnail"][0].path;

    const notes = req.files["pdfFile"][0].path;

    // Check if all required fields are present
    if(!title || !price || !notes) {
        throw new ApiError(400, "Title, Price and Notes are required");
    }

    //Upload Notes and Thumbnail to Cloudinary
    const pdfUrl = await uploadOnCloudinary(notes);

    //If thumbnail is present then upload it to Cloudinary
    let thumbnailUrl = "";
    if(thumbnail) {
        thumbnailUrl = await uploadOnCloudinary(thumbnail);
    }

    //Create a new Note in Database

    const note = await Note.create({
        pdfFile: pdfUrl.secure_url,
        thumbnail: thumbnailUrl.secure_url,
        title,
        description,
        price,
        isPublished,
    });


    const uid = note._id;

    return res.status(201).json(
        new ApiResponse(201, uid, "Notes Uploaded Successfully")
    );
});

export { createSubject, uploadNotes };