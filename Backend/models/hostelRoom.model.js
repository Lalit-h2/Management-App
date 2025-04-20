const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HostelRoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    occupants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
)

HostelRoomSchema.virtual("isFull").get(function () {
  return this.occupants.length >= this.capacity
})

HostelRoomSchema.pre("save", function (next) {
  if (this.occupants.length >= this.capacity) {
    this.isAvailable = false
  }
  next()
})

const HostelRoom = mongoose.model("HostelRoom", HostelRoomSchema)
module.exports = HostelRoom
