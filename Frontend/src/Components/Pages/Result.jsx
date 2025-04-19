"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const AddResult = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("card")

  const tableHeadings = ["Marathi", "English", "Mathematics", "History", "Geography", "Physics", "Biology", "Total"]

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-result`, {
          withCredentials: true,
        })
        console.log(response)
        setResults(response.data.results)
      } catch (error) {
        console.error("Error fetching results:", error)
        toast.error("Failed to fetch results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  const [formData, setFormData] = useState({
    studentId: "",
    Marathi: "",
    English: "",
    Mathematics: "",
    History: "",
    Geography: "",
    Physics: "",
    Biology: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const toastId = toast.loading("Adding result...")
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/post-result`, formData, {
        withCredentials: true,
      })
      toast.dismiss(toastId)
      toast.success("Result added successfully!")

      setFormData({
        studentId: "",
        Marathi: "",
        English: "",
        Mathematics: "",
        History: "",
        Geography: "",
        Physics: "",
        Biology: "",
      })
    } catch (error) {
      toast.dismiss(toastId)
      toast.error("Error adding result. Please try again.")
      console.error("Error adding result:", error)
    }
  }

  const role = localStorage.getItem("role")
  const isTeacher = role !== "Student"

  const calculatePercentage = (value) => {
    return (Number.parseInt(value) / 100) * 100
  }

  const calculateTotal = (result) => {
    const subjects = ["marathi", "english", "mathematics", "history", "geography", "physics", "biology"]
    let total = 0
    const maxPossible = subjects.length * 100

    subjects.forEach((subject) => {
      if (result[subject]) {
        total += Number.parseInt(result[subject])
      }
    })

    const percentage = ((total / maxPossible) * 100).toFixed(2)
    return { total, percentage }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen mt-12 bg-gradient-to-b from-sky-50 to-white py-8 px-4 md:py-12">
        {isTeacher ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-indigo-700 px-6 py-5 text-white">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-2xl md:text-3xl font-bold">Upload Student Results</h2>
                </div>
                <p className="text-sky-100 mt-1">Enter student marks for all subjects</p>
              </div>
              <div className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="studentId" className="block text-lg font-medium text-sky-800">
                      Student ID
                    </label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border text-black border-sky-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                      placeholder="Enter Student ID"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["Marathi", "English", "Mathematics", "History", "Geography", "Physics", "Biology"].map(
                      (subject, index) => (
                        <div key={index} className="space-y-2">
                          <label
                            htmlFor={subject.toLowerCase()}
                            className="block text-lg font-medium text-sky-800 flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                            {subject}
                          </label>
                          <input
                            type="number"
                            id={subject.toLowerCase()}
                            name={subject}
                            value={formData[subject]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-sky-400 focus:ring-2 text-black focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                            placeholder={`Enter marks for ${subject} (0-100)`}
                            min="0"
                            max="100"
                            required
                          />
                        </div>
                      ),
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-sky-600 to-indigo-700 hover:from-sky-700 hover:to-indigo-800 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Submit Results
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-indigo-700 px-6 py-5 text-white">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h2 className="text-2xl md:text-3xl font-bold">Your Academic Results</h2>
                </div>
                <p className="text-sky-100 mt-1">View your performance across all subjects</p>
              </div>
              <div className="p-6">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab("card")}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "card"
                        ? "text-sky-600 border-b-2 border-sky-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Card View
                  </button>
                  <button
                    onClick={() => setActiveTab("detailed")}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === "detailed"
                        ? "text-sky-600 border-b-2 border-sky-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Detailed View
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
                  </div>
                ) : results.length > 0 ? (
                  activeTab === "card" ? (
                    <div className="space-y-6">
                      {results.map((result, index) => {
                        const { total, percentage } = calculateTotal(result)
                        return (
                          <div
                            key={index}
                            className="bg-white rounded-lg border border-sky-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                          >
                            <div className="bg-sky-50 p-4 pb-2">
                              <h3 className="text-xl font-bold text-sky-800">Result Summary</h3>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-gray-500">Overall Performance</p>
                                <div className="text-2xl font-bold text-sky-700">{percentage}%</div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div className="bg-sky-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tableHeadings
                                  .filter((h) => h !== "Total")
                                  .map((subject, i) => (
                                    <div key={i} className="space-y-1">
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">{subject}</span>
                                        <span className="text-sky-700 font-semibold">
                                          {result[subject.toLowerCase()] || "0"}/100
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                          className="bg-sky-600 h-1.5 rounded-full"
                                          style={{
                                            width: `${calculatePercentage(result[subject.toLowerCase()] || 0)}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-gray-800">Total Score</span>
                                  <span className="text-xl font-bold text-sky-800">
                                    {total}/{tableHeadings.length * 100 - 100}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg border border-sky-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          <div className="bg-sky-50 p-4">
                            <h3 className="text-xl font-bold text-sky-800">Detailed Results</h3>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {tableHeadings.map((heading, i) => (
                              <div key={i} className="flex items-center p-4 hover:bg-gray-50">
                                <div className="w-1/2 font-medium text-gray-700">{heading}</div>
                                <div className="w-1/2">
                                  {heading === "Total" ? (
                                    <span className="font-bold text-sky-700">{calculateTotal(result).total}</span>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-sky-700">
                                        {result[heading.toLowerCase()] || "0"}
                                      </span>
                                      <div className="w-full bg-gray-200 rounded-full h-2 flex-1">
                                        <div
                                          className="bg-sky-600 h-2 rounded-full"
                                          style={{
                                            width: `${calculatePercentage(result[heading.toLowerCase()] || 0)}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Results Found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Your results haven't been uploaded yet. Please check back later or contact your teacher.
                    </p>
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

export default AddResult
