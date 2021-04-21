const router = require("express").Router();
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");
const Order = require("../db/models/order");
const Product = require("../db/models/product");
const e = require("express");
module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const users = await User.findAll({
			// explicitly select only the id and username fields - even though
			// users' passwords are encrypted, it won't help if we just
			// send everything to anyone who asks!
			attributes: ["id", "username"],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

// GET /api/users/:id/cart
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

// POST /api/users/:id/cart
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
			res.send(order.productOrders[0]);
		} else {
			const cartItems = order.productOrders;

			const currentCartItems = cartItems.map((cartItem) => cartItem.productId);
			const isItemThere = currentCartItems.indexOf(Number(req.body.productId));

			if (isItemThere === -1) {
				await order.addProduct(newProduct, {
					through: { quantity: 1, subtotal: 1 * newProduct.price },
				});
				res.send(order);
			} else {
				const productOrder = cartItems[isItemThere];
				await productOrder.increment("quantity");
				productOrder.subtotal = newProduct.price * productOrder.quantity;
				await productOrder.save();
				res.send(order);
			}
		}
	} catch (error) {
		next;
	}
});

// DELETE /api/users/:id/cart/:itemId
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
