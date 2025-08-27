class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}
const createCustomError = (msq, statusCode) => {
	return new CustomError(msq, statusCode);
};
module.exports = { CustomError, createCustomError };
