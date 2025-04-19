import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FaBed, FaUserGraduate, FaClipboardCheck, FaTools } from "react-icons/fa"
import { MdPayment } from "react-icons/md"
import { BsHouseDoor } from "react-icons/bs"

const HostelDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    maintenanceRooms: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  })
  const [loading, setLoading] = useState(true)
  const [userApplication, setUserApplication] = useState(null)
  const role = localStorage.getItem("role")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch dashboard stats
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/dashboard-stats`, {
          withCredentials: true,
        })
        setStats(response.data.stats)

        // If student, fetch their application status
        if (role === "Student") {
          try {
            const applicationResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/my-application`,
              {
                withCredentials: true,
              },
            )
            setUserApplication(applicationResponse.data.application)
          } catch (error) {
            console.error("Error fetching application:", error)
          }
        }
      } catch (error) {
        console.error("Error fetching hostel dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [role])

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading hostel dashboard...</div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-[url(https://wallpaperaccess.com/full/1685406.jpg)] min-h-screen mt-0 md:mt-16">
      <h2 className="text-3xl font-bold text-white mb-6">Hostel Management Dashboard</h2>

      {role !== "Student" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaTools className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Under Maintenance</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.maintenanceRooms}</p>
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
                    className="bg-green-500 h-8 rounded-l-full text-xs text-white flex items-center justify-center px-2"
                    style={{ width: `${(stats.availableRooms / stats.totalRooms) * 100}%` }}
                  >
                    {Math.round((stats.availableRooms / stats.totalRooms) * 100)}% Available
                  </div>
                  <div
                    className="bg-red-500 h-8 text-xs text-white flex items-center justify-center px-2"
                    style={{ width: `${(stats.occupiedRooms / stats.totalRooms) * 100}%` }}
                  >
                    {Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}% Occupied
                  </div>
                  <div
                    className="bg-yellow-500 h-8 rounded-r-full text-xs text-white flex items-center justify-center px-2"
                    style={{ width: `${(stats.maintenanceRooms / stats.totalRooms) * 100}%` }}
                  >
                    {Math.round((stats.maintenanceRooms / stats.totalRooms) * 100)}% Maintenance
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/layout/hostel-applications"
              className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md p-6 text-white hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
              <div className="flex items-center mb-4">
                <FaClipboardCheck className="text-3xl mr-3" />
                <h3 className="text-xl font-semibold">Manage Applications</h3>
              </div>
              <p className="text-blue-100">Review and process student hostel applications</p>
            </Link>

            <Link
              to="/layout/hostel-rooms"
              className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-md p-6 text-white hover:from-purple-600 hover:to-purple-800 transition duration-300"
            >
              <div className="flex items-center mb-4">
                <FaBed className="text-3xl mr-3" />
                <h3 className="text-xl font-semibold">Manage Rooms</h3>
              </div>
              <p className="text-purple-100">Add, edit, and manage hostel room inventory</p>
            </Link>

            <Link
              to="/layout/hostel-payments"
              className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-md p-6 text-white hover:from-green-600 hover:to-green-800 transition duration-300"
            >
              <div className="flex items-center mb-4">
                <MdPayment className="text-3xl mr-3" />
                <h3 className="text-xl font-semibold">Payments</h3>
              </div>
              <p className="text-green-100">Track and manage hostel fee payments</p>
            </Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Hostel Information</h3>
            <p className="text-gray-700 mb-4">
              Our school hostel provides comfortable accommodation for students with various room options and amenities.
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Available Room Types:</span> Single, Double, and Triple sharing options
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-medium">Amenities:</span> Study tables, Wardrobes, 24/7 hot water, Wi-Fi, Common
              room with TV, Dining hall
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Monthly Fee Range:</span> ₹5,000 - ₹10,000 depending on room type
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Hostel Application</h3>

            {userApplication ? (
              <div>
                <div
                  className={`p-3 mb-4 rounded-lg ${
                    userApplication.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : userApplication.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  <p className="font-medium">Application Status: {userApplication.status}</p>
                  <p>Applied on: {new Date(userApplication.createdAt).toLocaleDateString()}</p>
                </div>

                {userApplication.status === "Approved" && userApplication.roomAssigned && (
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-green-800 mb-2">Room Assignment</h4>
                    <p>Room Number: {userApplication.roomAssigned}</p>
                    <p>Block: {userApplication.blockAssigned || "Main Block"}</p>
                    <p>Floor: {userApplication.floorAssigned || "Ground"}</p>
                  </div>
                )}

                <Link
                  to="/layout/hostel-application"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  View Application Details
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 mb-4">
                  To apply for hostel accommodation, please fill out the application form. Our administration will
                  review your application and notify you of the decision.
                </p>
                <div className="space-y-4">
                  <Link
                    to="/layout/hostel-application"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Apply for Hostel
                  </Link>
                  <Link
                    to="/layout/hostel-rooms"
                    className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                  >
                    View Available Rooms
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Hostel Rules & Regulations</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Students must maintain discipline and decorum in the hostel premises.</li>
              <li>Hostel fees must be paid on time at the beginning of each semester.</li>
              <li>Visitors are allowed only in the designated visiting area during specified hours.</li>
              <li>Students must return to the hostel by 8:00 PM unless prior permission is obtained.</li>
              <li>Possession or consumption of alcohol, tobacco, or drugs is strictly prohibited.</li>
              <li>Students are responsible for keeping their rooms and common areas clean.</li>
              <li>Any damage to hostel property will be charged to the responsible student(s).</li>
              <li>Ragging in any form is strictly prohibited and will result in severe disciplinary action.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default HostelDashboard
