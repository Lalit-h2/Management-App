import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { MdDelete, MdAssignment, MdSubject, MdAccessTime } from "react-icons/md"
import { FaPlus, FaChevronLeft } from "react-icons/fa"

const AssignmentSection = () => {
  const [assignData, setAssignData] = useState(null)
  const [changeUI, setChangeUI] = useState()
  const [makeAssign, setMakeAssign] = useState(false)
  const [loading, setLoading] = useState(true)
  const role = localStorage.getItem("role")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const endpoint =
          role === "Student"
            ? `${import.meta.env.VITE_BACKEND_BASEURL}/api/get-assignment`
            : `${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-assignment`

        const response = await axios.get(endpoint, {
          withCredentials: true,
        })
        setAssignData(response.data.assignment)
      } catch (error) {
        console.error("Error fetching assignments:", error)
        toast.error("Failed to load assignments")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [changeUI, role])

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    subject: "",
    deadline: "",
    className: "",
  })

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/add-assignment`, formData, {
        withCredentials: true,
      })
      if (response.status === 200) {
        toast.success(response.data.message || "Assignment created successfully!")
        setMakeAssign(false)
        setChangeUI(Date.now()) // Trigger refetch
        setFormData({
          title: "",
          desc: "",
          subject: "",
          deadline: "",
          className: "",
        })
      } else {
        toast.error(response.data.message || "Failed to create Assignment.")
      }
    } catch (error) {
      console.error("Error creating Assignment:", error)
      if (error.response) {
        toast.error(error.response.data.message || "Server error occurred.")
      } else {
        toast.error("Failed to connect to the server.")
      }
    }
  }

  const deleteAssignment = async ({ id }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/delete-assignment/${id}`, {
        withCredentials: true,
      })
      toast.success(response.data.message)
      setChangeUI(id)
    } catch (error) {
      toast.error("Failed to connect to the server.")
      console.log(error)
    }
  }

  const formatDeadline = (deadline) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return <span className="text-red-500">Overdue</span>
    } else if (diffDays === 0) {
      return <span className="text-orange-500">Due today</span>
    } else if (diffDays === 1) {
      return <span className="text-orange-400">Due tomorrow</span>
    } else {
      return <span className="text-green-500">Due in {diffDays} days</span>
    }
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        {!makeAssign ? (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center">
                  <MdAssignment className="h-7 w-7 text-indigo-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
                </div>
                {role !== "Student" && (
                  <button
                    onClick={() => setMakeAssign(true)}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                    title="Create new assignment"
                  >
                    <FaPlus className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : assignData && assignData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignData.map((assignment, i) => (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                            {role !== "Student" && (
                              <button
                                onClick={() => deleteAssignment({ id: assignment._id })}
                                className="text-red-500 hover:text-red-600 transition-colors"
                              >
                                <MdDelete className="h-5 w-5" />
                              </button>
                            )}
                          </div>

                          <p className="text-gray-600 mt-3 text-sm">{assignment.desc}</p>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center text-sm">
                              <MdSubject className="h-4 w-4 text-indigo-600 mr-2" />
                              <span className="text-indigo-600">{assignment.subject}</span>
                            </div>

                            <div className="flex items-center text-sm">
                              <MdAccessTime className="h-4 w-4 text-indigo-600 mr-2" />
                              <div>
                                <div>{formatDeadline(assignment.deadline)}</div>
                                <div className="text-xs text-gray-500">
                                  {new Date(assignment.deadline).toLocaleDateString()} at{" "}
                                  {new Date(assignment.deadline).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <MdAssignment className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No assignments available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center">
                  <MdAssignment className="h-6 w-6 text-indigo-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-800">Create Assignment</h2>
                </div>
                <button
                  onClick={() => setMakeAssign(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaChevronLeft className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      placeholder="Assignment title"
                    />
                  </div>

                  <div>
                    <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="desc"
                      name="desc"
                      value={formData.desc}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      placeholder="Assignment description"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                      placeholder="Subject name"
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                      Deadline
                    </label>
                    <input
                      type="datetime-local"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <select
                      name="className"
                      id="className"
                      value={formData.className}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="Five">Five</option>
                      <option value="Six">Six</option>
                      <option value="Seven">Seven</option>
                      <option value="Eight">Eight</option>
                      <option value="Nine">Nine</option>
                      <option value="Ten">Ten</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Create Assignment
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AssignmentSection
