import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const extname = path.extname(file.originalname);
		cb(null, `${file.filename}-${Date.now()}${extname}`);
	},
});

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpe?g|png|webp/;
	const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
	const extname = path.extname(file.originalname).toLocaleLowerCase();
	const mimetype = file.mimetype;

	if (fileTypes.test(extname) && mimetypes.test(mimetype)) cb(null, true);
	else cb(new Error('Only Images Files Supported'), false);
};

const upload = multer({ storage, fileFilter });
const uploadStorage = upload.single('image');

router.post('/', (req, res) => {
	uploadSingleImage(req, res, (err) => {
		if (err) res.status(400).send({ message: err.message });
		else if (req.file) {
			res.status(200).send({
				message: 'Image uploaded successfully!',
				image: `/${req.file.path}`,
			});
		} else res.status(404).send({ message: 'No Image Found' });
	});
});

export default router;
