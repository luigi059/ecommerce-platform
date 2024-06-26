import express from 'express';
import formidable from 'express-formidable';
import {
	createProduct,
	createProductReview,
	deleteProduct,
	getAllProducts,
	getFilteredProducts,
	getNewProducts,
	getProductById,
	getProducts,
	getTopProducts,
	updateProduct,
} from '../controllers/productController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

const router = express.Router();
router
	.route('/')
	.post(authenticate, authorizeAdmin, formidable(), createProduct)
	.get(getProducts);
router.get('/top', getTopProducts);
router.get('/new', getNewProducts);
router.get('/allproducts', getAllProducts);
router.post('/filtered-products', getFilteredProducts);
router
	.route('/:id')
	.put(authenticate, authorizeAdmin, formidable(), updateProduct)
	.delete(authenticate, authorizeAdmin, deleteProduct)
	.get(getProductById);
router.route('/:id/reviews').post(authenticate, createProductReview);

export default router;
