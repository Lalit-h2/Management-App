import { useEffect, useState } from "react"
import { FaSchool, FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaHeadset, FaHeart } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { HelpMsg } from '../Pages/HelpMsg';


export const Navbar = ({setIsHome}) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const navigate=useNavigate('')
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed z-20 w-full bg-gradient-to-br from-slate-800 to-zinc-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <FaSchool className="text-4xl text-indigo-500  transition-all duration-300" />
              <div className="absolute -inset-1 bg-indigo-500 rounded-full blur-md opacity-30 hidden group-hover:block"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold group-hover:text-indigo-500 transition-colors duration-300">
              Pimpri Chinchwad Apang Vidyalaya School Management 
              </span>
            
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="nav-link group">
              <FaUserGraduate className="text-xl text-indigo-400 group-hover:text-indigo-300 mr-2 inline-block" />
              <span className="group-hover:text-indigo-300 transition-colors duration-200">Student</span>
            </Link>

            <Link to="/teacherlogin" className="nav-link group">
              <FaChalkboardTeacher className="text-xl text-yellow-400 group-hover:text-yellow-300 mr-2 inline-block" />
              <span className="group-hover:text-yellow-300 transition-colors duration-200">Teacher</span>
            </Link>

            <Link to="/admin-login" className="nav-link group">
              <FaUserShield className="text-xl text-pink-400 group-hover:text-pink-300 mr-2 inline-block" />
              <span className="group-hover:text-pink-300 transition-colors duration-200">Admin</span>
            </Link>

            <Link
              onClick={() => {
                setIsHome(false)
              }}
              className="nav-link group"
            >
              <FaHeadset className="text-xl text-blue-400 group-hover:text-blue-300 mr-2 inline-block" />
              <span className="group-hover:text-blue-300 transition-colors duration-200">Help</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
              <button
              className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full text-white font-medium shadow-lg hover:shadow-pink-500/30 transition-all duration-300 group"
              onClick={() => {
                navigate("/donate")
              }}
            >
              <FaHeart className="mr-2 group-hover:animate-pulse" />
              <span>Donate</span>
            </button>

            <div className="text-right text-lg font-medium">
              <div>{currentTime.toLocaleDateString()}</div>
              <div>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3 pb-3">
            <Link
              to="/login"
              className="flex items-center py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200"
            >
              <FaUserGraduate className="text-xl text-indigo-400 mr-3" />
              <span>Student Login</span>
            </Link>

            <Link
              to="/teacherlogin"
              className="flex items-center py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200"
            >
              <FaChalkboardTeacher className="text-xl text-yellow-400 mr-3" />
              <span>Teacher Login</span>
            </Link>

            <Link
              to="/admin-login"
              className="flex items-center py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200"
            >
              <FaUserShield className="text-xl text-pink-400 mr-3" />
              <span>Admin Login</span>
            </Link>

            <Link
              onClick={() => {
                setIsHome(false)
              }}
              className="flex items-center py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200"
            >
              <FaHeadset className="text-xl text-blue-400 mr-3" />
              <span>Help Desk</span>
            </Link>

            <button
              className="flex items-center py-2 px-4 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200"
              onClick={() => {
                navigate("/donate")
              }}
            >
              <FaHeart className="text-xl text-white mr-3 animate-pulse" />
              <span>Donate Now</span>
            </button>

            <div className="text-sm text-zinc-400 pt-2 border-t border-zinc-700">
              {currentTime.toLocaleDateString()} |{" "}
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      )}
    </div>)
}
