import asyncHandler from '../middlewares/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Utility Function
function calcPrices(orderItems) {
	const itemsPrice = orderItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxRate = 0.15;
	const taxPrice = (itemsPrice * taxRate).toFixed(2);

	const totalPrice = (
		itemsPrice +
		shippingPrice +
		parseFloat(taxPrice)
	).toFixed(2);

	return {
		itemsPrice: itemsPrice.toFixed(2),
		shippingPrice: shippingPrice.toFixed(2),
		taxPrice,
		totalPrice,
	};
}

const createOrder = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	}

	const itemsFromDB = await Product.find({
		_id: { $in: orderItems.map((x) => x._id) },
	});

	const dbOrderItems = orderItems.map((itemFromClient) => {
		const matchingItemFromDB = itemsFromDB.find(
			(itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
		);

		if (!matchingItemFromDB) {
			res.status(404);
			throw new Error(`Product not found: ${itemFromClient._id}`);
		}

		return {
			...itemFromClient,
			product: itemFromClient._id,
			price: matchingItemFromDB.price,
			_id: undefined,
		};
	});

	const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
		calcPrices(dbOrderItems);

	const order = new Order({
		orderItems: dbOrderItems,
		user: req.user._id,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	});

	const createdOrder = await order.save();
	res.status(200).json(createdOrder);
});

const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id username');
	res.status(200).json(orders);
});

const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.status(200).json(orders);
});

const countTotalOrders = asyncHandler(async (req, res) => {
	const totalOrders = await Order.countDocuments();
	res.status(200).json({ totalOrders });
});

const calculateTotalSales = asyncHandler(async (req, res) => {
	const orders = await Order.find();
	const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
	res.status(200).json({ totalSales });
});

const calcualteTotalSalesByDate = asyncHandler(async (req, res) => {
	const salesByDate = await Order.aggregate([
		{
			$match: {
				isPaid: true,
			},
		},
		{
			$group: {
				_id: {
					$dateToString: { format: '%Y-%m-%d', date: '$paidAt' },
				},
				totalSales: { $sum: '$totalPrice' },
			},
		},
	]);

	res.status(200).json(salesByDate);
});

const findOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'username email'
	);

	if (order) res.status(200).json(order);
	else return res.status(404).json({ error: 'Order not found' });
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updateOrder = await order.save();
		res.status(200).json(updateOrder);
	} else return res.status(404).json({ error: 'Order not found' });
});

const markOrderAsDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} else return res.status(404).status({ error: 'Order not found' });
});

export {
	calcualteTotalSalesByDate,
	calculateTotalSales,
	countTotalOrders,
	createOrder,
	findOrderById,
	getAllOrders,
	getUserOrders,
	markOrderAsDelivered,
	markOrderAsPaid,
};
