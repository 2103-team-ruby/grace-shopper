const Order = require('../db/orders');
const ProductOrder = require('../db/productOrders');

const router = require('express').Router();

//GET /api/orders/:userId
router.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId
        const order = await Order.findOrCreate({
            where:{
                userId: userId,
                status: 'incomplete'
            },
            include: {
                model: ProductOrder
            }
        })
        res.json(order);
    } catch (error) {
        next(error);
    }
})



