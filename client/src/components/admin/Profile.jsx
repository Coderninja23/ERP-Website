import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";
import { firebaseApp } from "../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import adminContext from "../../store/admin-context";
const AdminHomeProfile = () => {
  const navigate = useNavigate();
  const { store } = useContext(adminContext);
  const name = store?.["Admin Details"]?.["Name"];
  const dob = store?.["Admin Details"]?.["DOB"];
  const adminId = store?.["Admin Details"]?.["Id"];

  const updateHandler = () => {
    navigate("/admin/home/profile/update");
  };

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center overflow-auto">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-auto">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <div className="flex-[0.8] mt-4">
            <div className="space-y-5 mt-15">
              <div className="flex text-gray-400 items-center space-x-2 gap-x-4 ml-10 text-xl">
                <HomeIcon />
                <h1>Dashboard</h1>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={updateHandler}
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
                <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-3 justify-between px-8 items-center space-x-4">
                  <div className="flex items-center space-x-4 border-r-2 ml-4">
                    <EngineeringIcon
                      className="rounded-full py-2 bg-orange-300"
                      sx={{ fontSize: 40 }}
                    />
                    <div className="flex flex-col">
                      <h1>Name</h1>
                      <h2 className="text-2xl font-bold">{name}</h2>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 border-r-2">
                    <BoyIcon
                      className="rounded-full py-2 bg-orange-300"
                      sx={{ fontSize: 40 }}
                    />
                    <div className="flex flex-col">
                      <h1>Admin Id.</h1>
                      <h2 className="text-2xl font-bold">{adminId}</h2>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 border-r-2">
                    <BoyIcon
                      className="rounded-full py-2 bg-orange-300"
                      sx={{ fontSize: 40 }}
                    />
                    <div className="flex flex-col">
                      <h1>DOB</h1>
                      <h2 className="text-2xl font-bold">{dob}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeProfile;
