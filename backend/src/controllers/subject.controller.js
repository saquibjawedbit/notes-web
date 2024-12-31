import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Subject } from "../models/subject.model.js";
import { Note } from "../models/note.model.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import { Transaction } from "../models/transaction.model.js";
import axios from "axios";

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

    const chapterData = chapters.chapters.filter((data) => data.name == chapter);

    if(chapterData.length == 0) {
        throw new ApiError(400, "Chapter does not exist");
    }

    const listOfNotes = chapterData[0].notes;


    const result = await Promise.all(listOfNotes.map(async (data) => {
        const note = await Note.findById(data).select("-pdfFile -isPublished");
    
        if (!note) {
            throw new ApiError(400, "Something went wrong");
        }
    
        return note;
    }));

    return res.status(200).json(
        new ApiResponse(200, result, "Note Fetched Successfully")
    );
});

const readNote = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;

        //Check if id is null
        if(!id) {
            throw new ApiError(400, "Id is Required");
        }

        //Check if this id exist in user PurchasedPdf
        const user = req.user;
        const isPurchased = user.purchasedPdf.includes(id);

        if(!isPurchased) {
            throw new ApiError(401, "Protected Content");
        }

        // Search for transaction
        const transaction = await Transaction.findOne({noteId: id, userId: user._id}).select("status");

        if(transaction.status != "authorized") {
            throw new ApiError(401, "Protected Content");
        }

        const noteObject = await Note.findById(id).select("pdfFile");

        const pdfUrl = noteObject.pdfFile;
        const response = await axios.get(pdfUrl, {
            responseType: 'stream',
            
        });

        // Headers for displaying the PDF in the browser
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="secure.pdf"');

        // Pipe the Cloudinary PDF stream directly to the client
        response.data.pipe(res);
    }
    catch (error) {
        console.error('Error streaming PDF from Cloudinary:', error);
        res.status(500).send('Failed to fetch the PDF');
    }
});


export {getSubject, getChapters, getNotes, readNote};