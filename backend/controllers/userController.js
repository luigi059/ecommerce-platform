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
	if (!exisingUser) {
		return res.status(400).json({ error: 'Invalid username or password' });
	}

	const isPasswordValid = await bcrypt.compare(password, exisingUser.password);
	if (!isPasswordValid) {
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
		res.status(200).json({
			_id: req.user._id,
			username: req.user.username,
			email: req.user.email,
		});
	else return res.status(404).json({ error: 'User not found' });
});

const updateUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	const user = await User.findById(req.user._id);
	if (user) {
		user.username = username || user.username;
		user.email = email || user.email;

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			isAdmin: updateUser.isAdmin,
		});
	} else return res.status(404).json({ error: 'User not found' });
});

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		if (user.isAdmin)
			return res.status(400).json({ error: 'Cannot delete an admin user' });
		await User.deleteOne({ _id: user._id });
		res.status(200).json({ message: 'User deleted successfully' });
	} else return res.status(404).json({ error: 'User not found' });
});

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) res.status(200).json(user);
	else return res.status(404).json({ error: 'User not found' });
});

const updateUserById = asyncHandler(async (req, res) => {
	const { username, email, isAdmin } = req.body;
	const user = await User.findById(req.params.id);
	if (user) {
		user.username = username || user.username;
		user.email = email || user.email;

		if (isAdmin) user.isAdmin = Boolean(isAdmin);
		else user.isAdmin = false;
		/* 			return res
				.status(404)
				.json({ error: 'Please fill in all the required fields' }); */

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			isAdmin: updateUser.isAdmin,
		});
	} else return res.status(404).json({ error: 'User not found' });
});

export {
	createUser,
	deleteUser,
	getAllUsers,
	getCurrentUserProfile,
	getUserById,
	loginUser,
	logoutUser,
	updateUser,
	updateUserById,
};
