import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FaUserAlt,
  FaClipboardList,
  FaLock,
  FaBell,
  FaRobot,
  FaHome,
  FaChartBar,
  FaSignOutAlt,
  FaClipboard,
  FaComments,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaUserGraduate,
} from "react-icons/fa"
const Sidebar = () => {
  const allLinks = [
    { title: "Profile", link: "/layout", icon: <FaUserAlt className="h-5 w-5" /> },
    { title: "Assignments", link: "/layout/assignment", icon: <FaClipboardList className="h-5 w-5" /> },
    { title: "Change Password", link: "/layout/change-pass", icon: <FaLock className="h-5 w-5" /> },
    { title: "Notification", link: "/layout/notifications", icon: <FaBell className="h-5 w-5" /> },
    { title: "AI Friend", link: "/layout/friend", icon: <FaRobot className="h-5 w-5" /> },
    { title: "Result", link: "/layout/result", icon: <FaChartBar className="h-5 w-5" /> },
    { title: "Hostel", link: "/layout/hostel-dashboard", icon: <FaHome className="h-5 w-5" /> },
    { title: "Help Messages", link: "/layout/help", icon: <FaComments className="h-5 w-5" /> },
    { title: "View Students", link: "/layout/liststudents", icon: <FaUserGraduate className="h-5 w-5" /> },
    { title: "Attendance", link: "/layout/attendance", icon: <FaClipboard className="h-5 w-5" /> },
    { title: "Logout", link: "/layout/logout", icon: <FaSignOutAlt className="h-5 w-5" /> },
  ]

  const username = localStorage.getItem("userName")
  const role = localStorage.getItem("role")
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const filteredLinks = allLinks.filter((_, index) => {
    if (role === "Student") return ![7, 8,9].includes(index) 
    if (role === "Teacher") return ![6].includes(index) 
    return true
  })

  return (
    <>
  <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar}></div>}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:w-64 lg:min-h-screen`}
      >
        <div className="h-2"></div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{username}</p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mt-2 space-y-1">
              {filteredLinks.map((item, i) => {
                const isActive = location.pathname === item.link
                return (
                  <Link
                    key={i}
                    to={item.link}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={`mr-3 ${isActive ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-600"}`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <FaChevronRight className="ml-auto h-3 w-3 text-indigo-600" />}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

