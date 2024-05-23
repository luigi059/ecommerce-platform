import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Product from './Products/Product';

const Home = () => {
	const { keyword } = useParams();

	const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

	return (
		<>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<Message variant="error">{error?.message}</Message>
			) : (
				<>
					{!keyword ? <Header /> : null}
					<div className="flex justify-between items-center">
						<h1 className="ml-[20rem] mt-[10rem] text-[3rem]">All Products</h1>

						<Link
							to="/shop"
							className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
						>
							Shop
						</Link>
					</div>

					<div>
						<div className="flex justify-center flex-wrap mt-[2rem]">
							{data.products.map((product) => (
								<div key={product._id}>
									<Product product={product} />
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Home;
