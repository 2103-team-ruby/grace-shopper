const Product = require("../db/models/product");
const Order = require("../db/models/order");
const {
  requireToken,
  isAdmin,
  isCorrectUser,
  isCorrectUserOrAdmin,
} = require("./gatekeepingMiddlewaregate");

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

// POST /api/products/
router.post('/', isAdmin, async (req, res, next) => {
try {
	const newProduct = await Product.create(req.body)
	res.json(newProduct)
} catch (error) {
	console.error(error)
}
});

// PUT /api/products/:id
router.put("/:productId", isAdmin, async (req, res, next) => {
	try {
		const productToUpdate = await Product.findByPk(req.params.productId)
		res.json(await productToUpdate.update(req.body))
	} catch (error) {
		console.error(error)
	}
})

//Delete /api/products/:id
router.delete("/:productId", isAdmin, async (req, res, next) => {
	try {
		const deletedProduct = await Product.findByPk(req.params.productId)
		console.log(deletedProduct)
		await deletedProduct.destroy()
		res.send().status(204)
	} catch (error) {
		console.error(error)
	}
})

module.exports = router;
