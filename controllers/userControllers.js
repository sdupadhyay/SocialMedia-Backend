const asyncWrapper = require("../middleware/async");
const User = require("../models/User");
const Post = require("../models/post");
const followUser = asyncWrapper(async (req, res) => {
	const userId = req.userId; // logged-in user (from auth middleware)
	const targetId = req.query?.id; // user to follow
	if (userId === targetId) {
		return res.status(400).json({ message: "You cannot follow yourself" });
	}
	const user = await User.findById(userId);
	const targetUser = await User.findById(targetId);
	if (!targetUser) {
		return res.status(404).json({ message: "User not found" });
	}
	// check if already following
	if (user.following.includes(targetId)) {
		return res.status(400).json({ message: "Already following this user" });
	}
	// add to following and followers
	user.following.push(targetId);
	targetUser.followers.push(userId);
	await user.save();
	await targetUser.save();
	res.status(200).json({ message: "User followed successfully" });
});
const unfollowUser = asyncWrapper(async (req, res) => {
	const userId = req.userId; // logged-in user (from auth middleware)
	const targetId = req.query?.id; // user to unfollow
	if (userId === targetId) {
		return res.status(400).json({ message: "You cannot unfollow yourself" });
	}

	const user = await User.findById(userId);
	const targetUser = await User.findById(targetId);
	console.log(user, targetUser);
	if (!targetUser) {
		return res.status(404).json({ message: "User not found" });
	}
	// check if not following
	if (!user.following.includes(targetId)) {
		return res.status(400).json({ message: "You are not following this user" });
	}
	user.following = user.following.filter((id) => id?.toString() != targetId);
	targetUser.followers = targetUser.followers.filter(
		(id) => id?.toString() != userId
	);
	await user.save();
	await targetUser.save();
	res.status(200).json({ message: "User unfollowed successfully" });
});
const getUserProfile = asyncWrapper(async (req, res) => {
	// Will get userID from auth middleware
	const userId = req.userId;
	// We will fetch user details from DB
	const user = await User.findById(userId).select("-password");
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	// Fetch post count. countDocuments is used to count number of documents matching a query
	const postCount = await Post.countDocuments({ author: userId });
	return res.status(200).json({
		name: `${user.firstName} ${user.lastName}`,
		avatar: user.avatar,
		userName: `@${user.firstName}_${user.lastName}`,
		bio: user?.bio,
		followers: user.followers.length,
		following: user.following.length,
		postCount,
	});
});
module.exports = { followUser, unfollowUser, getUserProfile };
