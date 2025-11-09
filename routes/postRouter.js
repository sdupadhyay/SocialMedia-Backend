const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { likePost, unlikePost, createPost } = require("../controllers/postControllers");
const upload = require("../middleware/multer");
const router = express.Router();
router.get("/like/:postId", authMiddleware, likePost);
router.delete("/unlike/:postId", authMiddleware, unlikePost);
router.post("/", authMiddleware, upload.single("image"), createPost);
module.exports = router;
