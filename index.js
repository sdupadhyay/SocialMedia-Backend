require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const errorHandlerMiddleware = require("./middleware/error-handler");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());
 const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 5, // max 5 requests
	message: "Too many login/signup attempts. Try again later.",
	standardHeaders: true,
	legacyHeaders: false,
  });
   const generalRateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 50, // 50 requests per min
  });
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use("/api/v1/auth",authRateLimiter, authRoutes);
app.use(generalRateLimiter)
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use(errorHandlerMiddleware);
connectDB();
app.listen(PORT, () => {
	console.log(`Server Started runnung at Port ${PORT}`);
});
