import { Router } from "express";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonial.controller.js";
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

router.put("/:id",verifyJWT, verifyAdmin, upload.fields([
    {
        name: 'image',
        maxCount: 1
    }
]), updateTestimonial);
router.delete("/:id",verifyJWT, verifyAdmin, deleteTestimonial);

export default router;
