import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"

const AdminRoomManagement = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)

  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: 1,
    isAvailable: true,
  })

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/admin-rooms`, {
        withCredentials: true,
      })
      setRooms(response.data.rooms || [])
    } catch (error) {
      console.error("Error fetching rooms:", error)
      toast.error("Failed to load rooms")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (isEditing && currentRoom) {
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/admin-rooms/${currentRoom._id}`,
          formData,
          { withCredentials: true },
        )
        toast.success("Room updated successfully!")

        // Update the room in the list
        setRooms(rooms.map((room) => (room._id === currentRoom._id ? { ...room, ...formData } : room)))
      } else {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/admin-rooms`, formData, {
          withCredentials: true,
        })
        toast.success("Room added successfully!")

        // Add the new room to the list
        setRooms([...rooms, response.data.room])
      }

      resetForm()
    } catch (error) {
      console.error("Error saving room:", error)
      toast.error(error.response?.data?.message || "Failed to save room")
    }
  }

  const handleEdit = (room) => {
    setCurrentRoom(room)
    setFormData({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      isAvailable: room.isAvailable,
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/admin-rooms/${roomId}`, {
        withCredentials: true,
      })
      toast.success("Room deleted successfully!")

      // Remove the room from the list
      setRooms(rooms.filter((room) => room._id !== roomId))
    } catch (error) {
      console.error("Error deleting room:", error)
      toast.error(error.response?.data?.message || "Failed to delete room")
    }
  }

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      capacity: 1,
      isAvailable: true,
    })
    setIsEditing(false)
    setCurrentRoom(null)
    setShowForm(false)
  }

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Hostel Room Management</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Add New Room
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Room" : "Add New Room"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {isEditing ? "Update Room" : "Add Room"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <tr key={room._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{room.roomNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{room.capacity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            room.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {room.isAvailable ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEdit(room)} className="text-blue-600 hover:text-blue-900 mr-3">
                          <FaEdit className="inline mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDelete(room._id)} className="text-red-600 hover:text-red-900">
                          <FaTrash className="inline mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No rooms found. Add a new room to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRoomManagement
