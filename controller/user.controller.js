const bcrypt=require('bcryptjs')

const signup = ( req , res ) => {
    const {
    name ,
    password ,
    email
    } = req.body ;
    /// validations

    // create hash password
    let hash_password = bcrypt.hashSync ( password , 10 ) ;
    let user = new UserModel ( {
        name ,
        email ,
        password
    })



}