import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const SecretAdminCreation = () => {
  const [accessGranted, setAccessGranted] = useState(false)
  const [accessPassword, setAccessPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleAccessSubmit = (e) => {
    e.preventDefault()
    if (accessPassword === `${import.meta.env.VITE_SECRET_ACCESS_PASSWORD}`) {
      setAccessGranted(true)
      toast.success("Access granted")
    } else {
      toast.error("Invalid access password")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill out all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    try {
      setLoading(true)

      // Get the token from localStorage if available
      const token = localStorage.getItem("token") || ""

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/create-admin`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )

      toast.success(response.data.message || "Admin created successfully")

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error creating admin:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Failed to create admin")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-zinc-900 min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-zinc-800 p-8 rounded-lg w-full max-w-md shadow-lg">
        {!accessGranted ? (
          <>
            <h2 className="text-2xl font-semibold text-white text-center mb-6">Restricted Area</h2>
            <p className="text-zinc-400 mb-4 text-center">Enter the access password to continue</p>
            <form onSubmit={handleAccessSubmit}>
              <div className="mb-4">
                <label htmlFor="accessPassword" className="text-zinc-400 block mb-2">
                  Access Password
                </label>
                <input
                  type="password"
                  id="accessPassword"
                  value={accessPassword}
                  onChange={(e) => setAccessPassword(e.target.value)}
                  className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter access password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Verify Access
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-white text-center mb-6">Create New Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="text-zinc-400 block mb-2">
                  Admin Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter admin username"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-zinc-400 block mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-zinc-400 block mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="text-zinc-400 block mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Confirm password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Admin"
                )}
              </button>
            </form>
          </>
        )}
        <div className="text-center mt-4">
          <span className="text-zinc-400 text-sm">
            <a href="/admin-login" className="text-indigo-600 hover:underline">
              Return to Admin Login
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SecretAdminCreation
