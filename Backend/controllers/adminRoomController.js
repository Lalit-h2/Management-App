const HostelRoom = require("../models/hostelRoom.model")

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await HostelRoom.find().sort({ roomNumber: 1 })
    return res.status(200).json({
      success: true,
      rooms,
    })
    console.log(rooms)
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching rooms",
    })
  }
}

exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await HostelRoom.find({ isAvailable: true }).sort({ roomNumber: 1 })
    return res.status(200).json({
      success: true,
      rooms,
    })
  } catch (error) {
    console.error("Error fetching available rooms:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching available rooms",
    })
  }
}

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, capacity, isAvailable } = req.body

    const existingRoom = await HostelRoom.findOne({ roomNumber })
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room with this number already exists",
      })
    }

    const newRoom = new HostelRoom({
      roomNumber,
      capacity,
      isAvailable,
      occupants: [],
    })

    await newRoom.save()

    return res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: newRoom,
    })
  } catch (error) {
    console.error("Error adding room:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while adding room",
    })
  }
}

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params
    const { roomNumber, capacity, isAvailable } = req.body

    const room = await HostelRoom.findById(id)
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      })
    }

    // Check if the new room number already exists (if changing room number)
    if (roomNumber !== room.roomNumber) {
      const existingRoom = await HostelRoom.findOne({ roomNumber })
      if (existingRoom) {
        return res.status(400).json({
          success: false,
          message: "Room with this number already exists",
        })
      }
    }

    // Update room
    room.roomNumber = roomNumber
    room.capacity = capacity
    room.isAvailable = isAvailable

    await room.save()

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room,
    })
  } catch (error) {
    console.error("Error updating room:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while updating room",
    })
  }
}

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params

    const result = await HostelRoom.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting room:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while deleting room",
    })
  }
}
