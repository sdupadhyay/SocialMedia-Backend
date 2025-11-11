require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRouter");
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use(errorHandlerMiddleware);
connectDB();
app.listen(PORT, () => {
	console.log(`Server Started runnung at Port ${PORT}`);
});
