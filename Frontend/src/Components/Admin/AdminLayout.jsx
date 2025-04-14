import { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { FaSchool, FaUserShield, FaTachometerAlt, FaUsers, FaBuilding, FaSignOutAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const AdminLayout = () => {
  const [adminName, setAdminName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName")
    const storedUserRole = localStorage.getItem("role")
    const storedIsLogged = localStorage.getItem("isLogged") === "true"

    setAdminName(storedUserName || "")
    setIsAdmin(storedIsLogged && storedUserRole === "Admin")
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    localStorage.removeItem("isLogged")
    window.location.href = "/admin-login"
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-gradient-to-b from-blue-900 to-indigo-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } min-h-screen`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center ${!isSidebarOpen && "justify-center w-full"}`}>
            <FaUserShield className="text-2xl text-white" />
            {isSidebarOpen && <span className="ml-3 text-xl font-bold">Admin Panel</span>}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                ></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
              )}
            </svg>
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaTachometerAlt className="text-xl" />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2"
            >
              <FaUsers className="text-xl" />
              {isSidebarOpen && <span className="ml-3">User Management</span>}
            </Link>
            <Link
              to="/admin/hostel"
              className="flex items-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2"
            >
              <FaBuilding className="text-xl" />
              {isSidebarOpen && <span className="ml-3">Hostel Management</span>}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center py-3 px-4 rounded-lg hover:bg-red-700 transition-colors mt-2 w-full text-left"
            >
              <FaSignOutAlt className="text-xl" />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <FaSchool className="text-3xl text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-800">School Management System</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-700">Welcome, Admin {adminName}</span>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {adminName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
