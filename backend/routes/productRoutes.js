import express from 'express';
import formidable from 'express-formidable';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

const router = express.Router();

export default router;
