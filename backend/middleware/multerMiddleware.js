const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "complaints",
    resource_type: "auto", // auto-detect file type
    format: file.mimetype.split("/")[1], // Extract file format
  }),
});

const upload = multer({ storage });

module.exports = upload;
