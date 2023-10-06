const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    }
})




const categoryModel=mongoose.model("category",categorySchema)

module.exports=categoryModel