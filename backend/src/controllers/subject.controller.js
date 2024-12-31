import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Subject } from "../models/subject.model.js";
import { Note } from "../models/note.model.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

const getSubject = asyncHandler(async (req, res) => {
    const {grade} = req.params;


    //Grade is null
    if(!grade) {
        throw new ApiError('Grade is Required');
    }

    // Fetch 20 Subjects by finding Grade
    const subjects = await Subject.aggregate([
        { $match: { grade } },
        { 
            $project: { 
                chaptersCount: { $size: "$chapters" },
                _id: 1,
                name: 1,
                thumbnail: 1,
                grade: 1
            } 
        },
        { $limit: 20 }
    ]);

    // No Subject with this name exists
    if(subjects.length == 0) {
        throw new ApiError(404, "Grade with this name does not exist")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, subjects, "Subject Fetched Successfully"),
    );
});

const getChapters = asyncHandler(async (req, res) => {
    const {grade, subject} = req.params;

    //Check for all fields
    if(!grade || !subject) {
        throw new ApiError(400, "Grade and Subject are required");
    }

    const chapters = await Subject.findOne({grade, name: subject}).select("chapters");

    return res.status(200)
    .json(
        new ApiResponse(200, chapters, "Chapter Fetched Successfully"),
    );
});

const getNotes = asyncHandler(async (req, res) => {
    const {grade, subject, chapter} = req.params;

    const user = req.user;

    // Get all the chapters
    const chapters = await Subject.findOne({grade, name: subject}).select("chapters");

    //Throw Error if chapter is null
    if(!chapters) {
        throw new ApiError(400, "Chapter does not exist");
    }

    const listOfNotes = chapters.chapters;


    const result = await Promise.all(listOfNotes.map(async (data) => {
        const note = await Note.findById(data.notes).select("-pdfFile -isPublished");
    
        if (!note) {
            throw new ApiError(400, "Something went wrong");
        }
    
        let isPurchased = false;
        if (user.purchasedPdf.find((pdf) => pdf._id === data.notes)) {
            isPurchased = true;
        }
    
        return {
            note, isPurchased
        };
    }));


    return res.status(200).json(
        new ApiResponse(200, result, "Note Fetched Successfully")
    );
});

const readNote = asyncHandler(async (req, res) => {
    const {id} = req.params;

    //Check if id is null
    if(!id) {
        throw new ApiError(400, "Id is Required");
    }

    //Check if this id exist in user PurchasedPdf
    const user = req.user;

    const isPurchased = user.purchasedPdf.find((pdf) => pdf._id === data.notes);

    if(!isPurchased) {
        throw new ApiError(401, "Protected Content");
    }

    // Find the note

    const note = Note.findById(id);

    if(!note) {
        throw new ApiError(404, "Content not found");
    }

    // Recheck
    const isPurchasedD = note.purchasedBy.find((pdf) => pdf._id === user._id);

    if(!isPurchased) {
        throw new ApiError(401, "Protected Content");
    }

    // Convert the Mongoose document to a plain JavaScript object
    const noteObject = note.toObject();

    // Remove sensitive fields
    delete noteObject.purchasedBy;
    delete userObject.isPublished;

    return res.status(200)
    .json(
        new ApiResponse(200, noteObject ,"Note Fetched Successfully")
    );
});


export {getSubject, getChapters, getNotes, readNote};