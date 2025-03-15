import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Testimonial } from "../models/testimonial.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    console.log("HEre", req.image);
    if (!name || !role || !image || !text || !rating || !video) {
        throw new ApiError(400, "All fields are required");
    }  

    if(!req.files || !req.files.image || !req.files.image[0]) {
        throw new ApiError(400, "Image is required");
    }
    req.body.image = req.files.image[0].path;

    // Check if the image is a valid URL or file path/buffer
    let imageUrl;
    if (image) {
        // If image is a local file path or buffer
        const uploadedImage = await uploadOnCloudinary(image);
        if (!uploadedImage) {
            throw new ApiError(400, "Image upload failed");
        }
        imageUrl = uploadedImage.url;
    } else {
        throw new ApiError(400, "Image is required");
    }

    // Replace the original image value with the Cloudinary URL
    req.body.image = imageUrl;

    const testimonial = await Testimonial.create({
        name,
        role,
        image,
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

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.image = image || testimonial.image;
    testimonial.text = text || testimonial.text;
    testimonial.rating = rating || testimonial.rating;
    testimonial.video = video || testimonial.video;

    await testimonial.save();

    return res.status(200).json(
        new ApiResponse(200, testimonial, "Testimonial updated successfully")
    );
});

export { getTestimonials, createTestimonial, updateTestimonial };
