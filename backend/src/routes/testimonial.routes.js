import { Router } from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonial.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import verifyAdmin from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getTestimonials);
router.post("/",verifyJWT, verifyAdmin, upload.fields([
    {
        name: "image",
        maxCount: 1
    },
]), createTestimonial);

export default router;
