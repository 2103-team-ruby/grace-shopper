const Product = require("../db/models/product");
const Order = require("../db/models/order");

const router = require("express").Router();

//GET /api/products
router.get("/", async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

// GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId);
		res.json(product);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
