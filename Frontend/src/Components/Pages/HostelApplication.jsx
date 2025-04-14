"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { IoIosCreate } from "react-icons/io"
import { MdDelete } from "react-icons/md"
import { FaCheck, FaTimes } from "react-icons/fa"

const HostelApplication = () => {
  const [applications, setApplications] = useState([])
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [userHasApplied, setUserHasApplied] = useState(false)
  const [userApplication, setUserApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("role")

  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
    address: "",
    mobileNo: "",
    emergencyContact: "",
    roomPreference: "Single",
    medicalConditions: "",
    reason: "",
  })

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        if (role === "Student") {
          // Fetch student's own application
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/my-application`, {
            withCredentials: true,
          })
          if (response.data.application) {
            setUserHasApplied(true)
            setUserApplication(response.data.application)
          }
        } else {
          // Fetch all applications for admin/teacher
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/all-applications`, {
            withCredentials: true,
          })
          setApplications(response.data.applications || [])
        }
      } catch (error) {
        console.error("Error fetching hostel applications:", error)
        toast.error("Failed to load hostel applications")
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [role])

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/apply`, formData, {
        withCredentials: true,
      })
      toast.success(response.data.message || "Application submitted successfully!")
      setUserHasApplied(true)
      setUserApplication(response.data.application)
      setShowApplicationForm(false)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error(error.response?.data?.message || "Failed to submit application.")
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/update-status/${applicationId}`,
        { status: newStatus },
        {
          withCredentials: true,
        },
      )
      toast.success(response.data.message || "Status updated successfully!")

      // Update the applications list
      setApplications(applications.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app)))
    } catch (error) {
      console.error("Error updating application status:", error)
      toast.error(error.response?.data?.message || "Failed to update status.")
    }
  }

  const handleDeleteApplication = async (applicationId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/delete/${applicationId}`,
        {
          withCredentials: true,
        },
      )
      toast.success(response.data.message || "Application deleted successfully!")

      // Remove the application from the list
      setApplications(applications.filter((app) => app._id !== applicationId))
    } catch (error) {
      console.error("Error deleting application:", error)
      toast.error(error.response?.data?.message || "Failed to delete application.")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs">Pending</span>
      case "Approved":
        return <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs">Approved</span>
      case "Rejected":
        return <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">Rejected</span>
      default:
        return <span className="px-2 py-1 bg-gray-500 text-white rounded-full text-xs">Unknown</span>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading hostel applications...</div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <div className="p-6 bg-[url(https://wallpaperaccess.com/full/1685406.jpg)] min-h-screen mt-0 md:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">Hostel Applications</h2>
          {role === "Student" && !userHasApplied && (
            <div
              className="text-blue-600 text-5xl mb-4 hover:text-blue-800 hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={() => setShowApplicationForm(true)}
            >
              <IoIosCreate />
            </div>
          )}
        </div>

        {role === "Student" && showApplicationForm && (
          <div className="max-w-2xl mx-auto p-6 bg-blue-100 mb-4 text-blue-950 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Hostel Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-lg font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="parentName" className="block text-lg font-medium">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-lg font-medium">
                  Permanent Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobileNo" className="block text-lg font-medium">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContact" className="block text-lg font-medium">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="roomPreference" className="block text-lg font-medium">
                  Room Preference
                </label>
                <select
                  id="roomPreference"
                  name="roomPreference"
                  value={formData.roomPreference}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Single">Single Room</option>
                  <option value="Double">Double Sharing</option>
                  <option value="Triple">Triple Sharing</option>
                </select>
              </div>

              <div>
                <label htmlFor="medicalConditions" className="block text-lg font-medium">
                  Medical Conditions (if any)
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows="2"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="reason" className="block text-lg font-medium">
                  Reason for Hostel Accommodation
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white p-2 rounded-lg font-semibold hover:bg-gray-600"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {role === "Student" && userHasApplied && userApplication && (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Your Application Status</h3>
            <div className="mb-4 flex justify-between items-center">
              <span className="font-medium">Status:</span>
              {getStatusBadge(userApplication.status)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Full Name:</p>
                <p className="text-gray-700">{userApplication.fullName}</p>
              </div>
              <div>
                <p className="font-medium">Parent/Guardian:</p>
                <p className="text-gray-700">{userApplication.parentName}</p>
              </div>
              <div>
                <p className="font-medium">Room Preference:</p>
                <p className="text-gray-700">{userApplication.roomPreference}</p>
              </div>
              <div>
                <p className="font-medium">Applied On:</p>
                <p className="text-gray-700">{new Date(userApplication.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium">Reason for Application:</p>
              <p className="text-gray-700">{userApplication.reason}</p>
            </div>
            {userApplication.status === "Approved" && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
                <p className="font-medium">Congratulations! Your hostel application has been approved.</p>
                <p>Please visit the hostel office with your ID card to complete the formalities.</p>
              </div>
            )}
            {userApplication.status === "Rejected" && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
                <p className="font-medium">Your application has been rejected.</p>
                <p>For more information, please contact the hostel administration office.</p>
              </div>
            )}
          </div>
        )}

        {role !== "Student" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.length > 0 ? (
              applications.map((application) => (
                <div
                  key={application._id}
                  className="p-4 bg-white shadow-md rounded-lg border border-blue-200 hover:bg-gray-50 duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-blue-800">{application.fullName}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(application.status)}
                      <MdDelete
                        className="text-red-500 text-xl cursor-pointer hover:bg-red-100 rounded-full"
                        onClick={() => handleDeleteApplication(application._id)}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Class:</span> {application.className}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Room Preference:</span> {application.roomPreference}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Contact:</span> {application.mobileNo}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Applied on:</span>{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Reason:</span>
                    </p>
                    <p className="text-sm text-gray-700">{application.reason}</p>
                  </div>
                  {application.status === "Pending" && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleStatusChange(application._id, "Approved")}
                        className="flex-1 bg-green-500 text-white py-1 px-3 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-green-600"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(application._id, "Rejected")}
                        className="flex-1 bg-red-500 text-white py-1 px-3 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-red-600"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">No hostel applications found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default HostelApplication
