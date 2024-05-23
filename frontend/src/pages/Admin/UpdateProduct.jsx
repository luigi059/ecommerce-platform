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
import AdminMenu from './AdminMenu';

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

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('image', image);
			formData.append('name', name);
			formData.append('description', description);
			formData.append('price', price);
			formData.append('category', category);
			formData.append('quantity', quantity);
			formData.append('brand', brand);

			const { data } = await updateProduct({ productId: params._id, formData });

			if (data.error) {
				console.log(data);
				toast.error('Create Product Failed. Try Again.');
			} else {
				toast.success(`${data.name} is created`);
				navigate('/');
			}
		} catch (error) {
			console.error(error);
			toast.error('Product create failed. Try Again.');
		}
	};

	return (
		<>
			<div className="container  xl:mx-[9rem] sm:mx-[0]">
				<div className="flex flex-col md:flex-row">
					<AdminMenu />
					<div className="md:w-3/4 p-3">
						<div className="h-12">Update / Delete Product</div>

						{/* Image */}
						{image && (
							<div className="text-center">
								<img
									src={image}
									alt="product"
									className="block mx-auto w-[20rem] h-[15rem]"
								/>
							</div>
						)}
						<div className="mb-3">
							<label className="text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
								{image ? image.name : 'Upload image'}
								<input
									type="file"
									name="image"
									accept="image/*"
									onChange={uploadFileHandler}
									className="text-white"
								/>
							</label>
						</div>

						<div className="p-3">
							<div className="flex flex-wrap">
								{/* Name */}
								<div className="one">
									<label htmlFor="name">Name</label> <br />
									<input
										type="text"
										className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								{/* Price */}
								<div className="two">
									<label htmlFor="price">Price</label> <br />
									<input
										type="number"
										className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
										value={price}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
							</div>

							<div className="flex flex-wrap">
								{/* Quantity */}
								<div>
									<label htmlFor="quantity">Quantity</label> <br />
									<input
										type="number"
										min="1"
										className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
										value={quantity}
										onChange={(e) => setQuantity(e.target.value)}
									/>
								</div>
								{/* Brand */}
								<div>
									<label htmlFor="brand">Brand</label> <br />
									<input
										type="text"
										className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
										value={brand}
										onChange={(e) => setBrand(e.target.value)}
									/>
								</div>
							</div>
							{/* Category */}
							<div>
								<label htmlFor="category">Category</label> <br />
								<select
									placeholder="Choose Category"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
									onChange={(e) => setCategory(e.target.value)}
								>
									<option value="" disabled selected>
										Choose a category
									</option>
									{categories?.map((c) => (
										<option key={c._id} value={c._id}>
											{c.name}
										</option>
									))}
								</select>
							</div>
							{/* Description */}
							<label htmlFor="description" className="my-5">
								Description
							</label>
							<textarea
								type="text"
								className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>

							<div className="">
								<button
									onClick={handleSubmit}
									className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
								>
									Update
								</button>
								<button
									// onClick={handleDelete}
									className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateProduct;
