// Add a product to a localStorage
export const addLikeToLocalStorage = (product) => {
	const likes = getLikesFromLocalStorage();
	if (!likes.some((p) => p._id === product._id)) {
		likes.push(product);
		localStorage.setItem('likes', JSON.stringify(likes));
	}
};

// Remove  product from a localStorage
export const removeLikeFromLocalStorage = (productId) => {
	const likes = getLikesFromLocalStorage();
	const updateLikes = likes.filter((product) => product._id !== productId);

	localStorage.setItem('likes', JSON.stringify(updateLikes));
};

// Retrive likes from a localStorage
export const getLikesFromLocalStorage = () => {
	const likesJSON = localStorage.getItem('likes');
	return likesJSON ? JSON.parse(likesJSON) : [];
};
