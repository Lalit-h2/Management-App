import { useState, useEffect } from "react"
import axios from "axios"
import { FaCheck, FaTimes, FaSearch, FaFilter } from "react-icons/fa"
import toast, { Toaster } from "react-hot-toast"

const HostelApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/all-applications`, {
        withCredentials: true,
      })
      setApplications(response.data.applications || [])
    } catch (error) {
      console.error("Error fetching hostel applications:", error)
      toast.error("Failed to load hostel applications")
    } finally {
      setLoading(false)
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
    if (!window.confirm("Are you sure you want to delete this application?")) return

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

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application)
    setShowDetailsModal(true)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.className.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <Toaster />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hostel Applications</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <FaFilter className="text-gray-400 mr-2" />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room Preference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {application.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{application.fullName}</div>
                            <div className="text-sm text-gray-500">{application.mobileNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.className}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.roomPreference}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                            application.status,
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewApplicationDetails(application)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          View
                        </button>
                        {application.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(application._id, "Approved")}
                              className="text-green-600 hover:text-green-900 mr-2"
                            >
                              <FaCheck className="inline mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(application._id, "Rejected")}
                              className="text-red-600 hover:text-red-900 mr-2"
                            >
                              <FaTimes className="inline mr-1" /> Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteApplication(application._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Application Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {selectedApplication.fullName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Class:</span> {selectedApplication.className}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Parent/Guardian:</span> {selectedApplication.parentName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Mobile:</span> {selectedApplication.mobileNo}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Emergency Contact:</span> {selectedApplication.emergencyContact}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Application Details</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Room Preference:</span> {selectedApplication.roomPreference}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      selectedApplication.status,
                    )}`}
                  >
                    {selectedApplication.status}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Applied On:</span>{" "}
                  {new Date(selectedApplication.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-700">{selectedApplication.address}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Medical Conditions</h3>
              <p className="text-gray-700">
                {selectedApplication.medicalConditions || "No medical conditions specified"}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Reason for Application</h3>
              <p className="text-gray-700">{selectedApplication.reason}</p>
            </div>
            <div className="flex justify-end">
              {selectedApplication.status === "Pending" && (
                <>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedApplication._id, "Approved")
                      setShowDetailsModal(false)
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-700 transition-colors"
                  >
                    <FaCheck className="inline mr-1" /> Approve
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedApplication._id, "Rejected")
                      setShowDetailsModal(false)
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700 transition-colors"
                  >
                    <FaTimes className="inline mr-1" /> Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HostelApplications
