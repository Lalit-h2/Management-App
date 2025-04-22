const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HostelApplicationSchema = new Schema(
  {
    studentId: {
      type: String,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    roomAssigned: {
      type: String,
      default: null,
    },
    blockAssigned: {
      type: String,
      default: null,
    },
    floorAssigned: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const HostelApplication = mongoose.model("HostelApplication", HostelApplicationSchema)
module.exports = HostelApplication
