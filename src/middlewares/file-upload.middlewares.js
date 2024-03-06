const multer = require("multer");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const upload = multer({ storage: multer.memoryStorage() });

const fileUploadMiddleware = (req, res, next) => {
  // Use upload.single() for single file upload and upload.array() for multiple file upload
  const uploadMiddleware = req.files
    ? upload.array("files")
    : upload.single("file");

  uploadMiddleware(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error("Multer error:", err);
        return res.status(500).json({ message: "File upload failed" });
      } else if (err) {
        // An unknown error occurred
        console.error("Unknown error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }

      // Check if files were uploaded
      if (!req.files && !req.file) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Upload files to Cloudinary and get URLs
      const fileUrls = await Promise.all(
        (req.files || [req.file]).map(async (file) => {
          const result = await uploadOnCloudinary(file.buffer, "uploads");
          return { url: result.secure_url, publicId: result.public_id };
        })
      );

      // Attach file URLs to request object for further processing
      req.fileUrls = fileUrls;
      next();
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = fileUploadMiddleware;
