const router = require("express").Router();
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");
const Order = require("../db/models/order");
const Product = require("../db/models/product");
const { isAdmin, isCorrectUserOrAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

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

router.put("/:id/cart/", isCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const { quantity, productId } = req.body;
		const product = await Product.findByPk(productId);

		let order = await Order.findOne({
			where: {
				userId: req.params.id,
				isPaid: false,
			},
			include: { model: ProductOrder, include: [Product] },
		});

		const cartItems = order.productOrders;

		const currentCartItems = cartItems.map((cartItem) => cartItem.productId);

		const itemIdx = currentCartItems.indexOf(Number(productId));

		const itemInCart = cartItems[itemIdx];

		itemInCart.quantity = quantity;
		itemInCart.subtotal = product.price * itemInCart.quantity;
		await itemInCart.save();
		res.send(itemInCart);
	} catch (error) {
		next(error);
	}
});

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

router.put(
	"/:id/orders/:orderId",
	isCorrectUserOrAdmin,
	async (req, res, next) => {
		//should this be admin or customer & admin
		try {
			const order = await Order.findByPk(req.params.orderId);
			res.send(await order.update(req.body));
		} catch (error) {
			next(error);
		}
	}
);

router.get("/:id/orders", async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				userId: req.params.id,
				isPaid: true,
			},
			include: {
				model: ProductOrder,
				include: [Product],
			},
		});
		res.send(orders);
	} catch (error) {
		next(error);
	}
});


//Tier 2 - User Profile

router.get("/:id/profile", isCorrectUserOrAdmin,
async (req, res, next) => {
	try {
		console.log('this is req.params --->', req.params)
		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.json(user)
	} catch (error) {
		next(error);
	}
}
);

//PUT /api/users/:id
router.put('/:id', isCorrectUserOrAdmin, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id)
		res.status(204).send( await user.update(req.body));
	} catch (error) {
		next(error)
	}
})


