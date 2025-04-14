import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { changeRole, logIn } from "../../Store/auth"

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.password) {
      toast.error("Please fill out all fields.")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/admin-login`,
        { ...formData, role: "Admin" },
        { withCredentials: true },
      )

      const { role, userId, message } = response.data

      if (role !== "Admin") {
        toast.error("Invalid credentials or insufficient permissions")
        return
      }

      localStorage.setItem("role", role)
      localStorage.setItem("userId", userId)
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("isLogged", "true")

      dispatch(logIn())
      dispatch(changeRole(role))

      toast.success(message || "Admin login successful")
      setTimeout(() => {
        navigate("/admin")
      }, 2000)
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Admin login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-zinc-900 min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="bg-zinc-800 p-8 rounded-lg w-80 md:w-96 shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-zinc-400 block mb-2">
              Admin Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter admin username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-zinc-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login as Admin"
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-zinc-400 text-sm">
            Not an admin?{" "}
            <a href="/" className="text-indigo-600 hover:underline">
              Return to Home
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
