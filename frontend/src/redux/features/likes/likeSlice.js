import { createSlice } from '@reduxjs/toolkit';

const likeSlice = createSlice({
	name: 'likes',
	initialState: [],
	reducers: {
		addToLikes: (state, action) => {
			// Checkif the product is not already liked
			if (!state.some((product) => product._id === action.payload._id)) {
				state.push(action.payload);
			}
		},
		removeFromLikes: (state, action) => {
			// Remove the product with the matching ID
			return state.filter((product) => product._id !== action.payload._id);
		},
		setLikes: (state, action) => {
			// Set the liked products from localStorage
			return action.payload;
		},
	},
});

export const { addToLikes, removeFromLikes, setLikes } = likeSlice.actions;
export const selectLikedProducts = (state) => state.likes;
export default likeSlice.reducer;
