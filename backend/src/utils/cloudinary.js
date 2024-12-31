import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promise-based fs methods

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });

        console.log("File has been uploaded successfully to Cloudinary", response.url);
        await fs.unlink(localFilePath); // Remove the local file after successful upload
        return response; // Return the response object
    } 
    catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Attempt to remove the local file in case of upload failure
        try {
            await fs.unlink(localFilePath);
        } catch (fsError) {
            console.error("Error deleting local file:", fsError);
        }

        return null; // Return null or propagate the error, depending on the use case
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return null;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };