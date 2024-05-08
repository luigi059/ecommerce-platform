import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: true,
		maxAge: 15 * 24 * 60 * 60 * 1000,
	});
	return token;
};
export default generateToken;
