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

export { createProduct, updateProduct };
