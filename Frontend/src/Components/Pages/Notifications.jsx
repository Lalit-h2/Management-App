
import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { IoMdClose } from "react-icons/io"
import { FaBell, FaClock, FaPlus } from "react-icons/fa"

export const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [formValues, setFormValues] = useState({ title: "", description: "" })
  const [showNotifications, setShowNotifications] = useState(true)
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("role")

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-notifications`, {
          withCredentials: true,
        })
        setNotifications(response.data.notifications || [])
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast.error("Failed to load notifications")
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/give-new-notification`,
        formValues,
        { withCredentials: true },
      )
      toast.success(response.data.message)

      const newNotification = {
        ...formValues,
        time: "Just now",
      }
      setNotifications((prev) => [newNotification, ...prev])
      setFormValues({ title: "", description: "" })
      setShowNotifications(true)
    } catch (error) {
      console.error("Error creating notification:", error)
      toast.error("Failed to create notification")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      {role !== "Student" ? (
          <div className="max-w-4xl mx-auto">
            {!showNotifications ? (
              <div className="bg-white rounded-xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Create Notification</h1>
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formValues.title}
                      onChange={handleInputChange}
                      placeholder="Enter notification title"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formValues.description}
                      onChange={handleInputChange}
                      placeholder="Enter notification description"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Create Notification
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b border-gray-200">
                  <div className="flex items-center">
                    <FaBell className="h-6 w-6 text-indigo-600 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                    title="Create new notification"
                  >
                    <FaPlus className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : notifications.length > 0 ? (
                    <ul className="space-y-4">
                      {notifications.map((notification, index) => (
                        <li
                          key={notification._id || index}
                          className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          <h2 className="text-lg font-semibold text-gray-800">{notification.title}</h2>
                          <p className="text-gray-700 mt-1">{notification.desc}</p>
                          <div className="flex items-center mt-2 text-xs text-indigo-600">
                            <FaClock className="h-3 w-3 mr-1" />
                            <span>{notification.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-10">
                      <FaBell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No notifications available</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <FaBell className="h-6 w-6 text-indigo-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : notifications.length > 0 ? (
                  <ul className="space-y-4">
                    {notifications.map((notification, index) => (
                      <li
                        key={notification._id || index}
                        className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        <h2 className="text-lg font-semibold text-gray-800">{notification.title}</h2>
                        <p className="text-gray-700 mt-1">{notification.desc}</p>
                        <div className="flex items-center mt-2 text-xs text-indigo-600">
                          <FaClock className="h-3 w-3 mr-1" />
                          <span>{notification.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-10">
                    <FaBell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No notifications available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
