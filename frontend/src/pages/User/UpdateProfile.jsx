import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useUpdateProfileMutation } from '../../redux/api/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Profile = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { userInfo } = useSelector((state) => state.auth);
	const [updateProfile, { isLoading: loadingUpdateProfile }] =
		useUpdateProfileMutation();

	useEffect(() => {
		setUsername(userInfo.username);
		setEmail(userInfo.email);
	}, [userInfo.username, userInfo.email]);

	const dispatch = useDispatch();
	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) toast.error('Passwords do not match');
		else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					username,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success('Profile updated successfully');
			} catch (error) {
				toast.error(error?.data?.message || error.message);
			}
		}
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-center items-center md:flex md:space-x-4 h-[90vh]">
				<div className="md:w-1/3">
					<h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
					<form onSubmit={submitHandler}>
						<div className="mb-4">
							<label className="block text-white mb-2">Name</label>
							<input
								type="text"
								placeholder="Enter Name"
								className="form-input p-4 rounded-sm w-full"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							></input>
						</div>
						<div className="mb-4">
							<label className="block text-white mb-2">Email</label>
							<input
								type="text"
								placeholder="Enter Email"
								className="form-input p-4 rounded-sm w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></input>
						</div>
						<div className="mb-4">
							<label className="block text-white mb-2">Password</label>
							<input
								type="password"
								className="form-input p-4 rounded-sm w-full"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></input>
						</div>
						<div className="mb-4">
							<label className="block text-white mb-2">Confirm Password</label>
							<input
								type="password"
								className="form-input p-4 rounded-sm w-full"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></input>
						</div>
						<div className="flex justify-between">
							<button
								type="submit"
								className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
							>
								Update
							</button>
							<Link
								to="/user-orders"
								className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
							>
								My Orders
							</Link>
						</div>
					</form>
				</div>
				{loadingUpdateProfile && <Loader />}
			</div>
		</div>
	);
};

export default Profile;
