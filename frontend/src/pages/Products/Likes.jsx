import { useSelector } from 'react-redux';
import { selectLikedProducts } from '../../redux/features/likes/likeSlice';
import Product from './Product';

const Likes = () => {
	const likes = useSelector(selectLikedProducts);

	return (
		<div className="ml-[10rem]">
			<h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
				Your Favourite Products
			</h1>

			<div className="flex flex-wrap">
				{likes.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Likes;
