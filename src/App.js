import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSession } from "./utils/sessionMethods";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./components/Dashboard";
import EditCourse from "./components/EditCourse";
import CourseVideos from "./components/CourseVideos";
import MyCourses from "./components/MyCourses";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={getSession("isAuthenticated") ? <Navigate to={'/'} /> : <Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard/>} />
        <Route path="/editCourse/:id" element={<EditCourse/>} />
        <Route path='courseVideos/:course_id' element={<CourseVideos/>} />
        <Route path='myCourses' element={<MyCourses/>} />
      </Route>
    </Routes>
  );
}

export default App;
