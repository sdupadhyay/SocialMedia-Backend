const jwt = require("jsonwebtoken");
const generateToken = (userData) => {
	const token = jwt.sign(userData, process.env.TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_EXPIRE,
	});
	return token;
};

module.exports = { generateToken };
