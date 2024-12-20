import { Router } from "express";
import { getSubject, getChapters, getNotes, readNote } from "../controllers/subject.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//All Routes Are Protected
router.route("/read/:id").get(verifyJWT, readNote);
router.route("/:grade/:subject").get(verifyJWT, getChapters);
router.route("/:grade").get(verifyJWT,getSubject);
router.route("/:grade/:subject/:chapter").get(verifyJWT, getNotes);

export default router;