import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FaBed, FaUserGraduate, FaClipboardCheck, FaTools } from "react-icons/fa"
import { MdPayment } from "react-icons/md"
import { BsHouseDoor } from "react-icons/bs"

const AdminHostelDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
 
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/dashboard-stats`, {
          withCredentials: true,
        })
        setStats(response.data.stats)
        
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching hostel dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hostel Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaBed className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Rooms</p>
            <p className="text-2xl font-bold text-blue-900">{stats.totalRooms}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <BsHouseDoor className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Available Rooms</p>
            <p className="text-2xl font-bold text-green-700">{stats.availableRooms}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <FaUserGraduate className="text-red-600 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Occupied Rooms</p>
            <p className="text-2xl font-bold text-red-700">{stats.occupiedRooms}</p>
          </div>
        </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Application Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Total Applications</p>
              <p className="font-bold text-blue-900">{stats.totalApplications}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Pending</p>
              <p className="font-bold text-yellow-600">{stats.pendingApplications}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Approved</p>
              <p className="font-bold text-green-600">{stats.approvedApplications}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Rejected</p>
              <p className="font-bold text-red-600">{stats.rejectedApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:col-span-2">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Room Occupancy</h3>
          <div className="h-40 flex items-center justify-center">
            <div className="w-full max-w-md flex">
              <div
                className={(stats.occupiedRooms!=0)?("bg-green-500 h-8 rounded-l-full text-xs text-white flex items-center justify-center px-2"):("bg-green-500 h-8 rounded-full text-xs text-white flex items-center justify-center px-2")}
                style={{ width: `${(stats.availableRooms / stats.totalRooms) * 100}%` }}
              >
                {Math.round((stats.availableRooms / stats.totalRooms) * 100)}% Available
              </div>
           {(stats.occupiedRooms!=0) &&   (<div
                className="bg-red-500 h-8 text-xs rounded-r-full text-white flex items-center justify-center px-2"
                style={{ width: `${(stats.occupiedRooms / stats.totalRooms) * 100}%` }}
              >
                {Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}% Occupied
              </div>
             
            )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Link
          to="/admin/applications"
          className="bg-gradient-to-r   from-blue-500 to-blue-700 rounded-lg shadow-md p-6 text-white hover:from-blue-600 hover:to-blue-800 transition duration-300"
        >
          <div className="flex items-center mb-4">
            <FaClipboardCheck className="text-3xl mr-3" />
            <h3 className="text-xl font-semibold">Manage Applications</h3>
          </div>
          <p className="text-blue-100">Review and process student hostel applications</p>
        </Link>

        <Link
          to="/admin/room-management"
          className="bg-gradient-to-r  from-purple-500 to-purple-700 rounded-lg shadow-md p-6 text-white hover:from-purple-600 hover:to-purple-800 transition duration-300"
        >
          <div className="flex items-center mb-4">
            <FaBed className="text-3xl mr-3" />
            <h3 className="text-xl font-semibold">Manage Rooms</h3>
          </div>
          <p className="text-purple-100">Add, edit, and manage hostel room inventory</p>
        </Link>

        {/* <Link
          to="/admin/hostel-payments"
          className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md p-6 text-white hover:from-green-600 hover:to-green-800 transition duration-300"
        >
          <div className="flex items-center mb-4">
            <MdPayment className="text-3xl mr-3" />
            <h3 className="text-xl font-semibold">Payments</h3>
          </div>
          <p className="text-green-100">Track and manage hostel fee payments</p>
        </Link> */}
      </div>
    </div>
  )
}

export default AdminHostelDashboard
