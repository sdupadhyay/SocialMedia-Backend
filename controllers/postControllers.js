const asyncWrapper = require("../middleware/async");
const Like = require("../models/like");
const likePost = asyncWrapper(async (req, res) => {
	const userId = req.userId;
	const postId = req.params?.postId;
	// Check if already liked
	const existingLike = await Like.findOne({ userId, postId });
	if (existingLike) {
		return res
			.status(400)
			.json({ message: "You have already liked this post" });
	}
	await Like.create({ userId, postId });
	res.status(200).json({ message: "Post liked successfully" });
});
const unlikePost = asyncWrapper(async (req, res) => {
	const userId = req.userId;
	const postId = req.params?.postId;
	// Check if like exists
	const existingLike = await Like.findOne({ userId, postId });
	if (!existingLike) {
		return res.status(400).json({ message: "You have not liked this post" });
	}
	await Like.deleteOne({ userId, postId });
	res.status(200).json({ message: "Post unliked successfully" });
});
module.exports = { likePost, unlikePost };
