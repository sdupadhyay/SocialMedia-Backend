const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
	followUser,
	unfollowUser,
	getUserProfile,
	getUserPost,
	getUserLikedPost,
} = require("../controllers/userControllers");
const router = express.Router();
router.get("/follow", authMiddleware, followUser);
router.get("/unfollow", authMiddleware, unfollowUser);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/posts", authMiddleware, getUserPost);
router.get("/likes", authMiddleware, getUserLikedPost);
module.exports = router;
