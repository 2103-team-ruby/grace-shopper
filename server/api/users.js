const router = require("express").Router();
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");
const Order = require("../db/models/order");
const Product = require("../db/models/product");
const {
	requireToken,
	isAdmin,
	isCorrectUser,
	isCorrectUserOrAdmin,
} = require("./gatekeepingMiddleware");
module.exports = router;

//Access: admin, token not required
router.get("/", isAdmin, async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ["id", "username"],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

//Access: customer, token required
router.get("/:id/cart", isCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const order = await Order.findOne({
			where: {
				userId: req.params.id,
				isPaid: false,
			},
			include: { model: ProductOrder, include: [Product] },
		});

		order ? res.send(order.productOrders) : res.send([]);
	} catch (error) {}
});

//Access: customer, token required
router.post("/:id/cart", isCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const newproductId = req.body.productId;
		const newProduct = await Product.findByPk(newproductId);

		let order = await Order.findOne({
			where: {
				userId: req.params.id,
				isPaid: false,
			},
			include: { model: ProductOrder, include: [Product] },
		});

		if (!order) {
			order = await Order.create({ userId: req.params.id, isPaid: false });
			await order.addProduct(newProduct, {
				through: { quantity: 1, subtotal: newProduct.price },
			});
			await order.reload({
				include: { model: ProductOrder, include: [Product] },
			});
			res.send(order.productOrders[0]);
		} else {
			const cartItems = order.productOrders;

			const currentCartItems = cartItems.map((cartItem) => cartItem.productId);
			const itemIdx = currentCartItems.indexOf(Number(req.body.productId));

			if (itemIdx === -1) {
				await order.addProduct(newProduct, {
					through: { quantity: 1, subtotal: 1 * newProduct.price },
				});

				const newProductOrders = await order.getProductOrders({
					where: {
						productId: newProduct.id,
					},
					include: [Product],
				});
				res.send(newProductOrders[0]);
			} else {
				const productOrder = cartItems[itemIdx];
				await productOrder.increment("quantity");
				productOrder.subtotal = newProduct.price * productOrder.quantity;
				await productOrder.save();
				res.send(productOrder);
			}
		}
	} catch (error) {
		next;
	}
});

//Access: customer, token required
router.put(
	"/:id/cart/:itemId",
	isCorrectUserOrAdmin,
	async (req, res, next) => {
		try {
			const { quantity } = req.body;
			const product = await Product.findByPk(req.params.itemId);

			let order = await Order.findOne({
				where: {
					userId: req.params.id,
					isPaid: false,
				},
				include: [{ model: ProductOrder }],
			});

			const cartItems = order.productOrders;

			const currentCartItems = cartItems.map((cartItem) => cartItem.productId);
			const itemIdx = currentCartItems.indexOf(Number(req.params.itemId));

			const itemInCart = cartItems[itemIdx];
			itemInCart.quantity = quantity;
			itemInCart.subtotal = product.price * itemInCart.quantity;
			await itemInCart.save();
			res.send(cartItems);
		} catch (error) {
			next(error);
		}
	}
);

//Access: customer, token required
router.delete(
	"/:id/cart/:itemId",
	isCorrectUserOrAdmin,
	async (req, res, next) => {
		try {
			const order = await Order.findOne({
				where: {
					userId: req.params.id,
					isPaid: false,
				},
			});
			order.removeProduct(req.params.itemId);
			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
);

//Access: customer, token required
router.put("/:id/order/:orderId", async (req, res, next) => {
	//should this be admin or customer & admin
	try {
		const order = await Order.findByPk(req.params.orderId);
		res.send(await order.update(req.body));
	} catch (error) {
		next(error);
	}
});
