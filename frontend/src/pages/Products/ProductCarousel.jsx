import moment from 'moment';
import { FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Message from '../../components/Message';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<div className="mb-4 lg:block xl:block md:block">
			{isLoading ? null : error ? (
				<Message variant="danger">
					{error?.data?.message || error.error}
				</Message>
			) : (
				<div className="lg:block xl:block md:hidden sm:hidden">
					<Slider
						{...settings}
						className="xl:w-[40rem]  lg:w-[30rem] md:w-[20rem] sm:w-[10rem] "
					>
						{products.map(
							({
								image,
								_id,
								name,
								price,
								description,
								brand,
								createdAt,
								numReviews,
								rating,
								quantity,
							}) => (
								<div key={_id}>
									<img
										src={image}
										alt={name}
										className="w-full rounded-lg object-cover h-[30rem]"
									/>

									<div className="mt-4 flex justify-between">
										<div className="one">
											<h2>{name}</h2>
											<p> $ {price}</p> <br /> <br />
											<p className="w-[25rem]">
												{description.substring(0, 170)} ...
											</p>
										</div>

										<div className="flex justify-between w-[20rem]">
											<div className="one">
												<h1 className="flex items-center mb-6">
													<FaStore className="mr-2 text-white" /> Brand: {brand}
												</h1>
												<h1 className="flex items-center mb-6">
													<FaClock className="mr-2 text-white" /> Added:
													{moment(createdAt).fromNow()}
												</h1>
												<h1 className="flex items-center mb-6">
													<FaStar className="mr-2 text-white" /> Reviews:
													{numReviews}
												</h1>
											</div>

											<div className="two">
												<h1 className="flex items-center mb-6">
													<FaStar className="mr-2 text-white" /> Ratings:
													{Math.round(rating)}
												</h1>
												<h1 className="flex items-center mb-6">
													<FaShoppingCart className="mr-2 text-white" />{' '}
													Quantity:
													{quantity}
												</h1>
											</div>
										</div>
									</div>
								</div>
							)
						)}
					</Slider>
				</div>
			)}
		</div>
	);
};

export default ProductCarousel;
