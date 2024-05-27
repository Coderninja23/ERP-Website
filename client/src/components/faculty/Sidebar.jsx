import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

// import {decode} from "jwt-decode";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const Sidebar = () => {
  return (
    <div className="flex-[0.2]">
      <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem] overflow-auto">
        <div className="">
          <NavLink
            to="/faculty/home"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HomeIcon className="" />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
          <NavLink
            to="/faculty/home/profile"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Profile</h1>
          </NavLink>

          <NavLink
            to="/faculty/home/attendance"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Mark Attendance</h1>
          </NavLink>

          <NavLink
            to="/faculty/home/courses"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Courses</h1>
          </NavLink>

          <NavLink
            to="/faculty/home/addassignments"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Add Assignments</h1>
          </NavLink>
          <NavLink
            to="/faculty/home/grade"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Grade</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
