import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice';
import {
	useDeleteProductMutation,
	useGetProductByIdQuery,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';

const UpdateProduct = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data: productData } = useGetProductByIdQuery(params._id);
	const { data: categories = [] } = useGetCategoriesQuery();
	console.log(productData);

	const [image, setImage] = useState(productData?.image || '');
	const [name, setName] = useState(productData?.name || '');
	const [description, setDescription] = useState(
		productData?.description || ''
	);
	const [price, setPrice] = useState(productData?.price || '');
	const [category, setCategory] = useState(productData?.category || '');
	const [quantity, setQuantity] = useState(productData?.quantity || '');
	const [brand, setBrand] = useState(productData?.brand || '');

	const [uploadProductImage] = useUploadProductImageMutation();
	const [updateProduct] = useUpdateProductMutation();
	const [deleteProduct] = useDeleteProductMutation();

	useEffect(() => {
		if (productData && productData._id) {
			setName(productData.name);
			setDescription(productData.description);
			setPrice(productData.price);
			setCategory(productData.category?._id);
			setQuantity(productData.quantity);
			setBrand(productData.brand);
			setImage(productData.image);
		}
	}, [productData]);

	return <div>UpdateProduct</div>;
};

export default UpdateProduct;
