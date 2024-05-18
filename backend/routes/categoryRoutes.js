import express from 'express';
import {
	createCategory,
	deleteCategory,
	getCategory,
	listCategories,
	updateCategory,
} from '../controllers/categoryController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router
	.route('/')
	.post(authenticate, authorizeAdmin, createCategory)
	.get(listCategories);
router
	.route('/:categoryId')
	.put(authenticate, authorizeAdmin, updateCategory)
	.delete(authenticate, authorizeAdmin, deleteCategory)
	.get(getCategory);

export default router;
