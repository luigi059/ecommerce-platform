import moment from 'moment';
import { useState } from 'react';
import {
	FaBox,
	FaClock,
	FaShoppingCart,
	FaStar,
	FaStore,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
	useCreateReviewMutation,
	useGetProductDetailsQuery,
} from '../../redux/api/productApiSlice';
import { addToCart } from '../../redux/features/cart/cartSlice';
import LikeIcon from './LikeIcon';
import ProductTabs from './ProductTabs';
import Ratings from './Ratings';

const ProductDetails = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');

	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	const { userInfo } = useSelector((state) => state.auth);
	const [createReview, { isLoading: loadingProductReview }] =
		useCreateReviewMutation();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await createReview({
				productId,
				rating,
				review,
			}).unwrap();
			refetch();
			toast.success('Review created successfully');
		} catch (error) {
			console.log(error);
			toast.error(error?.data.error || error.message);
		}
	};

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};

	return (
		<>
			<div>
				<Link
					to="/"
					className="text-white font-semibold hover:underline ml-[10rem]"
				>
					Go Back
				</Link>
			</div>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data?.message || error.message}
				</Message>
			) : (
				<>
					<div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
						<div>
							<img
								src={product.image}
								alt={product.name}
								className="w-full xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
							/>

							<LikeIcon product={product} />
						</div>
						<div className="flex flex-col justify-between">
							<h2 className="text-2xl font-semibold">{product.name}</h2>
							<p className="my-2 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
								{product.description}
							</p>

							<p className="text-2xl my-4 font-extrabold">€ {product.price}</p>

							<div className="flex items-center justify-between w-[20rem]">
								<div className="w-[100%]">
									<h1 className="flex items-center mb-1">
										<FaStore className="mr-2 text-white" /> Brand:{' '}
										{product.brand}
									</h1>
									<h1 className="flex items-center mb-1">
										<FaClock className="mr-2 text-white" /> Added:{' '}
										{moment(product.createAt).fromNow()}
									</h1>
									<h1 className="flex items-center mb-1 w-[20rem]">
										<FaShoppingCart className="mr-2 text-white" /> In Stock:{' '}
										{product.quantity}
									</h1>
								</div>
							</div>
							{/* Ratings */}
							<div className="flex justify-between flex-wrap mb-2">
								{product.numReviews > 0 ? (
									<Ratings
										value={product.rating}
										text={`${product.numReviews}`}
									/>
								) : (
									<h1>There are no reviews for this product</h1>
								)}
							</div>
							{/* Add To Cart */}
							<div className="btn-container">
								<button
									onClick={addToCartHandler}
									disabled={product.countInStock === 0}
									className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
								>
									Add To Cart
								</button>
							</div>
						</div>
						{/* Product Tabs */}
						<div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
							<ProductTabs
								loadingProductReview={loadingProductReview}
								userInfo={userInfo}
								submitHandler={submitHandler}
								rating={rating}
								setRating={setRating}
								review={review}
								setReview={setReview}
								product={product}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProductDetails;
