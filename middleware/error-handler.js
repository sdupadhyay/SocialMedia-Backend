const { CustomError } = require("../error/customErrors");

const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res
			.status(err.statusCode)
			.json({ messge: err?.message, status: err.statusCode });
	}
	return res
		.status(500)
		.json({ message: err?.message, status: err?.statusCode });
};
module.exports = errorHandlerMiddleware;
