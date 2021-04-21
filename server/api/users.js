const router = require("express").Router();
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");
const Order = require("../db/models/order");
const Product = require("../db/models/product");
module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ["id", "username"],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.get("/:id/cart", async (req, res, next) => {
	try {
		const order = await Order.findOne({
			where: {
				userId: req.params.id,
				status: "incomplete",
			},
			include: [{ model: ProductOrder }],
		});

		order ? res.send(order.productOrders) : res.send([]);
	} catch (error) {}
});

router.post("/:id/cart", async (req, res, next) => {
	try {
		const newproductId = req.body.productId;
		const newProduct = await Product.findByPk(newproductId);

		let order = await Order.findOne({
			where: {
				userId: req.params.id,
				status: "incomplete",
			},
			include: [{ model: ProductOrder }],
		});

		if (!order) {
			order = await Order.create({ userId: req.params.id });
			await order.addProduct(newProduct, {
				through: { quantity: 1, subtotal: newProduct.price },
			});
			await order.reload({
				include: [{ model: ProductOrder }],
			});
			res.send(order.productOrders);
		} else {
			const cartItems = order.productOrders;

			const currentCartItems = cartItems.map((cartItem) => cartItem.productId);
			const itemIdx = currentCartItems.indexOf(Number(req.body.productId));

			if (itemIdx === -1) {
				await order.addProduct(newProduct, {
					through: { quantity: 1, subtotal: 1 * newProduct.price },
				});
				res.send(order.productOrders);
			} else {
				const productOrder = cartItems[itemIdx];
				await productOrder.increment("quantity");
				productOrder.subtotal = newProduct.price * productOrder.quantity;
				await productOrder.save();
				res.send(order.productOrders);
			}
		}
	} catch (error) {
		next;
	}
});

router.put("/:id/cart/:itemId", async (req, res, next) => {
	try {
		const { quantity } = req.body;
		const product = await Product.findByPk(req.params.itemId);

		let order = await Order.findOne({
			where: {
				userId: req.params.id,
				status: "incomplete",
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
});

router.delete("/:id/cart/:itemId", async (req, res, next) => {
	try {
		const order = await Order.findOne({
			where: {
				userId: req.params.id,
				status: "incomplete",
			},
		});
		order.removeProduct(req.params.itemId);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

router.put("/:id/order/:orderId", async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.orderId);
		res.send(await order.update(req.body));
	} catch (error) {
		next(error);
	}
});
