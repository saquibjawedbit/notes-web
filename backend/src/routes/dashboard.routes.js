import { Router } from "express";
import { 
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
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-subject").post(verifyJWT, verifyAdmin, upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    },
]), createSubject);

router.route("/upload-notes").post(verifyJWT, verifyAdmin, upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    },
    {
        name: "pdfFile",
        maxCount: 1
    }
]), uploadNotes);

router.get('/subjects/:grade', verifyJWT, verifyAdmin, getSubjectsByGrade);

router.delete('/subjects/:subjectId', verifyJWT, verifyAdmin, deleteSubject);

// Note routes
router.route('/notes/:noteId')
    .get(verifyJWT, verifyAdmin, getNote)
    .delete(verifyJWT, verifyAdmin, deleteNote)
    .put(verifyJWT, verifyAdmin, upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "pdfFile", maxCount: 1 }
    ]), updateNote);

// Chapter routes
router.route('/subjects/:subjectId/chapters/:chapterIndex')
    .put(verifyJWT, verifyAdmin, updateChapter)
    .delete(verifyJWT, verifyAdmin, deleteChapter);

router.post('/subjects/:subjectId/chapters', verifyJWT, verifyAdmin, addChapter);

router.put(
    '/subjects/:subjectId/chapters/:chapterIndex/notes',
    verifyJWT,
    verifyAdmin,
    addNoteToChapter
);

export default router;