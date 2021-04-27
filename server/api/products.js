const Product = require("../db/models/product");
const Order = require("../db/models/order");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get("/:productId", async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId);
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.post("/", requireToken, isAdmin, async (req, res, next) => {
	try {
		const newProduct = await Product.create(req.body);
		res.json(newProduct);
	} catch (error) {
		console.error(error);
	}
});

router.put("/:productId", requireToken, isAdmin, async (req, res, next) => {
	try {
		const productToUpdate = await Product.findByPk(req.params.productId);
		res.json(await productToUpdate.update(req.body));
	} catch (error) {
		console.error(error);
	}
});

router.delete("/:productId", requireToken, isAdmin, async (req, res, next) => {
	try {
		const deletedProduct = await Product.findByPk(req.params.productId);
		await deletedProduct.destroy();
		res.send().status(204);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
