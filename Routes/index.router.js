const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route')
const categoryRoutes = require('./category.route')
//const productRoutes = require('./product.route')
//const cartRoutes = require('./cart.route')
const adminIndexRoutes = require('./admin/auth.route')


router.use("/", authRoutes)//user
router.use("/category", categoryRoutes)//category
router.use("/admin", adminIndexRoutes)//admin
//we haves seperated normal user from admin coa only admin will be able to do some extra tasks which user cant

//router.use("/product", productRoutes)
//router.use("/cart", cartRoutes)

module.exports = router;