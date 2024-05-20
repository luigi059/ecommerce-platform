import asyncHandler from '../middlewares/asyncHandler.js';
import Product from '../models/productModel.js';

const createProduct = asyncHandler(async (req, res) => {
	const { name, description, price, category, quantity, brand } = req.fields;
	switch (true) {
		case !name:
			return res.status(400).json({ error: 'Name is required' });
		case !brand:
			return res.status(400).json({ error: 'Brand is required' });
		case !description:
			return res.status(400).json({ error: 'Description is required' });
		case !price:
			return res.status(400).json({ error: 'Price is required' });
		case !category:
			return res.status(400).json({ error: 'Category is required' });
		case !quantity:
			return res.status(400).json({ error: 'Quantity is required' });
	}
	const product = new Product({ ...req.fields });
	await product.save();
	res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, description, price, category, quantity, brand } = req.fields;
	switch (true) {
		case !name:
			return res.status(400).json({ error: 'Name is required' });
		case !brand:
			return res.status(400).json({ error: 'Brand is required' });
		case !description:
			return res.status(400).json({ error: 'Description is required' });
		case !price:
			return res.status(400).json({ error: 'Price is required' });
		case !category:
			return res.status(400).json({ error: 'Category is required' });
		case !quantity:
			return res.status(400).json({ error: 'Quantity is required' });
	}
	const product = await Product.findByIdAndUpdate(
		req.params.id,
		{ ...req.fields },
		{ new: true }
	);
	await product.save();
	res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(200).json('Product successfully deleted');
});

const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 6;
	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword }).limit(pageSize);

	res.status(200).json({
		products,
		page: 1,
		pages: Math.ceil(count / pageSize),
		hasMore: false,
	});
});

const getProductById = asyncHandler(async (req, res) => {
	console.log('getProductById');
	const product = await Product.findById(req.params.id);
	if (product) return res.status(200).json(product);
	else return res.status(404).json({ error: 'Product not found' });
});

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, review } = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (alreadyReviewed)
			return res.status(400).json({ error: 'Product already reviewed' });

		const newReview = {
			name: req.user.username,
			rating: Number(rating),
			review,
			user: req.user._id,
		};

		product.reviews.push(newReview);
		product.numReviews == product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;
		await product.save();

		res.status(200).json({ message: 'Review created successfully' });
	}
});

const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(4);
	res.status(200).json(products);
});

const getNewProducts = asyncHandler(async (req, res) => {
	const products = await Product.find().sort({ _id: -1 }).limit(5);
	res.json(products);
});

export {
	createProduct,
	createProductReview,
	deleteProduct,
	getNewProducts,
	getProductById,
	getProducts,
	getTopProducts,
	updateProduct,
};
