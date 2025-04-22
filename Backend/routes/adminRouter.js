const express = require("express")
const router = express.Router()
const adminController = require("../controllers/adminController")
const adminRoomController=require("../controllers/adminRoomController")
const { verifyToken, isAdmin } = require("../Authentication/adminauth") // Assuming you have auth middleware

router.post("/admin-login", adminController.adminLogin)

router.get("/dashboard-stats", verifyToken, isAdmin, adminController.getDashboardStats)

router.post("/create-admin", adminController.createAdmin)

router.get('/users-by-role/:role',adminController.getUsersByRole)

router.post("/create-user", verifyToken, isAdmin, adminController.createUser)

router.delete("/delete-user/:id", verifyToken, isAdmin, adminController.deleteUser)

router.put("/update-user/:id", verifyToken, isAdmin, adminController.updateUser)

//my hostel room part:

router.get("/hostel/admin-rooms", verifyToken, isAdmin, adminRoomController.getAllRooms)
router.post("/hostel/admin-rooms", verifyToken, isAdmin, adminRoomController.addRoom)
router.put("/hostel/admin-rooms/:id", verifyToken, isAdmin, adminRoomController.updateRoom)
router.delete("/hostel/admin-rooms/:id", verifyToken, isAdmin, adminRoomController.deleteRoom)
router.get("/hostel/available-rooms", verifyToken, isAdmin, adminRoomController.getAvailableRooms)
module.exports = router
