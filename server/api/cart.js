const Product = require("../db/models/product");
const Sequelize = require("sequelize");
const ProductOrder = require("../db/models/productOrder");
const op = Sequelize.Op;

const router = require("express").Router();

//GET /api/cart
router.put("/", async (req, res, next) => {
	try {
		//this is the Object.keys(localStorage) array which will get all products which match the productId keys
		// const { guestProducts } = req.body
		const products = await Product.findAll({
			where: {
				id: {
					[op.in]: req.body.guestProducts,
				},
			},
		});
		res.json(products);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
