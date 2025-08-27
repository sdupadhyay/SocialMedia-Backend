const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URL}/socialmedia`);
		console.log("Mongo db connected");
	} catch (err) {
		console.log("Mongo DB ERROR:", err);
	}
};
module.exports = connectDB;
