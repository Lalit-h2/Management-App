// import { Route, Routes } from "react-router-dom";
// import { Home } from "./Components/Home/Home";
// import { Login } from "./Components/Pages/Login";
// import { SignUp } from "./Components/Pages/SignUp";
// import { Profile } from "./Components/Pages/Profile";
// import { Layout } from "./Components/Layout/Layout";
// import { useSelector } from "react-redux";
// import NotFoundPage from "./Components/Pages/404";
// import { Logout } from "./Components/Pages/Logout";
// import { EditProfile } from "./Components/Pages/EditProfile";
// import { ChangePass } from "./Components/Pages/ChangePass";
// import { Notifications } from "./Components/Pages/Notifications";
// import AssignmentSection from "./Components/Pages/Assignment";
// import ClassesPage from "./Components/Pages/Classes";
// import AIChat from "./Components/Pages/Aifriend";
// import AttendancePage from "./Components/Pages/Attendance";
// import { DeleteProfile } from "./Components/Pages/DeleteProfile";
// import AddResult from "./Components/Pages/Result";
// import { DeleteUser } from "./Components/Pages/BlockUser";
// import Message from "./Components/Pages/Message";
// import HostelDashboard from "./Components/Pages/HostelDashboard";
// import HostelApplication from "./Components/Pages/HostelApplication";
// import HostelRooms from "./Components/Pages/HostelRooms";
// import HostelPayments from "./Components/Pages/HostelPayments";
// import AdminDashboard from "./Components/Admin/AdminDashboard";
// import SecretAdminCreation from "./Components/Admin/SecretAdminCreation";
// import { Footer } from "./Components/Footer/Footer";
// import AdminRoutes from "./Components/Admin/AdminRoutes";

// const App = () => {
//   const LogIn = useSelector((state) => state.auth.isLogged);

//   return (
//     <div>
//       <Routes>
//     <Route path="/admin-login" element={<AdminRoutes />} />
//       </Routes>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/teacherlogin" element={<Login />} />
//         <Route path="/signUp" element={<SignUp />} />
//         <Route path="/secret/create-admin" element={<SecretAdminCreation />} />
//         <Route path="/layout" element={<Layout />}>
//           <Route index element={<Profile />} />
//           <Route path="assignment" element={<AssignmentSection />} />
//           <Route path="edit-profile" element={<EditProfile />} />
//           <Route path="change-pass" element={<ChangePass />} />
//           <Route path="notifications" element={<Notifications />} />
//           <Route path="friend" element={<AIChat />} />
//           <Route path="hostel-dashboard" element={<HostelDashboard/>} />
//           <Route path="hostel-application" element={<HostelApplication/>} />
//           <Route path="hostel-rooms" element={<HostelRooms/>} />
//           <Route path="hostel-payments" element={<HostelPayments/>} />
//           <Route path="attendance" element={<ClassesPage />} />
//           <Route path="block" element={<DeleteUser />} />
//           <Route path="help" element={<Message />} />
//           <Route path="attendance/attendance/:className" element={<AttendancePage />} />
//           <Route path="result" element={<AddResult />} />
//         </Route>
//         <Route path="/layout/logout" element={<Logout />} />
//         <Route path="/layout/delete" element={<DeleteProfile />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>

//     </div>

//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./Components/Home/Home"
import { Login } from "./Components/Pages/Login"
import { SignUp } from "./Components/Pages/SignUp"
import { Layout } from "./Components/Layout/Layout"
import { Profile } from "./Components/Pages/Profile"
import { EditProfile } from "./Components/Pages/EditProfile"
import { ChangePass } from "./Components/Pages/ChangePass"
import { Notifications } from "./Components/Pages/Notifications"
import { Logout } from "./Components/Pages/Logout"
import { DeleteProfile } from "./Components/Pages/DeleteProfile"
import { DeleteUser } from "./Components/Pages/BlockUser"
import Message from "./Components/Pages/Message"
import AIChat from "./Components/Pages/Aifriend"
import AddResult from "./Components/Pages/Result"
import ClassesPage from "./Components/Pages/Classes"
import AttendancePage from "./Components/Pages/Attendance"
import AssignmentSection from "./Components/Pages/Assignment"
import NotFoundPage from "./Components/Pages/404"
import HostelApplication from "./Components/Pages/HostelApplication"
import HostelRooms from "./Components/Pages/HostelRooms"
import HostelDashboard from "./Components/Pages/HostelDashboard"
import HostelPayments from "./Components/Pages/HostelPayments"
import AdminLogin from "./Components/Admin/AdminLogin"
import AdminLayout from "./Components/Admin/AdminLayout"
import AdminDashboard from "./Components/Admin/AdminDashboard"
import UserManagement from "./Components/Admin/UserManagement"
import HostelApplications from "./Components/Admin/HostelApplications"
import SecretAdminCreation from "./Components/Admin/SecretAdminCreation"
import AdminHostelDashboard from "./Components/Admin/AdminHostelDashboard"
import AdminRoomManagement from "./Components/Admin/AdminRoomManagement"
import DonationPage from "./Components/Donation/Donation"
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacherlogin" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="hostel" element={<AdminHostelDashboard />} />
          <Route path="applications" element={<HostelApplications />} />
          <Route path="room-management" element={<AdminRoomManagement />} />
        </Route>

        <Route path="/secret/create-admin" element={<SecretAdminCreation/>}/>

        <Route path="/layout" element={<Layout />}>
          <Route path="" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="change-pass" element={<ChangePass />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="friend" element={<AIChat />} />
          <Route path="result" element={<AddResult />} />
          <Route path="attendance" element={<ClassesPage />} />
          <Route path="attendance/:className" element={<AttendancePage />} />
          <Route path="assignment" element={<AssignmentSection />} />
          <Route path="block" element={<DeleteUser />} />
          <Route path="help" element={<Message />} />
          <Route path="logout" element={<Logout />} />
          <Route path="delete" element={<DeleteProfile />} />
          <Route path="hostel-dashboard" element={<HostelDashboard />} />
          <Route path="hostel-application" element={<HostelApplication />} />
          <Route path="hostel-rooms" element={<HostelRooms />} />
          <Route path="hostel-payments" element={<HostelPayments />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}

export default App
