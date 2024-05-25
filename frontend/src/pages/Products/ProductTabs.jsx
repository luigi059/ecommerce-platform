import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import Ratings from './Ratings';
import SmallProduct from './SmallProduct';

const ProductTabs = ({
	loadingProductReview,
	userInfo,
	submitHandler,
	rating,
	setRating,
	review,
	setReview,
	product,
}) => {
	const { data, isLoading } = useGetTopProductsQuery();
	const [activeTab, setActiveTab] = useState(1);
	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col md:flex-row">
			<section className="mr-[5rem]">
				<div
					className={`flex-1 p-4 cursor-pointer text-lg ${
						activeTab === 1 ? 'font-bold' : ''
					}`}
					onClick={() => handleTabClick(1)}
				>
					Create a Review
				</div>
				<div
					className={`flex-1 p-4 cursor-pointer text-lg ${
						activeTab === 2 ? 'font-bold' : ''
					}`}
					onClick={() => handleTabClick(2)}
				>
					All Reviews
				</div>
				<div
					className={`flex-1 p-4 cursor-pointer text-lg ${
						activeTab === 3 ? 'font-bold' : ''
					}`}
					onClick={() => handleTabClick(3)}
				>
					Related Products
				</div>
			</section>
			{/* Second Part */}
			<section>
				{activeTab === 1 && (
					<div className="mt-4">
						{userInfo ? (
							<form onSubmit={submitHandler}>
								<div className="my-2">
									<label htmlFor="rating" className="block text-xl mb-2">
										Rating
									</label>

									<select
										id="rating"
										required
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										className="p-2 border rounded-lg xl:w-[40rem] bg-[#101011]"
									>
										<option value="">Select</option>
										<option value="1">Inferior</option>
										<option value="2">Decent</option>
										<option value="3">Great</option>
										<option value="4">Excellent</option>
										<option value="5">Exceptional</option>
									</select>
								</div>

								<div className="my-2">
									<label htmlFor="review" className="block text-xl mb-2">
										Review
									</label>

									<textarea
										id="review"
										rows="3"
										required
										value={review}
										onChange={(e) => setReview(e.target.value)}
										className="p-2 border rounded-lg xl:w-[40rem] bg-[#101011]"
									></textarea>
								</div>
								<button
									type="submit"
									disabled={loadingProductReview}
									className="bg-pink-600 text-white py-2 px-4 rounded-lg"
								>
									Submit
								</button>
							</form>
						) : (
							<p>
								Please <Link to="/login">sign in</Link> to write a review
							</p>
						)}
					</div>
				)}
			</section>
		</div>
	);
};

export default ProductTabs;
