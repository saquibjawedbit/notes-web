import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Testimonial } from "../models/testimonial.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find();
    if (!testimonials) {
        throw new ApiError(404, "No testimonials found");
    }

    return res.status(200).json(
        new ApiResponse(200, testimonials, "Testimonials fetched successfully")
    );
});

const createTestimonial = asyncHandler(async (req, res) => {
    const { name, role, image, text, rating, video } = req.body;

    if (!name || !role || !text || !rating || !video) {
        throw new ApiError(400, "All fields are required");
    }  

    if(!req.files || !req.files.image || !req.files.image[0]) {
        throw new ApiError(400, "Image is required");
    }
    
    // Upload image to cloudinary
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].path);
    if (!uploadedImage) {
        throw new ApiError(400, "Image upload failed");
    }
    const imageUrl = uploadedImage.url;

    const testimonial = await Testimonial.create({
        name,
        role,
        image: imageUrl,
        text,
        rating,
        video
    });

    return res.status(201).json(
        new ApiResponse(201, testimonial, "Testimonial created successfully")
    );
});

const updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, role, image, text, rating, video } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
        throw new ApiError(404, "Testimonial not found");
    }
    let nImage = null;
    if(req.files && req.files.image && req.files.image[0]) {
        await deleteFromCloudinary(testimonial.image);
        // Upload image to cloudinary
        const uploadedImage = await uploadOnCloudinary(req.files.image[0].path);
        if (!uploadedImage) {
            throw new ApiError(400, "Image upload failed");
        }
        const imageUrl = uploadedImage.url;
        testimonial.image = imageUrl;
        nImage = imageUrl;
    }

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.image = nImage || testimonial.image;
    testimonial.text = text || testimonial.text;
    testimonial.rating = rating || testimonial.rating;
    testimonial.video = video || testimonial.video;

    await testimonial.save();

    return res.status(200).json(
        new ApiResponse(200, testimonial, "Testimonial updated successfully")
    );
});

const deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
        throw new ApiError(404, "Testimonial not found");
    }

    await testimonial.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, "Testimonial deleted successfully")
    );
});

export { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
