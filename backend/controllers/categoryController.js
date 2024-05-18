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

const updateCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const { categoryId } = req.params;

	if (!name) return res.status(400).json({ error: 'Name is required' });

	const category = await Category.findById(categoryId);
	console.log(category);
	if (!category) return res.status(400).json({ error: 'Category not found' });

	category.name = name;
	const updatedCategory = await category.save();
	res.json(updatedCategory);
});

export { createCategory, updateCategory };
