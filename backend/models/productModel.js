import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		review: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const productSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		image: { type: String, required: true },
		brand: { type: String, required: true },
		quantity: { type: Number, required: true },
		category: { type: ObjectId, ref: 'Category', required: true },
		description: { type: String, required: true },
		reviews: [reviewSchema],
		description: { type: String, required: true },
		numReviews: { type: String, required: true, default: 0 },
		price: { type: String, required: true, default: 0 },
		stock: { type: String, required: true, default: 0 },
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
