import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { FaHome, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa"
import UnauthorizedPage from "./UnauthorizedPage"

const HostelDashboard = () => {
  const [userApplication, setUserApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("role")

  useEffect(() => {
    if (role === "Student") {
      const fetchData = async () => {
        try {
          setLoading(true)
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
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    } else {
      setLoading(false)
    }
  }, [role])

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading hostel dashboard...</div>
      </div>
    )
  }

  if (role !== "Student") {
    return <UnauthorizedPage />
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500 text-3xl" />
      case "Approved":
        return <FaCheckCircle className="text-green-500 text-3xl" />
      case "Rejected":
        return <FaTimesCircle className="text-red-500 text-3xl" />
      default:
        return null
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800
 min-h-screen mt-0 md:mt-16 rounded-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Student Hostel Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Hostel Information</h3>
          <p className="text-gray-700 mb-4">
            Our school hostel provides comfortable accommodation for students with various room options and amenities.
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-medium">Available Room Types:</span> Single, Double, and Triple sharing options
          </p>
        
       
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Hostel Application</h3>

          {userApplication ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-800">Application Status</h4>
                {getStatusIcon(userApplication.status)}
              </div>

              <div
                className={`p-3 mb-4 rounded-lg ${
                  userApplication.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : userApplication.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                <p className="font-medium">Status: {userApplication.status}</p>
                <p>Applied on: {new Date(userApplication.createdAt).toLocaleDateString()}</p>
              </div>

              {userApplication.status === "Approved" && userApplication.roomAssigned && (
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <FaHome className="text-green-600 mr-2" />
                    <h4 className="font-medium text-green-800">Room Assignment</h4>
                  </div>
                  <p className="text-green-700">
                    <span className="font-semibold">Room Number:</span> {userApplication.roomAssigned}
                  </p>
                 
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
                To apply for hostel accommodation, please fill out the application form. Our administration will review
                your application and notify you of the decision.
              </p>
              <div className="space-y-4">
                <Link
                  to="/layout/hostel-application"
                  className="block w-full bg-blue-600 text-white text-center py-4 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Apply for Hostel
                </Link>
          
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Hostel Rules & Regulations</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-10" >
            <li>Students must maintain discipline and decorum in the hostel premises.</li>
            <li>Ragging in any form is strictly prohibited and will result in severe disciplinary action.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HostelDashboard
