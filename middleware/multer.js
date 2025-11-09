const multer = require("multer");

// Configure multer storage (in-memory storage for simplicity)
const storage = multer.memoryStorage(); // keep file in memory buffer
const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB per image
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png, .webp files are allowed!"));
    }
  },
});
module.exports = upload;
