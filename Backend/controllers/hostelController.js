const HostelApplication = require("../models/hostelApplication.model")
const User = require("../models/User.model")

exports.applyForHostel = async (req, res) => {
  try {
    console.log("here")
    const { fullName, parentName, address, mobileNo, emergencyContact } = req.body
    const userId = req.user.userId

    const existingApplication = await HostelApplication.findOne({ studentId: userId })
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted an application",
      })
    }
    console.log("\n\n\n ",userId,"\n\n\n");
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const newApplication = new HostelApplication({
      studentId: userId,
      fullName,
      className: user.className,
      parentName,
      address,
      mobileNo,
      emergencyContact,
    })

    await newApplication.save()

    return res.status(201).json({
      success: true,
      message: "Hostel application submitted successfully",
      application: newApplication,
    })
  } catch (error) {
    console.error("Error submitting hostel application:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while submitting application",
    })
  }
}

exports.getMyApplication = async (req, res) => {
  try {
    const userId = req.user.userId

    const application = await HostelApplication.findOne({ studentId: userId })

    return res.status(200).json({
      success: true,
      application,
    })
  } catch (error) {
    console.error("Error fetching hostel application:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching application",
    })
  }
}

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, roomAssigned, blockAssigned, floorAssigned } = req.body

    const application = await HostelApplication.findById(id)
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      })
    }

    application.status = status || application.status

    if (status === "Approved" && roomAssigned) {
      application.roomAssigned = roomAssigned
      application.blockAssigned = blockAssigned || "Main Block"
      application.floorAssigned = floorAssigned || 1
    }

    await application.save()

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    })
  } catch (error) {
    console.error("Error updating application status:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while updating application",
    })
  }
}

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await HostelApplication.find().sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      applications,
    })
  } catch (error) {
    console.error("Error fetching all applications:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching applications",
    })
  }
}
