import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice';
import {
	useCreateProductMutation,
	useGetAllProductsQuery,
	useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import AdminMenu from './AdminMenu';

const CreateProduct = () => {
	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [brand, setBrand] = useState('');
	const [imageUrl, setImageUrl] = useState(null);
	const navigate = useNavigate();

	const [uploadProductImage] = useUploadProductImageMutation();
	const [createProduct] = useCreateProductMutation();
	const { data: categories } = useGetCategoriesQuery();
	const { refetch } = useGetAllProductsQuery();

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
			setImageUrl(res.image);
		} catch (error) {
			toast.error(error?.data.error || error.error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData();
			productData.append('image', image);
			productData.append('name', name);
			productData.append('description', description);
			productData.append('price', price);
			productData.append('category', category);
			productData.append('quantity', quantity);
			productData.append('brand', brand);

			const { data } = await createProduct(productData);

			if (data.error) {
				toast.error('Create Product Failed. Try Again.');
			} else {
				toast.success(`${data.name} is created`);
				refetch();
				navigate('/admin/products');
			}
		} catch (error) {
			console.error(error);
			toast.error('Product create failed. Try Again.');
		}
	};

	return (
		<div className="container xl:mx-[9rem] sm:mx-[0]">
			<div className="flex flex-col md:flex-row">
				<AdminMenu />
				<div className="md:w-3/4 p-3">
					<div className="h-12">Create Product</div>
					{imageUrl && (
						<div className="text-center">
							<img
								src={imageUrl}
								alt="Product Image"
								className="block mx-auto max-h-[200px]"
							/>
						</div>
					)}
					<div className="mb-3">
						{/* Image */}
						<label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
							{image ? image.name : 'Upload Image'}
							<input
								type="file"
								name="image"
								accept="image/*"
								onChange={uploadFileHandler}
								className={!image ? 'hidden' : 'text-white'}
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
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							{/* Price */}
							<div className="two ml-10">
								<label htmlFor="price">Price</label> <br />
								<input
									type="number"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap">
							{/* Brand */}
							<div className="one">
								<label htmlFor="brand">Brand</label> <br />
								<input
									type="text"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>
							{/* Quantity */}
							<div className="two ml-10">
								<label htmlFor="quantity">Quantity</label> <br />
								<input
									type="number"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
						</div>
						{/* Category */}
						<div>
							<label htmlFor="">Category</label> <br />
							<select
								className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="" disabled selected>
									Choose a category
								</option>
								{categories?.map((category) => (
									<option key={category._id} value={category._id}>
										{category.name}
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
							className="p-2 mb-3 bg-[#101011] border w-[95%] text-white"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
						<button
							onClick={handleSubmit}
							className="py-4 px-10 mt-5 rounded-lg text-lg bg-pink-600"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
