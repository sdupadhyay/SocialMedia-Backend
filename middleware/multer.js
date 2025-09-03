const multer = require("multer");

// Configure multer storage (in-memory storage for simplicity)
const storage = multer.memoryStorage(); // keep file in memory buffer
const upload = multer({ storage });
module.exports = upload;
