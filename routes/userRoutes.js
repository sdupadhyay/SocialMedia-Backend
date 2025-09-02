const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { followUser, unfollowUser } = require("../controllers/userControllers");
const router = express.Router();
router.get("/follow", authMiddleware, followUser);
router.get("/unfollow", authMiddleware, unfollowUser);
module.exports = router;
