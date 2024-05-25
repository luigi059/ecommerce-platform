import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { getLikesFromLocalStorage } from '../utils/localStorage';
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import likesReducer from './features/likes/likeSlice';

const initialLikes = getLikesFromLocalStorage() || [];

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		likes: likesReducer,
	},
	preloadedState: {
		likes: initialLikes,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

setupListeners(store.dispatch);
export default store;
