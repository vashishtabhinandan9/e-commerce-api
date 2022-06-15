const slugify = require('slugify')
/*
const {
    nanoid
} = require('nanoid')
*/

const categoryModel = require('../Models/categoryModel');


const addNewCategory = (req, res) => {
/*
    let slug = slugify(req.body.name, {
        lower: true
    })// + '-' + nanoid(8);
*/
    const categoryInput = {
        name: req.body.name,
        slug: slugify(req.body.name, {
            lower: true
        })
    };

   // categoryInput.createdBy = req.user.id;

    if (req.body.parentId) {
        categoryInput.parentId = req.body.parentId;//this is we creating an object field 
                                                 // outside object
    
    }

    const _category = new categoryModel(categoryInput);
    _category.save((error, category) => {

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            });
        }

        if (category) {
            return res.status(201).json({
                success: true,
                message: "Category Saved successfully",
                data: category
            })
        }
    })


}


/**
 * easy
 * Get the list
 *   cate [{ed }, {md}, {samsun}, .....]
 * 
 * 
 * intermediate
 * Get the category tree...
 * 
 *   Electronic Devices 
 *      - Mobile Device
 *          - Samsung
 *          - iPhone
 *          - One Plus
 *      - TVs
 *          - Sony
 *          - TCL
 *          - blah blah blah
 *  [{
 *  name : ed ...
 *  subcategorie : {
 *          {name : mobile device.... , 
 *           subcategorie :{
 *                  {name : samsung, ...} , 
 *                  {name : one plus}
 *              }
 *          },
 *           {name : tvs.... , 
 *           subcategorie :{
 *                  {name : sony, ...} , 
 *                  {name : tcl}
 *              }
 *          } 
 *     }
 * },
 * {
 *      name : Fashions, 
 *      
 * }]
 * 
 */


const getCategory = async (req, res) => {

    /*
    method 1 to get category using exec() function

await categoryModel.find({}).exec((error,data)=>{
        if(error){
            return res.status(500).json({
                
                success: false,
                message: "Some Error occurred while searching category contact your administrator"
                
            })
        }

        if(data){
            return res.status(200).json({
                success:true,
                data:{
                    data
                }
            })
        }

        }
        )
}

*/
   

//method 2 to get category using try and catch  and generate a tree  of all subcategory
   

    try {
        const category = await categoryModel.find({}, '_id name slug parentId type');
        const resp = generateCategoryData(category);
        return res.json({
            "data": resp
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


const generateCategoryData = (allCategories, parentId = null) => {
    
    const CategoryJSON = [];
    let _parentId; //undefined
    if (parentId != null)
        _parentId = parentId;

    let categories = allCategories.filter((cat) => cat.parentId == _parentId);

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        let categoryObj = {
            _id: element._id,
              name: element.name,
            slug: element.slug,
            type: element.type,
            parentId: element.parentId,
            "subCategory": generateCategoryData(allCategories, element._id)
        }
        CategoryJSON.push(categoryObj);
    }
    return CategoryJSON;

    
}


module.exports = {
    addNewCategory,
    getCategory
}