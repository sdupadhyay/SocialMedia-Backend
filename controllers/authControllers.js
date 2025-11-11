const { generateToken } = require("../jwt");
const asyncWrapper = require("../middleware/async");
const User = require("../models/user");
const uploadCloudinaryImage = require("../utils/cloudinary");
const options = { httpOnly: true, secure: true };
const signup = asyncWrapper(async (req, res) => {
	const avatar = req.file;
	const { firstName, lastName, email, password } = req.body;
	// 1. Basic validation
	if (!firstName || !lastName || !email || !password || !avatar) {
		return res.status(400).json({ message: "All fields are required" });
	}
	// 2. Check if user already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({ message: "Email already registered" });
	}
	const customFileName = `${Date.now()}-${avatar?.originalname}`;
	const { url } = await uploadCloudinaryImage(avatar?.buffer, customFileName);
	// 3. Create new user
	const user = new User({
		firstName,
		lastName,
		email,
		password,
		avatar: url,
	});
	await user.save();
	// 4. Generate JWT token
	const token = generateToken({ userId: user?._id });
	return res
		.status(201)
		.cookie("token", token, options)
		.json({
			message: "User Registered Successfully",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
});
const login = asyncWrapper(async (req, res) => {
	const { email, password } = req.body;
	// 1. Validate input
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password are required" });
	}

	// 2. Check if user exists
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({ message: "Invalid email or password" });
	}
	// 3. Validate password
	const isPasswordCorrect = await user.isPasswordCorrect(password);
	if (!isPasswordCorrect) {
		return res.status(400).json({ message: "Invalid password" });
	}
	// 4. Generate JWT token
	const token = generateToken({ userId: user?._id });
	return res
		.status(201)
		.cookie("token", token, options)
		.json({
			message: "Login Successfully",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
});
const logout = asyncWrapper(async (req, res) => {
	return res
		.status(200)
		.cookie("token", null, options)
		.json({ message: "Logout Successfully" });
});
module.exports = { signup, login, logout };
