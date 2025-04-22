import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { FaLock, FaEnvelope, FaKey, FaShieldAlt } from "react-icons/fa"

export const ChangePass = () => {
  const [isOtp, setIsOtp] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    otp: "",
    newPass: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const userId = localStorage.getItem("userId")

  const handlePassword = async (e) => {
    e.preventDefault()

    if (!formData.email) {
      toast.error("Please enter your email address")
      return
    }

    toast.loading("Sending OTP...")
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-otp`, {
        email: formData.email,
        userId: userId,
      })
      toast.dismiss()
      toast.success(response.data.message)
      setIsOtp(true)
    } catch (error) {
      toast.dismiss()
      console.error("Error Response:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Failed to send email")
    }
  }

  const handleOtp = async (e) => {
    e.preventDefault()
    if (!formData.otp || !formData.newPass) {
      toast.error("Please fill out both fields.")
      return
    }

    toast.loading("Verifying OTP...")
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/api/forgot-password`, {
        email: formData.email,
        otp: formData.otp,
        newPass: formData.newPass,
      })
      toast.dismiss()
      toast.success(response.data.message)
      setIsOtp(false)
      setFormData({
        name: "",
        password: "",
        email: "",
        otp: "",
        newPass: "",
      })
    } catch (error) {
      toast.dismiss()
      console.error("Error Response:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "OTP verification failed")
    }
  }

  return (
    <div className="min-h-screen bg-indigo-200/50 rounded-2xl bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />

      <div className="max-w-md w-full bg-white bg-opacity-95 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          {!isOtp ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center">
                  <FaEnvelope className="h-8 w-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Reset Password</h2>

              <p className="text-gray-600 text-center mb-6">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>

              <form onSubmit={handlePassword} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      placeholder="Enter your registered email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Send OTP
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center">
                  <FaShieldAlt className="h-8 w-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Verify OTP</h2>

              <p className="text-gray-600 text-center mb-6">Enter the OTP sent to your email and your new password.</p>

              <form onSubmit={handleOtp} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                    OTP Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      placeholder="Enter the OTP"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPass" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="newPass"
                      name="newPass"
                      value={formData.newPass}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      placeholder="Enter your new password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOtp(false)}
                    className="text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Back to Email
                  </button>

                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
