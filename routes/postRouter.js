const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { likePost, unlikePost } = require("../controllers/postControllers");
const router = express.Router();
router.get("/like/:postId", authMiddleware, likePost);
router.delete("/unlike/:postId", authMiddleware, unlikePost);
module.exports = router;
