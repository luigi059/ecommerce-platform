import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password)
		return res
			.status(400)
			.json({ message: 'Please fill in all the required fields' });

	const userExists = await User.findOne({ email });
	if (userExists)
		return res.status(400).json({ message: 'User already exists' });

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = new User({ username, email, password: hashedPassword });
	await newUser.save();
	generateToken(res, newUser._id);
	res.status(201).json({
		_id: newUser._id,
		username: newUser.username,
		email: newUser.email,
		isAdmin: newUser.isAdmin,
	});
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res
			.status(400)
			.json({ message: 'Please fill in all the required fields' });

	const exisingUser = await User.findOne({ email });
	const isPasswordValid = await bcrypt.compare(password, exisingUser.password);

	if (!exisingUser || !isPasswordValid) {
		return res.status(400).json({ error: 'Invalid username or password' });
	}

	generateToken(res, exisingUser._id);
	res.status(201).json({
		_id: exisingUser._id,
		username: exisingUser.username,
		email: exisingUser.email,
		isAdmin: exisingUser.isAdmin,
	});
});

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
	res.status(200).json({ message: 'Logged out successfully' });
});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
	if (req.user)
		res
			.status(200)
			.json({
				_id: req.user._id,
				username: req.user.username,
				email: req.user.email,
			});
	else return res.status(404).json({ error: 'User not found' });
});

export {
	createUser,
	getAllUsers,
	getCurrentUserProfile,
	loginUser,
	logoutUser,
};
