const bcrypt=require('bcryptjs')

const userModel = require('../Models/userModel');

/*
const {
    nanoid
} = require('nanoid')
*/
const {
    generateJwtToken
} = require('../helpers/helper');

//console.log("-----------start-----------")//these are basicaly like a checkpoint till 
//where our code is executed

const signup = (req, res) => {

    const {
        email,
        firstname,
        lastname,
        password
    } = req.body;

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({//status 550 means 
                success: false,
                message: "Some Error occurred while searching for existing email. Contact your administrator"
            });
        }


//console.log("-----------start-----------")

        if (data) {
            return res.json({
                success: false,
                message: "User Email Already Exists."
            })
        }


        const _user = new userModel({
            email,
            firstname,
            lastname,
            password,
            username: '1024vj',
        });

        _user.save((error, user) => {
            
//console.log("-----------start-----------")

            if (error) {
                console.log(error);

                return res.status(500).json({
                    success: false,
                    message: "Some Error occurred while saving the user. Contact your administrator"
                });
            }
            if (user) {

                const token = generateJwtToken(user._id, user.role);
                /**
                 * Generally to generate token we pass hte mongodb_id. 
                 * So we pass the id of that collection and not of that user .
                 * it is agood practice .that what we have done above

                 */
                return res.json({
                    success: true,
                    message: "User has been successfully saved",
                    data: {
                        user: {
                            fullname: user.fullname,
                            email: user.email
                        },
                        token: token
                    }
                })
            }
        })
    })
}

const signin = (req, res) => {

//console.log("-----------start-----------")

    const {
        email,
        password
    } = req.body;

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            });
        }

        if (data) {

//console.log("-----------start-----------")

            const isAuthenticated = data.authenticate(password);
            if (isAuthenticated) {

               const token = generateJwtToken(data._id, data.role);
                 /**
                 * Generally to generate token we pass hte mongodb_id. 
                 * So we pass the id of that collection and not of that user .
                 * it is agood practice .that what we have done above

                 */
                return res.json({
                    success: true,
                    message: "User Login successfully",
                    data: {
                        user: {
                            role:data.role,
                            fullname: data.fullname,
                            email: data.email
                        },
                       "token": token
                    }
                })

            } else {
                return res.json({
                    success: false,
                    message: "User Login failed. Bad Authentication"
                })
            }

        } else {
            return res.json({
                success: false,
                message: "User Email Does not exist."
            });
        }
    })

}


module.exports = {
    signup,
    signin
}