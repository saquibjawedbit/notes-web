import { Router } from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonial.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getTestimonials);
router.post("/", upload.fields([
    {
        name: "image",
        maxCount: 1
    },
]), createTestimonial);

export default router;
