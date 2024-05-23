import ProductCarousel from '../pages/Products/ProductCarousel';
import SmallProduct from '../pages/Products/SmallProduct';
import { useGetTopProductsQuery } from '../redux/api/productApiSlice';
import Loader from './Loader';

const Header = () => {
	const { data, isLoading, error } = useGetTopProductsQuery();

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return <h1>ERROR</h1>;
	}

	return (
		<>
			<h1 className="ml-[10rem] my-5 text-[3rem]">Top Rated Items</h1>
			<div className="flex justify-around">
				<div className="xl:block lg:hidden md:hidden:sm:hidden">
					<div className="grid grid-cols-2">
						{data.map((product) => (
							<div key={product._id}>
								<SmallProduct product={product} />
							</div>
						))}
					</div>
				</div>
				<ProductCarousel />
			</div>
		</>
	);
};

export default Header;
