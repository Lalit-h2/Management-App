import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

const AttendancePage = () => {
  const { className } = useParams()
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const attendId = localStorage.getItem("attendId")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-user/${className}`, {
          withCredentials: true,
        })
        setStudents(response.data.allUser)
        console.log(attendId)
      } catch (error) {
        console.error("Error fetching students:", error)
      }
    }

    fetchStudents()
  }, [className])

  const toggleAttendance = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: prevAttendance[studentId] === "Present" ? "Absent" : "Present",
    }))

    const updateAttendance = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/make-attendance/${studentId}`,
          { attendId },
          { withCredentials: true },
        )
        toast.success(response.data.message)
      } catch (error) {
        console.error("Error updating attendance:", error)
        toast.error("Failed to update attendance.")
      }
    }

    updateAttendance()
  }

  const today = new Date().toLocaleDateString()

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 bg-white rounded-xl shadow-lg h-full">
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjxwYXRoIGQ9Ik0zMCAwdjYwIi8+PHBhdGggZD0iTTAgMzBoNjAiLz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="relative py-8 px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Attendance for Class {className}</h2>
            <p className="text-lg text-white/80">Date: {today}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-100 to-blue-50 rounded-t-lg border border-blue-100 shadow-sm">
          <div className="grid grid-cols-12 p-4 font-medium text-gray-700">
            <div className="col-span-1 text-center">SI.</div>
            <div className="col-span-5 md:col-span-4">Name</div>
            <div className="hidden md:block md:col-span-4">Student ID</div>
            <div className="col-span-6 md:col-span-3 text-center">Attendance</div>
          </div>
        </div>

        <div className="rounded-b-lg border-x border-b border-blue-100 my-11 shadow-sm divide-y divide-blue-100 bg-white">
          {students.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading students or no students found...</div>
          ) : (
            students.map((student, i) => (
              <div
                key={student._id}
                className="grid grid-cols-12 p-4 items-center hover:bg-blue-50 transition-colors duration-150"
              >
                <div className="col-span-1 text-center font-medium text-gray-500">{i + 1}.</div>
                <div className="col-span-5 md:col-span-4 font-medium text-gray-800">{student.name}</div>
                <div className="hidden md:block md:col-span-4 text-gray-600 font-mono text-sm">{student._id}</div>
                <div className="col-span-6 md:col-span-3 flex justify-center">
                  <button
                    onClick={() => toggleAttendance(student._id)}
                    className={`
                      px-4 py-2 rounded-xl font-medium transition-all duration-200 w-30
                      ${
                        attendance[student._id] === "Present"
                          ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                      }
                    `}
                  >
                    {attendance[student._id] === "Present" ? "Present" : "Mark Present"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              <span className="font-medium">Total Students:</span> {students.length}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Present:</span>{" "}
              {Object.values(attendance).filter((status) => status === "Present").length}
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Absent:</span>{" "}
              {students.length - Object.values(attendance).filter((status) => status === "Present").length}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AttendancePage
