/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToLikes,
	removeFromLikes,
	setLikes,
} from '../../redux/features/likes/likeSlice';

import {
	addLikeToLocalStorage,
	getLikesFromLocalStorage,
	removeLikeFromLocalStorage,
} from '../../utils/localStorage';

const LikeIcon = ({ product }) => {
	const dispatch = useDispatch();
	const likes = useSelector((state) => state.likes) || [];
	const isLiked = likes.some((p) => p._id === product._id);

	useEffect(() => {
		const favoritesFromLocalStorage = getLikesFromLocalStorage();
		dispatch(setLikes(favoritesFromLocalStorage));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleLikes = () => {
		if (isLiked) {
			dispatch(removeFromLikes(product));
			// remove the product from the localStorage as well
			removeLikeFromLocalStorage(product._id);
		} else {
			dispatch(addToLikes(product));
			// add the product to localStorage as well
			addLikeToLocalStorage(product);
		}
	};

	return (
		<div
			className="absolute top-2 right-5 cursor-pointer"
			onClick={toggleLikes}
		>
			{isLiked ? (
				<FaHeart className="text-pink-500" />
			) : (
				<FaRegHeart className="text-pink-500" />
			)}
		</div>
	);
};

export default LikeIcon;
