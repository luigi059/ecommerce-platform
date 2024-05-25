import asyncHandler from '../middlewares/asyncHandler.js';
import Category from '../models/categoryModel.js';

const createCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	if (!name.trim()) return res.status(400).json({ error: 'Name is required' });

	const existingCategory = await Category.findOne({ name: name });
	if (existingCategory) return res.json({ error: 'Category already exists' });

	const category = await new Category({ name }).save();
	res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const { categoryId } = req.params;

	if (!name) return res.status(400).json({ error: 'Name is required' });

	const category = await Category.findById(categoryId);
	if (!category) return res.status(400).json({ error: 'Category not found' });

	category.name = name;
	const updatedCategory = await category.save();
	res.status(200).json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
	await Category.findByIdAndDelete(req.params.categoryId);
	res.status(200).json('Category Deleted');
});

const listCategories = asyncHandler(async (req, res) => {
	console.log('Hi There');
	const categories = await Category.find({});
	res.status(200).json(categories);
});

const getCategory = asyncHandler(async (req, res) => {
	const category = await Category.find({ _id: req.params.categoryId });
	res.status(200).json(category);
});

export {
	createCategory,
	deleteCategory,
	getCategory,
	listCategories,
	updateCategory,
};
