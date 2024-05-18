import asyncHandler from '../middlewares/asyncHandler.js';
import Category from '../models/categoryModel.js';

const createCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	if (!name.trim()) return res.status(400).json({ error: 'Name is required' });

	const existingCategory = await Category.findOne({ name: name });
	if (existingCategory) return res.json({ error: 'Category already exists' });

	const category = await new Category({ name }).save();
	res.json(category);
});

export { createCategory };
