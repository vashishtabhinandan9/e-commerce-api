const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide your Category Name"],
        trim: true
    },
    slug: {
        type: String,
        required: [true, "Please provide your Category Slug"],
        /////meemikstore.com/electronics/tv/om-plus
        //electronics/tv/om-plus => this whole part is a slug for omplus
        trim: true,
        unique: true,
    },
    type: {
        type: String,
    },
    parentId: {
        type: String,//all tht id written below is the mongodb id 
        //this will be like mobiel belong to electronic device
        //so elctronic devie ahving some id is the paredid for mobile phone and 
      //  mobile phone itself will have some id 
    },
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        //here we are using objct id from a different model for this we need to mention referrece
        
        ref: "User",
        required: true,
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);