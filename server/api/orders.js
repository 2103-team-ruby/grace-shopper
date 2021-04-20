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

//PUT /api/orders/:orderId
// router.put('/:orderId', async(req, res, next) => {
// try {
//     const orderId = req.params.orderId;
//     const cart = await ProductOrder.findOne({
//         where: {
//             orderId: orderId
//         }
//     })
//     res.status(204).send(await cart.update(req.body))
// } catch(error) {
//     next(error)
// }

// })


//DELETE /api/orders/:productId
// router.delete('/:productId', async(req, res, next) => {
//     try {
//         const productId = req.params.productId;
//         const product = await Product.findByPk(productId)
//         await Order.removeProduct(product)
//         res.sendStatus(204);
//       }catch(error) {
//         next(error)
//         }
// })

