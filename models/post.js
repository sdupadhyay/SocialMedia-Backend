const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		image: { type: String }, // URL or file path
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
