import React from "react";
import { Routes, Route } from "react-router-dom";

import StudentLogin from "./components/login/studentLogin/StudentLogin";
import StudentHome from "./components/student/StudentHome";
import StudentUpdate from "./components/student/profile/Update/Update";

import TestResult from "./components/student/TestResults/TestResult";

import Feedback from "./components/student/Feedback/Feedback";
import FacultyFeedback from "./components/student/FacultyFeedback/Feedback";

import AdminLogin from "./components/login/adminLogin/AdminLogin";
import AdminHome from "./components/admin/AdminHome";
import AdminHomeProfile from "./components/admin/Profile";
import AdminProfileUpdate from "./components/admin/profile/update/Update";

import FacultyLogin from "./components/login/facultyLogin/FacultyLogin";
import FacultyHome from "./components/faculty/FacultyHome";
import FacultyProfileUpdate from "./components/faculty/profile/update/Update";

import StudentProfile from "./components/student/Profile";
import StudentLayout from "./components/student/StudentLayout";
import Registration from "./pages/Registration";
import SeeCourses from "./pages/SeeCourses";
import Login from "./components/login/Login";
import Profile from "./components/faculty/Profile";
import MarkAttendance from "./components/faculty/MarkAttendace/MarkAttendance";
import CourseDetails from "./components/faculty/CourseDetails/CourseDetails";
import Mark from "./components/faculty/MarkAttendace/Mark";
import AdminLayout from "./components/admin/AdminLayout";
import AddFaculty from "./components/admin/addFaculty/AddFaculty";
import AddStudent from "./components/admin/addStudent/AddStudent";
import FacultyLayout from "./components/faculty/FacultyLayout";
import DisplayCourseContent from "./components/faculty/CourseDetails/DisplayCourseContent";
import AddAssignment from "./components/faculty/AddAsignments/AddAssignments";
import Attendance from "./components/student/attendance/Attendance";
import EventsFeedback from "./components/student/EventsFeedback/eventsFeedback";
import GetStudent from "./components/admin/getStudent/GetStudent";
import Grades from "./components/faculty/Grades/Grades";
import Body from "./components/faculty/Grades/Body";

import GetFaculty from "./components/admin/getFaculty/GetFaculty";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/student" element={<StudentLayout />}>
        <Route path="home" element={<StudentHome />} />
        <Route path="home/profile" element={<StudentProfile />} />
        <Route path="home/profile/update" element={<StudentUpdate />} />
        <Route path="testResult" element={<TestResult />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="faculty-feedback" element={<FacultyFeedback />} />
        <Route path="courseRegistration" element={<Registration />} />
        <Route path="eventsFeedback" element={<EventsFeedback />} />
        <Route path="getCourses" element={<SeeCourses />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="home/profile" element={<AdminHomeProfile />} />
        <Route path="home/profile/update" element={<AdminProfileUpdate />} />
        <Route path="addStudent" element={<AddStudent />} />
        <Route path="addFaculty" element={<AddFaculty />} />
        <Route path="getStudent" element={<GetStudent />} />
        <Route path="getFaculty" element={<GetFaculty />} />
      </Route>

      <Route path="/login/faculty" element={<FacultyLogin />} />

      <Route path="/faculty" element={<FacultyLayout />}>
        <Route path="home" element={<Profile />} />
        <Route path="home/profile" element={<FacultyHome />} />
        <Route path="home/profile/update" element={<FacultyProfileUpdate />} />
        <Route path="home/attendance/:courseId" element={<Mark />} />
        <Route path="home/attendance" element={<MarkAttendance />} />
        <Route path="home/courses" element={<CourseDetails />} />
        <Route path="home/addassignments" element={<AddAssignment />} />
        <Route path="home/grade" element={<Grades />} />
        <Route path="home/grade/:courseId" element={<Body />} />
        <Route
          path="home/courses/:courseId"
          element={<DisplayCourseContent />}
        />
      </Route>
    </Routes>
  );
};

export default App;
