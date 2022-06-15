/*
• route / signup
@param
.
.
.
fullname
email
password
username
contactname

*/


const express = require('express');
const router = express.Router();

const {
    signup,
    signin
} = require('../controller/auth.controller');

/**
 * otherway of requiring a function passed
 * 
 * const usersigncontroller= require('../controller/user.controller');

router.post('/signup',usercontroller.signup);

 */




const {
    validateSignUpRequest,
    validateSignInRequest,
    isRequestCorrect
} = require('../middleware/request.validator');



router.post('/signup', validateSignUpRequest, isRequestCorrect, signup);

router.post('/signin', validateSignInRequest, isRequestCorrect, signin);

module.exports = router;