const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		avatar: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		bio: { type: String, trim: true },
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);
userSchema.pre("save", async function (next) {
	try {
		if (this.isModified("password")) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		return next(err);
	}
});
userSchema.methods.isPasswordCorrect = async function (userPassword) {
	try {
		const match = await bcrypt.compare(userPassword, this.password);
		return match;
	} catch (err) {
		throw err;
	}
};
const User = mongoose.model("User", userSchema);
module.exports = User;
