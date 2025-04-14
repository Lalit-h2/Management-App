import { useState, useEffect } from "react"
import axios from "axios"
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaClipboardList } from "react-icons/fa"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingApplications: 0,
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/dashboard-stats`, {
          withCredentials: true,
        })
        setStats(response.data.stats)
        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <FaUserGraduate className="text-blue-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <FaChalkboardTeacher className="text-green-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500 text-sm">Total Teachers</p>
              <p className="text-2xl font-bold">{stats.totalTeachers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <FaClipboardList className="text-yellow-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500 text-sm">Pending Applications</p>
              <p className="text-2xl font-bold">{stats.pendingApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <FaBuilding className="text-purple-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500 text-sm">Hostel Rooms</p>
              <p className="text-2xl font-bold">{stats.totalRooms}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Room Occupancy</h2>
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 text-xs text-white flex items-center justify-center"
            style={{
              width: `${(stats.availableRooms / stats.totalRooms) * 100}%`,
            }}
          >
            {Math.round((stats.availableRooms / stats.totalRooms) * 100)}% Available
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <div>Available: {stats.availableRooms}</div>
          <div>Occupied: {stats.occupiedRooms}</div>
          <div>Total: {stats.totalRooms}</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md p-6 text-white hover:from-blue-600 hover:to-blue-800 transition duration-300"
        >
          <div className="flex items-center mb-4">
            <FaUserGraduate className="text-3xl mr-3" />
            <h3 className="text-xl font-semibold">Manage Users</h3>
          </div>
          <p className="text-blue-100">Create, edit, and manage student and teacher accounts</p>
        </Link>

        <Link
          to="/admin/hostel"
          className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-md p-6 text-white hover:from-purple-600 hover:to-purple-800 transition duration-300"
        >
          <div className="flex items-center mb-4">
            <FaBuilding className="text-3xl mr-3" />
            <h3 className="text-xl font-semibold">Hostel Management</h3>
          </div>
          <p className="text-purple-100">Manage hostel applications, rooms, and assignments</p>
        </Link>

        <Link
          to="/admin/applications"
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-lg shadow-md p-6 text-white hover:from-yellow-600 hover:to-yellow-800 transition duration-300"
        >
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-3xl mr-3" />
            <h3 className="text-xl font-semibold">Applications</h3>
          </div>
          <p className="text-yellow-100">Review and process pending hostel applications</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
