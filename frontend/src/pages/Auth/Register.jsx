import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useRegisterMutation } from '../../redux/api/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();
	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) navigate(redirect);
	}, [navigate, redirect, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(username, email, password, confirmPassword);
		if (password !== confirmPassword) toast.error('Passwords do not match');
		else {
			try {
				const res = await register({
					username,
					email,
					password,
				}).unwrap();
				console.log(res);
				dispatch(setCredentials({ ...res }));
				navigate(res);
				toast.success('User successfully registered');
			} catch (error) {
				console.error(error);
				toast.error(error.data.message);
			}
		}
	};

	return (
		<section className="pl-[10rem] flex flex-wrap">
			<div className="mr-[4rem] mt-[5rem]">
				<h1 className="text-2xl font-semibold mb-4">Sign In</h1>
				<form onSubmit={submitHandler} className="container w-[40rem]">
					<div className="my-[2rem]">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-white"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							className="mt-1 p-2 border rounded w-full"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-white"
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 p-2 border rounded w-full"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-white"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="mt-1 p-2 border rounded w-full"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-white"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="mt-1 p-2 border rounded w-full"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						disabled={isLoading}
						type="submit"
						className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
					>
						{isLoading ? 'Signing Up ....' : 'Sign Up'}
					</button>
					{isLoading && <Loader />}
				</form>
				<div className="mt-4">
					<p className="text-white">
						Already have an account {''}
						<Link
							to={redirect ? `/login?redirect=${redirect}` : '/login'}
							className="text-pink-500 hover:underline"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Register;
