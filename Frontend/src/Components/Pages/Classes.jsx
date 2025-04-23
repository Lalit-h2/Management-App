import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"

const ClassesPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClassClick = (className) => {
    const fetchAttendanceSheet = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/add-new-attendance`,
          { className },
          { withCredentials: true },
        )
        const attendId = response.data.attendId
        localStorage.setItem("attendId", attendId)
        toast.success(response.data.message)
        setTimeout(() => {
          navigate(`./${className}`)
        }, 2500)
      } catch (error) {
        console.error("Error fetching Attendance Sheet:", error)
        toast.error(error.response.data.message)
      }
    }
    fetchAttendanceSheet()
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Class Selection</h1>
            <p className="text-lg text-gray-600">Select a class to take attendance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["One","Two","Three","Four",].map((className) => (
              <div
                key={className}
                onClick={() => handleClassClick(className)}
                className="relative overflow-hidden group rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[url('/patterns/school-pattern.svg')] opacity-10"></div>

                <div className="relative h-48 flex flex-col items-center justify-center p-6 text-white">
                  <span className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {className}
                  </span>
                  <span className="text-lg opacity-80">Class {className}</span>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 group-hover:bg-white/60 transition-all duration-500"></div>

                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 rounded-full bg-white/20 text-sm">View Attendance</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </>
  )
}

export default ClassesPage
