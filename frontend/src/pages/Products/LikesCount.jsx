import { useSelector } from 'react-redux';

const LikesCount = () => {
	const likes = useSelector((state) => state.likes);
	const likeCount = likes.length;

	return (
		<div className="absolute left-2 top-8">
			{likeCount > 0 && (
				<span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
					{likeCount}
				</span>
			)}
		</div>
	);
};

export default LikesCount;
