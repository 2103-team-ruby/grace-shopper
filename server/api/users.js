const router = require("express").Router();
const User = require("../db/models/user");
const ProductOrder = require("../db/models/productOrder");
const Order = require("../db/models/order");
const Product = require("../db/models/product");
const { isAdmin, requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/cart/join", async (req, res, next) => {
  try {
    const productIds = req.body.productIds;
    const quantities = req.body.quantities;
    let loggedInCart = await Order.findOne({
      where: {
        userId: req.params.id,
        isPaid: false,
      },
      include: {
        model: ProductOrder,
        include: [Product],
      },
    });

    if (!loggedInCart) {
      loggedInCart = await Order.create({
        userId: req.params.id,
        isPaid: false,
      });

      const productId = productIds[0];
      const product = await Product.findByPk(productId);
      const quantity = quantities[0];
      await loggedInCart.addProduct(product, {
        through: { quantity: quantity, subtotal: quantity * product.price },
      });

      await loggedInCart.reload({
        include: {
          model: ProductOrder,
          include: [Product],
        },
      });

      productIds.shift();
      quantities.shift();
    }

    while (productIds.length > 0) {
      const productId = productIds[0];
      const product = await Product.findByPk(productId);
      const quantity = quantities[0];

      const productOrders = loggedInCart.productOrders;

      const indexOfItem = productOrders
        .map((productOrder) => productOrder.productId)
        .indexOf(productId);

      if (indexOfItem === -1) {
        await loggedInCart.addProduct(product, {
          through: { quantity: quantity, subtotal: quantity * product.price },
        });
      } else {
        const productOrder = productOrders[indexOfItem];
        const newQuantity = productOrder.quantity + quantity;
        productOrder.quantity = newQuantity;
        productOrder.subtotal = product.price * productOrder.quantity;
        await productOrder.save();
      }

      productIds.shift();
      quantities.shift();
    }

    await loggedInCart.reload({
      include: {
        model: ProductOrder,
        include: [Product],
      },
    });

    res.send(loggedInCart.productOrders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/cart", requireToken, async (req, res, next) => {
  try {
    if (Number(req.params.id) === req.user.id) {
      const order = await Order.findOne({
        where: {
          userId: req.user.id,
          isPaid: false,
        },
        include: { model: ProductOrder, include: [Product] },
      });

      order ? res.send(order.productOrders) : res.send([]);
    } else {
      res.send("Not the correct User").status(403);
    }
  } catch (error) {}
});

router.post("/:id/cart", requireToken, async (req, res, next) => {
  try {
		if (Number(req.params.id) === req.user.id){
    const newproductId = req.body.productId;
    const newProduct = await Product.findByPk(newproductId);

    let order = await Order.findOne({
      where: {
        userId: req.user.id,
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
	} else {
		res.send("WRONG USER").status(403)
	}
  } catch (error) {
    next;
  }
});

router.put("/:id/cart/", requireToken, async (req, res, next) => {
  try {
		if (Number(req.params.id) === req.user.id){
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
	} else {
		res.send("WRONG PERSON")
	}
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/cart/:itemId", requireToken, async (req, res, next) => {
  try {
		if (Number(req.params.id) === req.user.id){
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPaid: false,
      },
    });
    order.removeProduct(req.params.itemId);
    res.status(204).send("DELETED");
	} else {
		res.send("HOLD YOUR HORSES THIS ISN'T YOUR CART")
	}
  } catch (error) {
    next(error);
  }
});

router.put("/:id/orders/:orderId", requireToken, async (req, res, next) => {
  try {
		if (Number(req.params.id) === req.user.id){
    const order = await Order.findOne({
			where: {
				userId: req.user.id
			}
		});
    res.send(await order.update(req.body));
	} else {
		res.send("Turn it down Hare! This isnt your order")
	}
  } catch (error) {
    next(error);
  }
});

router.get("/:id/orders", requireToken, async (req, res, next) => {
  try {
		if (Number(req.params.id) === req.user.id){
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
	} else {
		res.send("HIPPPITY HOP YOUR USER IS OFF")
	}
  } catch (error) {
    next(error);
  }
});


//Tier 2 - User Profile

router.get("/:id/profile", requireToken,
async (req, res, next) => {
	try {
		if (Number(req.params.id) === req.user.id) {
		console.log('this is req.params --->', req.params)
		const user = await User.findOne({
			where: {
				id: req.user.id,
			},
		});
		res.json(user)
	}
	} catch (error) {
		next(error);
	}
}
);

//PUT /api/users/:id
router.put('/:id', requireToken, async (req, res, next) => {
	try {
		if (Number(req.params.id) === req.user.id) {
		const user = await User.findOne(
			{ where: {
			id: req.user.id,
		},
	})
		res.status(204).send( await user.update(req.body));
		} else {
			res.redirect('/products')
		}
	} catch (error) {
		next(error)
	}
})


