const mongoose= require( 'mongoose')

const bcrypt = require('bcrypt')
/**
 * username
 * firstanme
 * lastname
 * 
 * phone number
 * password
 * addrss
 * eamil
 * contact number
 * role/type it means waht type of user you are customer, vendor, etc. based on role different 
 *                                functinalitis aere shown to user
 *  
 */


 const userSchema = mongoose.Schema ( {

 
    firstname: { 
        type : String , 
        required : [true,"please provide your firstname"] , //if false then message is printed
        trim : true ,
        min : 3 ,
        max : 20 
    },


    lastname: { 
        type : String , 
        required : [true,"please provide your lastname"] , //if false then message is printed
        trim : true ,
        min : 3 ,
        max : 20 
    },

    
    email: { 
        type : String , 
        required : [true,"please provide your email"] , //if false then message is printed
        trim : true ,
        unique:true,
        lowercase : true 
    },

    
    username: { 
        type : String , 
        required : [true,"please provide your username"] , //if false then message is printed
        trim : true ,
        unique:true,
        lowercase : true,
        index:true 
    },

    role:{
        type:String,
        enum:["user","admin","super-admin"],
        default:"user"
    },
    contact_number:{
        type:String
    },

    hash_password:{
        type:String,
        required : [true,"please provide your passworf"]
    }

},
    {
    timestamps:true
     }

)
/**
 * Virtuals are properties not stored in the database.
 * They are only logically stored to perform computations on the document fields.
 *
 */

/**
 * 
 *    client --> node server  [ server.js <--> route <--> controllers <--> model, save data to db   ]
 *    
 *    sending data to db , it will check for the virtuals
 * 
 * 
 *    what will be the scope of the 'this' keyword? what will it contain / refer to ?
 * 
 * 
 *    anonymous functions 
 *    arrow functions -> the hash_password property of the const variable userSchema will be overwritten
 *    general functions
 */


 userSchema.virtual('password').set(function (password) {
   /**
    * had this been an arrow funcitn then this keyword willpoint to above hashpawword in the
    //userschema on this page and it,s ocntet will be overriden

    //page 
    *   hash_password:{
        type:String,
        required : [true,"please provide your passworf"]
    }

    above code will become som e encrypted password &%_)*&%#@))
    
    but by using naormal functin now it points to the object calling it so it is called by some new 
    user data and only itshasspaswword will be overriden
    * 
    *  */ 
    this.hash_password = bcrypt.hashSync(password, 12)
})

userSchema.virtual('fullname').get(function () {
    /**
 * you can use directly hash password i.e get hte passsword and ahhsh it in controller itself , but
 * better practice is to do it in db file as it is close to db
 * 
 */

    return this.firstname + ' ' + this.lastname;
}).set(function (fullname) {
    this.firstname = fullname.split(' ')[0];
    this.lastname = fullname.split(' ')[1];
})

userSchema.methods = {

    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
        //here password is th epassword provided by user when signing in and 
        //this.hashpassword is the password stored in the collection
        //alos we could have done authentication in user.controller but it is a good practice to 
    //do mongo db related work in the database file 
    }

}

module.exports=mongoose.model('User',userSchema);
