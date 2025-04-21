const Admin = require("../models/admin.model")
const Class = require('../models/class.model');
const User =require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.adminLogin = async (req, res) => {
  try {
    const { name, password } = req.body

    const admin = await Admin.findOne({ name })
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      })
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is deactivated",
      })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      })
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "1d",
    })

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    })

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      role: admin.role,
      userId: admin._id,
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error during admin login",
    })
  }
}

exports.getDashboardStats = async (req, res) => {
  try {
    const User = require("../models/User.model")
    const HostelApplication = require("../models/hostelApplication.model") // You'll need to create this model
    const Room = require("../models/hostelRoom.model") // You'll need to create this model

    const totalStudents = await User.countDocuments({ role: "Student" })
    const totalTeachers = await User.countDocuments({ role: "Teacher" })
    const pendingApplications = await HostelApplication.countDocuments({ status: "Pending" })
    const totalRooms = await Room.countDocuments()
    const availableRooms = await Room.countDocuments({ isAvailable:true })
    const occupiedRooms = await Room.countDocuments({ isAvailable:false })

    const totalApplications = await HostelApplication.countDocuments()
    const approvedApplications = await HostelApplication.countDocuments({ status: "Approved" })
    const rejectedApplications = await HostelApplication.countDocuments({ status: "Rejected" })

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalTeachers,
        pendingApplications,
        totalRooms,
        availableRooms,
        occupiedRooms,
       
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
      },
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard stats",
    })
  }
}

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    })

    await newAdmin.save()

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
    })
  } catch (error) {
    console.error("Error creating admin:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while creating admin",
    })
  }
}

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params

    if (!["Student", "Teacher"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      })
    }

    const users = await User.find({ role }).select("-password")
    return res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    console.error("Error fetching users by role:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    })
  }
}


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const result = await User.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    })
  }
}


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, address, mobileNo ,className} = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    let classId = null;

    if (className) {
      let existingClass = await Class.findOne({ name: className });
      if (!existingClass) {
        const newClass = new Class({ name: className });
        const savedClass = await newClass.save();
        classId = savedClass._id;
      } else {
        classId = existingClass._id;
      }
    }
    // console.log('\n\n\n ',classNameob,'\n\n\n')
    user.name = name || user.name
    user.email = email || user.email
     user.className = classId || user.className
    user.address = address || user.address
    user.mobileNo = mobileNo || user.mobileNo

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    await user.save()

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while updating user",
    })
  }
}