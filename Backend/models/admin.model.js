const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin
