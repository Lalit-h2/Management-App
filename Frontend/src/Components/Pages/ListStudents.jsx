import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { FaChalkboardTeacher, FaUserGraduate, FaArrowLeft } from "react-icons/fa"

import UnauthorizedPage from "./UnauthorizedPage"

const Students = () => {
  const [selectedClass, setSelectedClass] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("role")

  useEffect(() => {
    setLoading(false)
  }, [])

  const fetchStudentsByClass = async (className) => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-user/${className}`, {
        withCredentials: true,
      })
      
      setStudents(response.data.allUser || [])
      setSelectedClass(className)
    } catch (error) {
      
      console.error("Error fetching students:", error)
      toast.error(error.response.data.message)
    } finally {
      
      setLoading(false)
    }
  }

  if (role !== "Teacher" ) {
    return <UnauthorizedPage />
  }

  const classes = ["One","Two","Three","Four"]

  return (
    <div className=" bg-gray-50 p-6 mt-0 md:mt-11 py-11 rounded-2xl shadow-md">
      <Toaster />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          {selectedClass ? (
            <>
              <button
                onClick={() => setSelectedClass(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-3"
              >
                <FaArrowLeft className="mr-1" /> Back to Classes
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Students in Class {selectedClass}</h1>
            </>
          ) : (
            <h1 className="text-3xl font-bold text-gray-800">Select a Class</h1>
          )}
        </div>

        {!selectedClass ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {classes.map((className) => (
              <div
                key={className}
                onClick={() => fetchStudentsByClass(className)}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg hover:scale-105 border border-gray-100"
              >
                <FaChalkboardTeacher className="text-4xl text-blue-600 mb-3" />
                <h2 className="text-xl font-semibold text-gray-800">Class {className}</h2>
                <p className="text-sm text-gray-500 mt-2">View students</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                  <div className="flex items-center">
                    <FaUserGraduate className="text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold text-blue-800">
                      {students.length} Students in Class {selectedClass}
                    </h2>
                  </div>
                </div>

                {students.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mobile
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                          <tr key={student._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {student._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.mobileNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">No students found in this class.</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Students
