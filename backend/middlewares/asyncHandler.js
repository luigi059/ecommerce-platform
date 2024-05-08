const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((err) => {
		console.log(err);
		return res.status(500).json({ message: 'Internal Server Error' });
	});
};
export default asyncHandler;
