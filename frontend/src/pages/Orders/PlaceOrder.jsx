import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ProgressSteps from '../../components/ProgressSteps';
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice';
import { clearCartItems } from '../../redux/features/cart/cartSlice';

const PlaceOrder = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const [createOrder, { isLoading }] = useCreateOrderMutation();

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping');
		}
	}, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();
			dispatch(clearCartItems());
			navigate(`/order/${res._id}`);
		} catch (error) {
			toast.error(error?.data?.error || error.message);
		}
	};

	return (
		<>
			<ProgressSteps step1 step2 step3 />

			<div className="container mt-8 flex flex-col items-center justify-center">
				{cart.cartItems.length === 0 ? (
					<Message>Your cart is empty</Message>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr>
									<td className="py-2 text-left align-top">Image</td>
									<td className="py-2 text-left">Product</td>
									<td className="py-2 text-left">Quantity</td>
									<td className="py-2 text-left">Price</td>
									<td className="py-2 text-left">Total</td>
								</tr>
							</thead>

							<tbody>
								{cart.cartItems.map((item, index) => (
									<tr key={index}>
										<td>
											<img
												src={item.image}
												alt={item.name}
												className="w-16 h-16 object-cover"
											/>
										</td>

										<td>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</td>
										<td>{item.qty}</td>
										<td>{item.price.toFixed(2)}</td>
										<td>€ {(item.qty * item.price).toFixed(2)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				<div className="mt-8 w-[90vw]">
					<h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
					<div className="flex justify-between flex-wrap p-4 bg-[#181818]">
						<ul className="text-lg">
							<li>
								<span className="font-semibold mb-4">Items:</span> €
								{cart.itemsPrice}
							</li>
							<li>
								<span className="font-semibold mb-4">Shipping:</span> €
								{cart.shippingPrice}
							</li>
							<li>
								<span className="font-semibold mb-4">Tax:</span> €
								{cart.taxPrice}
							</li>
							<li>
								<span className="font-semibold mb-4">Total:</span> €
								{cart.totalPrice}
							</li>
						</ul>

						<div>
							<h2 className="text-2xl font-semibold mb-4">Shipping</h2>
							<p>
								<strong>Address:</strong> {cart.shippingAddress.address},{' '}
								{cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country}
							</p>
						</div>

						<div>
							<h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
							<strong>Method:</strong> {cart.paymentMethod}
						</div>
					</div>

					<button
						type="button"
						className={`${
							cart.cartItems.length === 0 ? 'opacity-40' : ''
						} bg-pink-500 text-white py-2 px-2 rounded-full text-lg w-full mt-4`}
						disabled={cart.cartItems.length === 0}
						onClick={placeOrderHandler}
					>
						Place Order
					</button>

					{isLoading && <Loader />}
				</div>
			</div>
		</>
	);
};

export default PlaceOrder;
