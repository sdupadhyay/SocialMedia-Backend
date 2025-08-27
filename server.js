const express = require("express");
const connectDB = require("./db");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use(errorHandlerMiddleware);
connectDB();
app.listen(PORT, () => {
	console.log(`Server Started runnung at Port ${PORT}`);
});
