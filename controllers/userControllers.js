const asyncWrapper = require("../middleware/async");
const User = require("../models/User");

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
module.exports = { followUser, unfollowUser };
