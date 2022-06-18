const cartModel = require('../Models/cartModel')
const {
    getErrorResponse,
    getResponseV1,
    getResponseV2
} = require('../helpers/helper')

const { response } = require('express')

const validateCart = (new_cart, old_cart) => {
    /**
     * 
     * Validate the array of objects
     * check for the correct keys, null values.
     * return boolean
     * 
     * */


    /**
     * 
     * old_cart {
     *  watch  1,
     *  cable  2
     * } 
     * 
     * new_cart {
     *  watch 1
     * }
     * 
     * return {
     *  watch : 2,
     *  cable : 2
     * }
     * 
    */

    return true
}

function udpateCartModel(condition, update) {
    return new Promise((resolve, reject) => {
        cartModel.findOneAndUpdate(condition, update)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}


const addToCart = (req, res) => {
    const customer = req.user;
//step 1 checking if for that customer there is a cart or not 
    console.log(customer);
    cartModel.findOne({
        customer: customer.id
    }).exec((error, cart) => {
        //if error no cart exist elese cart exist 
        if (error) return getErrorResponse(res, 500, error)
        // isRequestCorrect = validateCart(cartData, cart.cartItems);
        // if (isRequestCorrect) {
        if (cart) {
            //Cart is already created.  To Update the existing cartItems 

            let promises = [];
            let cartData = req.body.cartItems;
            cartData.forEach((cartItem) => {
                let product = cartItem.product; //p1
                let item = cart.cartItems.find(c => c.product == product);
                //as a cart alrady exist for that user  and we send a new list of products
                //now we are cheking if that produnt
                //already exist in the cart or not .
                //coz there can two cases
                //case:1 that it is a new product added to cart. 
                //case:2 existing product added again so only increase its quantity
                let condition, update;
                if (item) {//case 2 item exist so update the quantity
                    console.log(item);
                    const newItemquantity = item.quantity + cartItem.quantity
                    condition = {
                        "customer": customer.id,
                        "cartItems.product": product
                    }
                    update = {
                        "$set": {
                            "cartItems.$.quantity": newItemquantity
                        }
                    }

                } else {

                    /**
                     * 
                     *  step 1  find cart based on customer id.
                     *  step 2 push the current item from req.body
                     *  i.e. cartItem into the cart document found based on the
                     *  condition in step 1.
                     * step 3 update the cart document
                     * 
                    */

                    
                    condition = {
                        "customer": customer.id
                    }
                    update = {
                        "$push": {
                            "cartItems": cartItem 
                        }
                    }
                }
                promises.push(udpateCartModel(condition, update));
            });

            Promise.all(promises).then(
                response => getResponseV1(res, 200, response)
            ).catch(
                error => getErrorResponse(res, 500, error)
            )


        } else {
            console.log("in else");
            const _cart = new cartModel({
                customer: customer.id,
                cartItems: req.body.cartItems
            })

            _cart.save((error, cartData) => {

                if (error) return getErrorResponse(res, 500, error)

                if (cartData) {
                    return getResponseV1(res, 200, cartData)
                }
            })
        }

    })
}

const getCart = async (req, res) => {


    try {
        const cart = await cartModel.findOne({
            customer: req.user.id
        }, '_id cartItems').populate({
            path: "cartItems.product",
            select: "_id name slug price description productPicture"
        });

        return res.json({
            "data": cart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `DB Error occurred. 
            Contact your administrator`,
            error: error
        });
    }

}


module.exports = {
    addToCart,
    getCart
}