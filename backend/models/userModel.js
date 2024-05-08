import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			uniqe: true,
			required: true,
		},
		email: {
			type: String,
			uniqe: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
