"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { IoIosCreate } from "react-icons/io"
import { MdDelete } from "react-icons/md"

const HostelPayments = () => {
  const [payments, setPayments] = useState([])
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState([])
  const role = localStorage.getItem("role")

  const [formData, setFormData] = useState({
    studentId: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash",
    description: "Hostel Fee",
    semester: "First",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch payments
        const paymentsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/payments`, {
          withCredentials: true,
        })
        setPayments(paymentsResponse.data.payments || [])

        // Fetch students for the dropdown if admin/teacher
        if (role !== "Student") {
          const studentsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/students`, {
            withCredentials: true,
          })
          setStudents(studentsResponse.data.students || [])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [role])

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/payments`, formData, {
        withCredentials: true,
      })
      toast.success(response.data.message || "Payment recorded successfully!")

      // Add the new payment to the list
      setPayments([response.data.payment, ...payments])
      setShowPaymentForm(false)
      resetForm()
    } catch (error) {
      console.error("Error recording payment:", error)
      toast.error(error.response?.data?.message || "Failed to record payment.")
    }
  }

  const handleDelete = async (paymentId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/hostel/payments/${paymentId}`, {
        withCredentials: true,
      })
      toast.success(response.data.message || "Payment deleted successfully!")

      // Remove the payment from the list
      setPayments(payments.filter((payment) => payment._id !== paymentId))
    } catch (error) {
      console.error("Error deleting payment:", error)
      toast.error(error.response?.data?.message || "Failed to delete payment.")
    }
  }

  const resetForm = () => {
    setFormData({
      studentId: "",
      amount: "",
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "Cash",
      description: "Hostel Fee",
      semester: "First",
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading payment data...</div>
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <div className="p-6 bg-[url(https://wallpaperaccess.com/full/1685406.jpg)] min-h-screen mt-0 md:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">Hostel Payments</h2>
          {role !== "Student" && (
            <div
              className="text-blue-600 text-5xl mb-4 hover:text-blue-800 hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={() => setShowPaymentForm(true)}
            >
              <IoIosCreate />
            </div>
          )}
        </div>

        {role !== "Student" && showPaymentForm && (
          <div className="max-w-2xl mx-auto p-6 bg-blue-100 mb-4 text-blue-950 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Record New Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="studentId" className="block text-lg font-medium">
                  Student
                </label>
                <select
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} - {student.className}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="amount" className="block text-lg font-medium">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="paymentDate" className="block text-lg font-medium">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="paymentMethod" className="block text-lg font-medium">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="semester" className="block text-lg font-medium">
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="First">First Semester</option>
                    <option value="Second">Second Semester</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-medium">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Record Payment
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white p-2 rounded-lg font-semibold hover:bg-gray-600"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  {role !== "Student" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                        <div className="text-xs text-gray-500">{payment.className}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">₹{payment.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(payment.paymentDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {payment.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.description} ({payment.semester} Semester)
                      </td>
                      {role !== "Student" && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDelete(payment._id)} className="text-red-600 hover:text-red-900">
                            <MdDelete className="w-5 h-5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={role !== "Student" ? 6 : 5} className="px-6 py-4 text-center text-gray-500">
                      No payment records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default HostelPayments
