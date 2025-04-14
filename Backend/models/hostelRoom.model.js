const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HostelRoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    roomType: {
      type: String,
      enum: ["Single", "Double", "Triple", "Dormitory"],
      default: "Single",
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    floor: {
      type: Number,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
    occupants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    amenities: {
      type: String,
      default: "",
    },
    monthlyFee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const HostelRoom = mongoose.model("HostelRoom", HostelRoomSchema)
module.exports = HostelRoom
