import { Router } from "express";
import { createSubject, uploadNotes } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import {  upload } from "../middlewares/multer.middleware.js";

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

export default router;