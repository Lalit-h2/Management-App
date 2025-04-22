
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { profileName } from "../../Store/profile"
import toast, { Toaster } from "react-hot-toast"
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

export const Profile = () => {
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()
  const [attendanceData, setAttendanceData] = useState(null)
  const [percentage, setPercentage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/user-details`, {
          withCredentials: true,
        })
        setUserData(response.data)
        dispatch(profileName(response.data.name))
      } catch (error) {
        console.error("Error Response:", error.response?.data || error.message)
        toast.error("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    if (userData.attendance && userData.className) {
      const fetchAttendanceData = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-attendace`,
            { className: userData.className },
            {
              withCredentials: true,
            },
          )
          setAttendanceData(response.data)

          if (response.data.allattendDetails) {
            const totalClasses = response.data.allattendDetails.length
            const attendedClasses = userData.attendance.length
            const calculatedPercentage = (attendedClasses / totalClasses) * 100
            setPercentage(calculatedPercentage.toFixed(2))
          }
        } catch (error) {
          toast.error("Error fetching attendance data")
        }
      }
      fetchAttendanceData()
    }
  }, [userData])

  localStorage.setItem("userName", userData.name)

  const handleImageClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("myFile", file)

        toast.loading("Uploading image...")
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/change-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          })
          setUserData((prev) => ({ ...prev, avater: response.data.secure_url }))
          toast.dismiss()
          toast.success("Profile picture updated successfully!")
          setTimeout(() => {
            window.location.reload(true)
          }, 2500)
        } catch (error) {
          toast.dismiss()
          toast.error("Failed to update profile picture.")
        }
      }
    }
    input.click()
  }

  const role = localStorage.getItem("role")

  if (loading) {
    return (
<div className="min-h-screen bg-transparent  py-12 px-4 sm:px-6 lg:px-8">
<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-indigo-100 p-8 flex flex-col items-center">
              <div className="relative group">
                <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                  <img
                    src={userData.avater || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors"
                >
                  <FaCamera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-800">{userData.name || "User"}</h2>
              <p className="text-indigo-600 mt-1">{role}</p>

              {role === "Student" && percentage !== null && (
                <div className="mt-8 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Attendance</span>
                    <span className="text-sm text-indigo-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Personal Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <FaUser className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-lg text-gray-800">{userData.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <FaEnvelope className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-lg text-gray-800">{userData.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <FaPhone className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-lg text-gray-800">{userData.mobileNo || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <FaMapMarkerAlt className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-lg text-gray-800">{userData.address || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
