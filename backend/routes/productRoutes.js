import express from 'express';
import formidable from 'express-formidable';
import { createProduct } from '../controllers/productController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

const router = express.Router();
router
	.route('/')
	.post(authenticate, authorizeAdmin, formidable(), createProduct);

export default router;
