import express from 'express';
import {
	createUser,
	getAllUsers,
	getCurrentUserProfile,
	loginUser,
	logoutUser,
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authenticate, authorizeAdmin, getAllUsers);
router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authenticate, getCurrentUserProfile);

export default router;
