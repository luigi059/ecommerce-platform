import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import {
	useCreateProductMutation,
	useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';

const ProductList = () => {
	return <div>ProductList</div>;
};

export default ProductList;
