import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaClipboardList, FaLock, FaBell, FaRobot, FaHome, FaChartBar, FaSignOutAlt, FaClipboard, FaPen, FaComments } from 'react-icons/fa';

const ResponsiveSidebar = () => {
  const links = [
    {/*0 */ title: "Profile", link: "/layout", icon: <FaUserAlt className="h-6 w-6" /> },
    {/*1 */ title: "Assignments", link: "/layout/assignment", icon: <FaClipboardList className="h-6 w-6" /> },
    {/*2 */ title: "Change Password", link: "/layout/change-pass", icon: <FaLock className="h-6 w-6" /> },
    {/*3 */ title: "Notification", link: "/layout/notifications", icon: <FaBell className="h-6 w-6" /> },
    {/*4 */ title: "AI Friend", link: "/layout/friend", icon: <FaRobot className="h-6 w-6" /> },
    {/*5 */ title: "Result", link: "/layout/result", icon: <FaChartBar className="h-6 w-6" /> },
    {/*6 */ title: "Hostel", link: "/layout/hostel-dashboard", icon: <FaHome className="h-6 w-6" /> },
    {/*7 */ title: "Help Messages", link: "/layout/help", icon: <FaComments className="h-6 w-6" /> },
    {/*8 */ title: "Attendance", link: "/layout/attendance", icon: <FaClipboard className="h-6 w-6" /> },
    {/*9 */ title: "Logout", link: "/layout/logout", icon: <FaSignOutAlt className="h-6 w-6" /> },
  ]

  const username = localStorage.getItem("userName");
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");
  const toggleSidebar = () => setIsOpen(!isOpen);

  if (role === "Student") {
    links.splice(7, 2);
  }

  if (role === "Teacher") {
    links.splice(6, 1);
  }

  return (
    <div className="flex">
      <div
        className={`fixed mt-3 rounded text-center md:top-[8vh] top-0 left-0 h-full z-40 bg-gradient-to-b from-[#4388D3] to-[#FF9DDA] transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } w-[200px] md:translate-x-0 md:w-1/6`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 md:hidden text-white hover:text-gray-300"
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <div className="text-blue-900 p-4 space-y-4 mt-10 md:mt-0">
          <h1 className="md:text-3xl font-bold md:hidden">Sidebar</h1>
          <ul className="space-y-4">
            {links.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  className="flex items-center justify-start text-left p-2 font-semibold md:text-xl md:font-semibold text-white hover:bg-gray-700 rounded-lg"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      <div className="flex-1 flex flex-col md:ml-64">
        <nav className="bg-blue-900 shadow-md p-4 flex justify-between items-center md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-black focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className="block w-full h-1 bg-black"></span>
              <span className="block w-full h-1 bg-black"></span>
              <span className="block w-full h-1 bg-black"></span>
            </div>
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👋</span>
            <p className="text-lg">
              Hi, <span className="font-semibold">{username}</span>!
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
