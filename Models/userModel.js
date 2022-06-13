const mongoose= require( 'mongoose')
I

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

 
    firstname : { 
        type : String , 
        required : [true,"please provide your firstname"] , //if false then message is printed
        trim : true ,
        min : 3 ,
        max : 20 
    },


    lastname : { 
        type : String , 
        required : [true,"please provide your lastname"] , //if false then message is printed
        trim : true ,
        min : 3 ,
        max : 20 
    },

    
    email : { 
        type : String , 
        required : [true,"please provide your email"] , //if false then message is printed
        trim : true ,
        unique:true,
        lowercase : true 
    },

    
    username : { 
        type : String , 
        required : [true,"please provide your username"] , //if false then message is printed
        trim : true ,
        unique:true,
        lowercase : true,
        index:true 
    },

    role:{
        type:String,
        enum:["user","admin","super-admin"]
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

module.exports=mongoose.model('User',userSchema);
