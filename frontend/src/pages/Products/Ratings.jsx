/* eslint-disable react/prop-types */
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = ({ value, text }) => {
	const fullStars = Math.floor(value);
	const halfStars = value - fullStars > 0.5 ? 1 : 0;
	const emptyStar = 5 - fullStars - halfStars;

	return (
		<div className="flex items-center">
			{[...Array(fullStars)].map((_, index) => (
				<FaStar key={index} className="ml-1" fill="gold" />
			))}

			{halfStars === 1 && <FaStarHalfAlt className="ml-1" />}
			{[...Array(emptyStar)].map((_, index) => (
				<FaRegStar key={index} className="ml-1" fill="gold" />
			))}

			<span className="rating-text ml-{2rem} text-white"> {text}</span>
		</div>
	);
};

Ratings.defaultProps = {
	color: 'yellow-500',
};

export default Ratings;
