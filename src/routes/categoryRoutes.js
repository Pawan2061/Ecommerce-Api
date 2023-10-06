const express=require("express")
const router=express.Router()
const{newCategory,getCategory}=require("../controllers/CategoryController")


router.post('/createCategory',newCategory)
router.get('/getCategory/:id',getCategory)

module.exports=router