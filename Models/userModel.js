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
/**
 
 * * Virtuals are properties not stored in the database .
They are only logically stored to perform computations on the document
fields . I
 */

userSchema.virtual('password').set((password) => 
/**
 * you can use directly hash password i.e get hte passsword and ahhsh it in controller itself , but
 * better practice is to do it in db file as it is close to db
 * 
 */
    {
     this.hash_password = bcrypt.hashSync ( password , 100 )
    })

    userSchema.virtual('fullname').get((fullname)=> {
        return this.firstname + this.lastname ;
        }).set((fullname) =>{
        I
        /// this.firstname = Vishal this . last
        this.firstname = fullname.split (' ') [0];
       
        this.lastname = fullname.split (' ')[1] ;
    })

module.exports=mongoose.model('User',userSchema);
