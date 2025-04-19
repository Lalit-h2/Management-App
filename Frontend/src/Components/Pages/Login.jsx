import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { changeRole, logIn } from "../../Store/auth";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    otp: "",
    newPass: ""
  });
  const [ChangePass, setChangePass] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false); 

  const location = useLocation();
  const isTeacherLogin = location.pathname === "/teacherlogin";
  const isAdminLogin = location.pathname === "/admin-login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/login`, formData, { withCredentials: true });

      console.log(response.data);

      const { role, userId, message } = response.data;

      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("isLogged", "true");

      dispatch(logIn());
      dispatch(changeRole(role));

      toast.success(message);
      setTimeout(() => {
        navigate('/layout');
      }, 2500);
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const [Isotp, setIsotp] = useState(false);
  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-otp`, {
        email: formData.email,
      });
      toast.success(response.data.message);
      setIsotp(true);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send email");
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.newPass) {
      toast.error("Please fill out both fields.");
      return;
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/api/forgot-password`, {
        email: formData.email,
        otp: formData.otp,
        newPass: formData.newPass,
      });
      toast.success(response.data.message);
      setIsotp(false);
      setChangePass(false);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const toggleChangePass = () => {
    setChangePass(!ChangePass);
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="bg-zinc-900 h-screen flex items-center justify-center">
        <div className="bg-zinc-800 p-8 rounded-lg w-80 md:w-96 shadow-lg relative">
          
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 left-4 p-4 text-white bg-zinc-800 rounded-full hover:bg-zinc-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 26 26"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {ChangePass === false ? (
            <div>
              <h2 className="text-2xl font-semibold text-white text-center mb-6">
                {isTeacherLogin ? "Teacher Login" : isAdminLogin ? "Admin Login" : "Student Login"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="text-zinc-400 block mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="text-zinc-400 block mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3 top-3 text-zinc-500"
                    >
                      {showPassword ? <FaEyeSlash  size={20}/> : <FaEye size={20} />} 
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Login
                </button>
              </form>
              <div className="text-center mt-4">
                <span className="text-zinc-400 text-sm">
                  Forgot your password?{" "}
                  <button onClick={toggleChangePass} className="text-indigo-600 hover:underline">
                    Click here
                  </button>
                </span>
              </div>
              <div className="text-center mt-4">
                <span className="text-zinc-400 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signUp" className="text-indigo-600 hover:underline">
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            <div className={`${Isotp ? "hidden" : "bg-zinc-800"} p-8 rounded-lg w-80 md:w-96 shadow-lg`}>
              <h2 className="text-2xl font-semibold text-white text-center mb-6">
                Enter your email
              </h2>
              <form onSubmit={handlePassword}>
                <div className="mb-4">
                  <label htmlFor="email" className="text-zinc-400 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your registered email"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Get otp
                </button>
              </form>
            </div>
          )}

          {Isotp && (
            <div className="bg-zinc-800 p-8 rounded-lg w-80 md:w-96 shadow-lg">
              <h2 className="text-2xl font-semibold text-white text-center mb-6">Reset Your Password</h2>
              <form onSubmit={handleOtp}>
                <div className="mb-4">
                  <label htmlFor="otp" className="text-zinc-400 block mb-2">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter the OTP"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPass" className="text-zinc-400 block mb-2">New Password</label>
                  <input
                    type="password"
                    id="newPass"
                    name="newPass"
                    value={formData.newPass}
                    onChange={handleChange}
                    className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your new password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
