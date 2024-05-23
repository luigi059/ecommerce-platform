import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice';
import {
	useCreateProductMutation,
	useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';

const ProductList = () => {
	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [brand, setBrand] = useState('');
	const [stock, setStock] = useState(0);
	const [imageUrl, setImageUrl] = useState(null);
	const navigate = useNavigate();

	const [uploadProductImage] = useUploadProductImageMutation();
	const [createProduct] = useCreateProductMutation();
	const { data: categories } = useGetCategoriesQuery();

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
			setImageUrl(res.image);
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<div className="container xl:mx-[9rem] sm:mx-[0]">
			<div className="flex flex-col md:flex-row">
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
						<div className="flex justify-between">
							{/* Stock */}
							<div>
								<label htmlFor="stock">Count in Stock</label> <br />
								<input
									type="text"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									value={stock}
									onChange={(e) => setStock(e.target.value)}
								/>
							</div>
							{/* Category */}
							<div>
								<label htmlFor="">Category</label> <br />
								<select
									placeholder="Choose a category"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									onChange={(e) => setCategory(e.target.value)}
								>
									{categories?.map((category) => (
										<option key={category._id} value={category._id}>
											{category.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<button
							// onClick={handleSubmit}
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

export default ProductList;
