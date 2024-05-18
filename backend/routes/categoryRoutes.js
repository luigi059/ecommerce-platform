import express from 'express';
import { createCategory } from '../controllers/categoryController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.route('/').post(createCategory);

export default router;
