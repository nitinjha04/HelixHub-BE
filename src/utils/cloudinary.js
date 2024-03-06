require("dotenv").config();
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// TO upload the file to cloudinay

const uploadOnCloudinary = async (fileBuffer, folder) => {
  try {
    if (!fileBuffer) return null;
    const response = await cloudinary.uploader.upload(fileBuffer, {
      folder: folder,
      resource_type: "auto",
    });
    try {
      return response;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    return null;
  }
};

// To delete the file from cloudinary

const deleteOnCloudinary = async (uploadFileId) => {
  try {
    if (!uploadFileId) return null;
    const response = await cloudinary.api.delete_resources(
      [`${uploadFileId}`],
      {
        type: "upload",
        resource_type: "auto",
      }
    );
    try {
      return response;
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    return null;
  }
};

module.exports = { uploadOnCloudinary, deleteOnCloudinary };
