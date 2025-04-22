import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaHome } from "react-icons/fa"

const HostelApplication = () => {
  const [application, setApplication] = useState(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [userHasApplied, setUserHasApplied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const role = localStorage.getItem("role")

  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
    address: "",
    mobileNo: "",
    emergencyContact: "",
  })

  useEffect(() => {
    if (role !== "Student") {
      return
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/user-details`, {
          withCredentials: true,
        })

        setUserData(userResponse.data)

        setFormData({
          fullName: userResponse.data.name || "",
          parentName: "",
          address: userResponse.data.address || "",
          mobileNo: userResponse.data.mobileNo || "",
          emergencyContact: "",
        })

        const applicationResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/my-application`,
          {
            withCredentials: true,
          },
        )
        console.log(applicationResponse)

        if (applicationResponse.data.application) {
          setUserHasApplied(true)
          setApplication(applicationResponse.data.application)
        } else {
          setUserHasApplied(false)
          setShowApplicationForm(true)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
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
      setApplication(response.data.application)
      setShowApplicationForm(false)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error(error.response?.data?.message || "Failed to submit application.")
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (role !== "Student") {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">Only students can apply for hostel accommodation.</div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <div className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-lg min-h-screen mt-0 md:mt-16">
        <h2 className="text-3xl font-bold text-white mb-6">Hostel Application</h2>

        {userHasApplied && application ? (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-blue-800">Application Status</h3>
              {getStatusIcon(application.status)}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center">
                <div
                  className={`text-lg font-medium px-4 py-2 rounded-full ${
                    application.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : application.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {application.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">Application Details</h4>
                <p className="text-gray-600">
                  <span className="font-semibold">Name:</span> {application.fullName}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Application Date:</span>{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Student ID:</span> {application.studentId}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Class:</span> {application.className}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">Contact Information</h4>
                <p className="text-gray-600">
                  <span className="font-semibold">Parent/Guardian:</span> {application.parentName}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Mobile:</span> {application.mobileNo}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Emergency Contact:</span> {application.emergencyContact}
                </p>
              </div>
            </div>

            {application.status === "Approved" && application.roomAssigned && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-2">
                  <FaHome className="text-green-600 mr-2" />
                  <h4 className="text-lg font-medium text-green-800">Room Assignment</h4>
                </div>
                <p className="text-green-700">
                  <span className="font-semibold">Room Number:</span> {application.roomAssigned}
                </p>
              
              </div>
            )}

            {application.status === "Pending" && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800">
                  Your application is currently under review. You will be notified once a decision has been made.
                </p>
              </div>
            )}

            {application.status === "Rejected" && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-800">
                  We regret to inform you that your hostel application has been rejected. Please contact the hostel
                  administration for more information.
                </p>
              </div>
            )}
          </div>
        ) : (
          showApplicationForm && (
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
          )
        )}
      </div>
    </>
  )
}

export default HostelApplication
