import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
      <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
        <div className="">
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HomeIcon className="" />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
          <NavLink
            to="/admin/home/profile"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Profile</h1>
          </NavLink>
          <NavLink
            to="/admin/addFaculty"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HomeIcon className="" />
            <h1 className="font-normal">Add Faculty</h1>
          </NavLink>
          <NavLink
            to="/admin/addStudent"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Add Student</h1>
          </NavLink>
          <NavLink
            to="/admin/getStudent"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Display Student</h1>
          </NavLink>
          <NavLink
            to="/admin/getFaculty"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Display Faculty</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
