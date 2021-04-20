const router = require('express').Router()
module.exports = router

//users routes
router.use('/users', require('./users'))

//products routes
router.use('/products', require('./products'))

//orders routes
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
