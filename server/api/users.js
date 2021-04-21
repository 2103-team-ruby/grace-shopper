const router = require("express").Router();
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");
const Order = require("../db/models/order");
const Product = require("../db/models/product");
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
