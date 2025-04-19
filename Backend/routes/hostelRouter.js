const authentication = require("../Authentication/auth")
const auth =require("../Authentication/auth")
const express=require("express")
const { getMyApplication, applyForHostel } = require("../controllers/hostelController")
const router=express.Router()

router.get("/hostel/my-application",authentication,getMyApplication)
router.post("/hostel/apply",authentication,applyForHostel)

module.exports=router