import { CATEGORY_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const categoryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createCategory: builder.mutation({
			query: (newCategory) => ({
				url: `${CATEGORY_URL}`,
				method: 'POST',
				body: newCategory,
			}),
		}),
		updateCategory: builder.mutation({
			query: ({ categoryId, updatedCategory }) => ({
				url: `${CATEGORY_URL}/${categoryId}`,
				method: 'PUT',
				body: updatedCategory,
			}),
		}),
		deleteCategory: builder.mutation({
			query: (categoryId) => ({
				url: `${CATEGORY_URL}/${categoryId}`,
				method: 'POST',
			}),
		}),
		getCategories: builder.mutation({
			query: () => `${CATEGORY_URL}/categories`,
		}),
	}),
});

export const {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useFetchCategoryMutation,
} = categoryApiSlice;
