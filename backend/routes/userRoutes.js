import express from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getCurrentUserProfile,
	getUserById,
	loginUser,
	logoutUser,
	updateUser,
	updateUserById,
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authenticate, authorizeAdmin, getAllUsers);
router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router
	.route('/profile')
	.get(authenticate, getCurrentUserProfile)
	.put(authenticate, updateUser);

// Admin Routes
router
	.route('/:id')
	.delete(authenticate, authorizeAdmin, deleteUser)
	.get(authenticate, authorizeAdmin, getUserById)
	.put(authenticate, authorizeAdmin, updateUserById);

export default router;
