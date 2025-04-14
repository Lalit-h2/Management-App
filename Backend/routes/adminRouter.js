const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const { verifyToken, isAdmin } = require("../Authentication/adminauth") // Assuming you have auth middleware

router.post("/admin-login", adminController.adminLogin)

router.get("/dashboard-stats", verifyToken, isAdmin, adminController.getDashboardStats)

router.post("/create-admin", adminController.createAdmin)

router.get('/users-by-role/:role',adminController.getUsersByRole)

module.exports = router
