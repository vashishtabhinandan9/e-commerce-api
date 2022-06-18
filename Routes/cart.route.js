const express = require('express');
const router = express.Router();

const {
    addToCart,
    getCart
} = require('../controller/cart.controller')


const {
    isLoggedIn,
    isUser
} = require('../middleware/auth.middleware')



router.post('/addToCart', isLoggedIn, isUser, addToCart);
router.get('/getCart', isLoggedIn, isUser, getCart);


module.exports = router;