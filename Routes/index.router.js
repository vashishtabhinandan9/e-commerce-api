const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route')
const categoryRoutes = require('./category.route')
//const productRoutes = require('./product.route')
//const cartRoutes = require('./cart.route')
//const adminIndexRoutes = require('./admin/index.route')

router.use("/", authRoutes)
router.use("/category", categoryRoutes)
//router.use("/admin", adminIndexRoutes)
//router.use("/product", productRoutes)
//router.use("/cart", cartRoutes)

module.exports = router;