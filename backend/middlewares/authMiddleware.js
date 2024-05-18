import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		return res.status(401).json({ error: 'Not authorized' });
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decoded.userId).select('-password');
	if (!req.user) {
		return res.status(404).json({ error: 'User not found' });
	}
	next();
});

const authorizeAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) next();
	else res.status(401).json({ error: 'Need Admin Privileges' });
};

export { authenticate, authorizeAdmin };
