const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadCloudinaryImage = async (fileBuffer) => {
	return new Promise((res, rej) => {
		const theTransformStream = cloudinary.uploader.upload_stream(
			{ folder: "avatars" },
			(err, result) => {
				if (err) return rej(err);
				res(result);
			}
		);
		let str = Readable.from(fileBuffer);
		str.pipe(theTransformStream);
		//console.log("theTransformStream", theTransformStream);
	});
};
module.exports = uploadCloudinaryImage;
