import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Note } from "../models/note.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Subject } from "../models/subject.model.js";

const createSubject = asyncHandler(async (req, res) => {
    const {name, grade} = req.body;
    let {chapters} = req.body;

    // Enhanced file validation
    if (!req.files || !req.files['thumbnail'] || !req.files['thumbnail'][0]) {
        throw new ApiError(400, "Subject thumbnail is required");
    }

    const thumbnail = req.files['thumbnail'][0];
    if (!thumbnail.mimetype.includes('image')) {
        throw new ApiError(400, "Invalid file type for thumbnail. Only images are allowed");
    }

    const thumbnailPath = req.files['thumbnail'][0].path;

    // Ensure all required fields are present
    if(!name || !grade || !chapters) {
        throw new ApiError(400, "name, grade and chapters are required");
    }

    // Parse the chapters string into an object
    try {
        chapters = JSON.parse(chapters);
    } catch (error) {
        throw new ApiError(400, "Invalid chapters format");
    }

    //Upload thumbnail
    const thumbnailUrl = await uploadOnCloudinary(thumbnailPath);

    //Create a chapter schema
    const subject = await Subject.create({
        name,
        grade,
        chapters,
        thumbnail: thumbnailUrl.secure_url,
    });


    const uid = subject._id;

    return res.status(201).json(
        new ApiResponse(201, uid, "Subject Created Successfully"),
    );
});

const uploadNotes = asyncHandler(async (req, res) => {
    // Enhanced file validation
    if (!req.files || 
        !req.files.pdfFile || 
        !req.files.pdfFile[0] || 
        !req.files.thumbnail || 
        !req.files.thumbnail[0]) {
        throw new ApiError(400, "Both PDF file and thumbnail are required");
    }

    // Validate file types
    const pdfFile = req.files.pdfFile[0];
    const thumbnail = req.files.thumbnail[0];

    if (!pdfFile.mimetype.includes('pdf')) {
        throw new ApiError(400, "Invalid file type for PDF. Only PDF files are allowed");
    }

    if (!thumbnail.mimetype.includes('image')) {
        throw new ApiError(400, "Invalid file type for thumbnail. Only images are allowed");
    }

    const { title, description, price } = req.body;
    
    if (!title || !description || !price) {
        throw new ApiError(400, "All fields are required");
    }

    // Access files safely
    const pdfFilePath = req.files.pdfFile[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;

    // Upload files to Cloudinary
    const pdfUpload = await uploadOnCloudinary(pdfFilePath);
    const thumbnailUpload = await uploadOnCloudinary(thumbnailPath);

    if (!pdfUpload || !thumbnailUpload) {
        throw new ApiError(500, "Error while uploading files");
    }

    // Create note with Cloudinary URLs
    const note = await Note.create({
        title,
        description,
        price,
        pdfFile: pdfUpload.secure_url,
        thumbnail: thumbnailUpload.secure_url
    });

    return res.status(201).json(
        new ApiResponse(201, note._id, "Note created successfully")
    );
});

const getSubjectsByGrade = asyncHandler(async (req, res) => {
    const { grade } = req.params;

    if (!grade) {
        throw new ApiError(400, "Grade parameter is required");
    }

    const subjects = await Subject.find({ grade })
        .populate({
            path: 'chapters.notes',
            select: 'title price thumbnail' // Select the fields you want to show
        });

    if (!subjects || subjects.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, [], "No subjects found for this grade")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, subjects, "Subjects fetched successfully")
    );
});

const deleteSubject = asyncHandler(async (req, res) => {
    const { subjectId } = req.params;

    // Find subject to get all note IDs
    const subject = await Subject.findById(subjectId);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    // Collect all note IDs from chapters
    const noteIds = subject.chapters.reduce((acc, chapter) => {
        return acc.concat(chapter.notes);
    }, []);

    // Delete all associated notes
    await Note.deleteMany({ _id: { $in: noteIds } });

    // Delete the subject
    await Subject.findByIdAndDelete(subjectId);

    return res.status(200).json(
        new ApiResponse(200, null, "Subject and associated notes deleted successfully")
    );
});

const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Note deleted successfully")
    );
});

const updateNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const { title, description, price } = req.body;
    
    let updateData = { title, description, price };
    
    // Handle file updates if present
    if (req.files) {
        if (req.files.pdfFile) {
            updateData.pdfFile = req.files.pdfFile[0].path;
        }
        if (req.files.thumbnail) {
            updateData.thumbnail = req.files.thumbnail[0].path;
        }
    }

    const note = await Note.findByIdAndUpdate(
        noteId,
        updateData,
        { new: true }
    );

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(
        new ApiResponse(200, note, "Note updated successfully")
    );
});

const updateChapter = asyncHandler(async (req, res) => {
    const { subjectId, chapterIndex } = req.params;
    const { name } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    subject.chapters[chapterIndex].name = name;
    await subject.save();

    return res.status(200).json(
        new ApiResponse(200, subject, "Chapter updated successfully")
    );
});

const deleteChapter = asyncHandler(async (req, res) => {
    const { subjectId, chapterIndex } = req.params;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    // Get note IDs from the chapter
    const noteIds = subject.chapters[chapterIndex].notes;
    
    // Delete all notes in the chapter
    await Note.deleteMany({ _id: { $in: noteIds } });
    
    // Remove chapter from subject
    subject.chapters.splice(chapterIndex, 1);
    await subject.save();

    return res.status(200).json(
        new ApiResponse(200, null, "Chapter and associated notes deleted successfully")
    );
});

const getNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(
        new ApiResponse(200, note, "Note fetched successfully")
    );
});

const addChapter = asyncHandler(async (req, res) => {
    const { subjectId } = req.params;
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "Chapter name is required");
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    subject.chapters.push({
        name,
        notes: []
    });

    await subject.save();
    
    // Fetch updated subject with populated notes
    const updatedSubject = await Subject.findById(subjectId).populate('chapters.notes');

    return res.status(200).json(
        new ApiResponse(200, updatedSubject, "Chapter added successfully")
    );
});

const addNoteToChapter = asyncHandler(async (req, res) => {
    const { subjectId, chapterIndex } = req.params;
    const { noteId } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    subject.chapters[chapterIndex].notes.push(noteId);
    await subject.save();

    return res.status(200).json(
        new ApiResponse(200, subject, "Note added to chapter successfully")
    );
});

export { 
    createSubject, 
    uploadNotes, 
    getSubjectsByGrade, 
    deleteSubject, 
    deleteNote,
    updateNote,
    updateChapter,
    deleteChapter,
    getNote,
    addChapter,
    addNoteToChapter
};