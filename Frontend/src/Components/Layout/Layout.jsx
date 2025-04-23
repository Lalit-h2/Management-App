import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import { Outlet, useNavigate } from "react-router-dom"
import { FaSchool, FaBell, FaUserCircle } from "react-icons/fa"
import UnauthorizedPage from "../Pages/UnauthorizedPage"

export const Layout = () => {
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  const [isLogged, setIsLogged] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const navigate=useNavigate()
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName")
    const storedUserRole = localStorage.getItem("role")
    const storedIsLogged = localStorage.getItem("isLogged") === "true"

    setUserName(storedUserName || "")
    setUserRole(storedUserRole || "")
    setIsLogged(storedIsLogged)
  }, [])

  if (!isLogged) {
    return <UnauthorizedPage />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="fixed w-full z-50 bg-gradient-to-r from-gray-900 to-indigo-900 shadow-lg">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FaSchool className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-lg font-bold text-white">Pimpri Chinchwad Apang Vidyalaya </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaBell className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" onClick={()=>{navigate('./notifications')}} />
                
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-200">Welcome, {userName}</span>
                    {userRole && (
                      <span className="text-xs px-2 py-0.5 bg-indigo-700 text-indigo-100 rounded-full">{userRole}</span>
                    )}
                  </div>
                  <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <FaUserCircle className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50 via-indigo-50 to-slate-100 relative">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
