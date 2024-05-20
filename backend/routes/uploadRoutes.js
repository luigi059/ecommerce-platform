import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/', (req, res) => {
	res.send('hello');
});

export default router;
