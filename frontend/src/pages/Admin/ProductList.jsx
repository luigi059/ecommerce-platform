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

	const [useUploadProductImage] = useUploadProductImageMutation();
	const [createProduct] = useCreateProductMutation();
	const { data: categories } = useGetCategoriesQuery();

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
						<label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
							{image ? image.name : 'Upload Image'}
							<input
								type="file"
								name="image"
								accept="image/*"
								//onChange={uploadFileHandler}
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
							<div className="two">
								<label htmlFor="price">Price</label> <br />
								<input
									type="number"
									className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
