"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { IoIosCreate } from "react-icons/io"
import { MdDelete, MdEdit } from "react-icons/md"

const HostelRooms = () => {
  const [rooms, setRooms] = useState([])
  const [showRoomForm, setShowRoomForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("role")

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "Single",
    capacity: 1,
    floor: 1,
    block: "A",
    status: "Available",
    amenities: "",
    monthlyFee: "",
  })

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/rooms`, {
          withCredentials: true,
        })
        setRooms(response.data.rooms || [])
      } catch (error) {
        console.error("Error fetching hostel rooms:", error)
        toast.error("Failed to load hostel rooms")
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (isEditing) {
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/rooms/${formData._id}`,
          formData,
          {
            withCredentials: true,
          },
        )
        // Update the room in the list
        setRooms(rooms.map((room) => (room._id === formData._id ? response.data.room : room)))
      } else {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/rooms`, formData, {
          withCredentials: true,
        })
        // Add the new room to the list
        setRooms([...rooms, response.data.room])
      }

      toast.success(response.data.message || "Room saved successfully!")
      resetForm()
    } catch (error) {
      console.error("Error saving room:", error)
      toast.error(error.response?.data?.message || "Failed to save room.")
    }
  }

  const handleEdit = (room) => {
    setFormData({
      ...room,
      monthlyFee: room.monthlyFee.toString(),
    })
    setIsEditing(true)
    setShowRoomForm(true)
  }

  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/rooms/${roomId}`, {
        withCredentials: true,
      })
      toast.success(response.data.message || "Room deleted successfully!")
      // Remove the room from the list
      setRooms(rooms.filter((room) => room._id !== roomId))
    } catch (error) {
      console.error("Error deleting room:", error)
      toast.error(error.response?.data?.message || "Failed to delete room.")
    }
  }

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      roomType: "Single",
      capacity: 1,
      floor: 1,
      block: "A",
      status: "Available",
      amenities: "",
      monthlyFee: "",
    })
    setIsEditing(false)
    setShowRoomForm(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Occupied":
        return "bg-red-100 text-red-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading hostel rooms...</div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <div className="p-6 bg-[url(https://wallpaperaccess.com/full/1685406.jpg)] min-h-screen mt-0 md:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">Hostel Rooms</h2>
          {role !== "Student" && (
            <div
              className="text-blue-600 text-5xl mb-4 hover:text-blue-800 hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={() => setShowRoomForm(true)}
            >
              <IoIosCreate />
            </div>
          )}
        </div>

        {role !== "Student" && showRoomForm && (
          <div className="max-w-2xl mx-auto p-6 bg-blue-100 mb-4 text-blue-950 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEditing ? "Edit Hostel Room" : "Add New Hostel Room"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="roomNumber" className="block text-lg font-medium">
                    Room Number
                  </label>
                  <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="roomType" className="block text-lg font-medium">
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                    <option value="Dormitory">Dormitory</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="capacity" className="block text-lg font-medium">
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="floor" className="block text-lg font-medium">
                    Floor
                  </label>
                  <input
                    type="number"
                    id="floor"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="block" className="block text-lg font-medium">
                    Block
                  </label>
                  <input
                    type="text"
                    id="block"
                    name="block"
                    value={formData.block}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-lg font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="monthlyFee" className="block text-lg font-medium">
                    Monthly Fee
                  </label>
                  <input
                    type="number"
                    id="monthlyFee"
                    name="monthlyFee"
                    value={formData.monthlyFee}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amenities" className="block text-lg font-medium">
                  Amenities
                </label>
                <textarea
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  rows="2"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Attached bathroom, Study table, Wardrobe"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  {isEditing ? "Update Room" : "Add Room"}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white p-2 rounded-lg font-semibold hover:bg-gray-600"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room._id}
                className="p-4 bg-white shadow-md rounded-lg border border-blue-200 hover:bg-gray-50 duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-blue-800">Room {room.roomNumber}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                      {room.status}
                    </span>
                    {role !== "Student" && (
                      <>
                        <MdEdit
                          className="text-blue-500 text-xl cursor-pointer hover:bg-blue-100 rounded-full"
                          onClick={() => handleEdit(room)}
                        />
                        <MdDelete
                          className="text-red-500 text-xl cursor-pointer hover:bg-red-100 rounded-full"
                          onClick={() => handleDelete(room._id)}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">Type:</span> {room.roomType}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Capacity:</span> {room.capacity}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Floor:</span> {room.floor}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Block:</span> {room.block}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Amenities:</span> {room.amenities || "None specified"}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <p className="text-blue-700 font-semibold">Monthly Fee: ₹{room.monthlyFee.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">No hostel rooms found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HostelRooms
