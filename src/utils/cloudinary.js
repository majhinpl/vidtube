import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary configuration is missing environment variables.");
}

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async function (
  localFilePath,
  resource_type = "auto"
) {
  try {
    if (!localFilePath) return null;

    // Check if file exists
    await fs.promises.access(localFilePath, fs.constants.F_OK);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resource_type,
    });

    console.log("File uploaded on cloudinary. file src : " + response.url);

    await fs.unlinkSync(localFilePath); // delete file from local server.

    return response;
  } catch (error) {
    console.log("Error on Cloudinary", error.message);
    try {
      await fs.unlinkSync(localFilePath); // delete file from local server.
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }
    return null;
  }
};

export { uploadOnCloudinary };
