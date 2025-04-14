// import { Routes, Route, Navigate } from "react-router-dom"
// import AdminLogin from "./AdminLogin"
// import AdminDashboard from "./AdminDashboard"

// const AdminRoutes = () => {
//   const isAdminLoggedIn = localStorage.getItem("role") === "Admin" && localStorage.getItem("isLogged") === "true"

//   return (
//     <Routes>
//       <Route path="/" element={<AdminLogin />} />
//       <Route path="/dashboard" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
//       <Route path="*" element={<Navigate to="/admin/login" />} />
//     </Routes>
//   )
// }

// export default AdminRoutes

import { Routes, Route, Navigate } from "react-router-dom"
import AdminLogin from "./AdminLogin"
import AdminDashboard from "./AdminDashboard"

const AdminRoutes = () => {
  const isAdminLoggedIn = localStorage.getItem("role") === "Admin" && localStorage.getItem("isLogged") === "true"

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  )
}

export default AdminRoutes

