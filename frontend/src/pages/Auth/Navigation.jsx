import { useState } from 'react';
import {
	AiOutlineHome,
	AiOutlineLogin,
	AiOutlineShopping,
	AiOutlineShoppingCart,
	AiOutlineUserAdd,
} from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/api/userApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { resetCart } from '../../redux/features/cart/cartSlice';
import { resetLikes } from '../../redux/features/likes/likeSlice';
import LikesCount from '../Products/LikesCount';
import './Navigation.css';

const Navigation = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [showSideBar, setShowSideBar] = useState(false);

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();
	const logoutHandler = async () => {
		try {
			dispatch(resetCart());
			dispatch(resetLikes());
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			style={{ zIndex: 999 }}
			className={`${
				setShowSideBar ? 'hidden' : 'flex'
			} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
			id="navigation-container"
		>
			<div className="flex flex-col justify-center space-y-4">
				<Link
					to="/"
					className="flex items-center transition-transform transform hover:translate-x-2"
				>
					<AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
					<span className="hidden nav-item-name mt-[3rem]">HOME</span> {''}
				</Link>
				{/* SHOP */}
				<Link
					to="/shop"
					className="flex items-center transition-transform transform hover:translate-x-2"
				>
					<AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
					<span className="hidden nav-item-name mt-[3rem]">SHOP</span>{' '}
				</Link>
				{/* CART */}
				<Link to="/cart" className="flex relative">
					<div className="flex items-center transition-transform transform hover:translate-x-2">
						<AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
						<span className="hidden nav-item-name mt-[3rem]">Cart</span>{' '}
					</div>

					<div className="absolute top-9">
						{cartItems.length > 0 && (
							<span>
								<span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
									{cartItems.reduce((a, c) => a + c.qty, 0)}
								</span>
							</span>
						)}
					</div>
				</Link>
				{/* FAVOURITES */}
				<Link to="/favourites" className="flex relative">
					<div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
						<FaHeart className="mt-[3rem] mr-2" size={20} />
						<span className="hidden nav-item-name mt-[3rem]">
							Favourites
						</span>{' '}
						<LikesCount />
					</div>
				</Link>
			</div>

			<div className="relative">
				<button
					onClick={toggleDropdown}
					className="flex items-center text-gray-8000 focus:outline-none"
				>
					{userInfo ? (
						<span className="text-white">{userInfo.username}</span>
					) : (
						<></>
					)}
					{userInfo && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-4 w-4 ml-1 ${
								dropdownOpen ? 'transform rotate-180' : ''
							}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
							/>
						</svg>
					)}
				</button>

				{dropdownOpen && userInfo && (
					<ul
						className={`absolute right-0 mt-2 mr-14 space-y-2 bg-[#151515] text-white rounded-lg ${
							!userInfo.isAdmin ? '-top-20' : '-top-80'
						}`}
					>
						{userInfo.isAdmin && (
							<>
								<li>
									<Link
										to="/admin/dashboard"
										className="block px-4 py-2 hover:bg-[#313131]"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to="/admin/products"
										className="block px-4 py-2 hover:bg-[#313131]"
									>
										Products
									</Link>
								</li>
								<li>
									<Link
										to="/admin/categorylist"
										className="block px-4 py-2 hover:bg-[#313131]"
									>
										Category
									</Link>
								</li>
								<li>
									<Link
										to="/admin/userlist"
										className="block px-4 py-2 hover:bg-[#313131]"
									>
										Users
									</Link>
								</li>
							</>
						)}
						<li>
							<Link
								to="/my-orders"
								className="block px-4 py-2 hover:bg-[#313131]"
							>
								My Orders
							</Link>
						</li>
						<li>
							<Link
								to="/profile"
								className="block px-4 py-2 hover:bg-[#313131]"
							>
								Profile
							</Link>
						</li>
						<li>
							<button
								onClick={logoutHandler}
								className="block w-full px-4 py-2 text-left hover:bg-[#313131]"
							>
								Logout
							</button>
						</li>
					</ul>
				)}
				{!userInfo && (
					<ul>
						<li>
							<Link
								to="/login"
								className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
							>
								<AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
								<span className="hidden nav-item-name">LOGIN</span>
							</Link>
						</li>
						<li>
							<Link
								to="/register"
								className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
							>
								<AiOutlineUserAdd size={26} />
								<span className="hidden nav-item-name">REGISTER</span>
							</Link>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default Navigation;
