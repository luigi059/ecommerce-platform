import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password)
		throw new Error('Please fill in all the required fields');

	const userExists = await User.findOne({ email });
	if (userExists) res.status(400).send('User already exists');

	res.send('Hello');
});
export { createUser };
