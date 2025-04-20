const authentication = require("../Authentication/auth")
const auth =require("../Authentication/auth")
const express=require("express")
const { getMyApplication, applyForHostel, getAllApplications, updateApplicationStatus } = require("../controllers/hostelController")
const { verifyToken, isAdmin } = require("../Authentication/adminauth")
const router=express.Router()

router.get("/hostel/my-application",authentication,getMyApplication)
router.post("/hostel/apply",authentication,applyForHostel)
router.get("/hostel/all-applications",verifyToken,isAdmin,getAllApplications)
router.put("/hostel/update-status/:id",verifyToken,isAdmin,updateApplicationStatus)

module.exports=router