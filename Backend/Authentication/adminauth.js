const jwt = require("jsonwebtoken")
const User = require("../models/User.model")
const Admin = require("../models/admin.model")

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    req.user = decoded
    next()
  } catch (error) {
    console.error("Token verification error:", error)
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    })
  }
}

// Check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin role required.",
      })
    }
    next()
  } catch (error) {
    console.error("Admin verification error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error during admin verification",
    })
  }
}

// Check if user is teacher
exports.isTeacher = async (req, res, next) => {
  try {
    if (req.user.role !== "Teacher" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Teacher role required.",
      })
    }
    next()
  } catch (error) {
    console.error("Teacher verification error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error during teacher verification",
    })
  }
}

// Check if user is student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Student role required.",
      })
    }
    next()
  } catch (error) {
    console.error("Student verification error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error during student verification",
    })
  }
}
