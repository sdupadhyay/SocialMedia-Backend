const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	try {
		const token = req?.cookies?.token;
		if (!token) {
			return res.status(401).json({ message: "Not authorized, token missing" });
		}
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!decodedToken) {
			return res
				.status(401)
				.json({ message: "Not authorized, invalid token data" });
		}
		req.userId = decodedToken?.userId;
		next();
	} catch (err) {
		console.log("TOken Error:", err);
		return res
			.status(401)
			.json({ message: "Not authorized, invalid or expired token" });
	}
};
module.exports = authMiddleware;
