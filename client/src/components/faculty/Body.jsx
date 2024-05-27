import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import facultyContext from "../../store/faculty-context";
const Body = () => {

  const { store } = useContext(facultyContext);

  const name=store?.["Faculty Details"]?.["Name"];
  const facultyId=store?.["Faculty Details"]?.["Id"];
  const dob=store?.["Faculty Details"]?.["DOB"];
  const dept=store?.["Academic Details"]?.["Department"];
  const designation=store?.["Academic Details"]?.["Designation"];
  const school=store?.["Academic Details"]?.["School"];
  const email=store?.["Faculty Details"]?.["Email"];

  return (
    <div className="flex-[0.8] mt-4">
      <div className="space-y-5 mt-15 ml-5">
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Name</h1>
                <h2 className="text-2xl font-bold">{name}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Faculty Id</h1>
                <h2 className="text-2xl font-bold">{facultyId}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Department</h1>
                <h2 className="text-2xl font-bold">{dept}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Designation</h1>
                <h2 className="text-2xl font-bold">{designation}</h2>
              </div>
            </div>
          </div>



          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-3 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Date of Birth</h1>
                <h2 className="text-2xl font-bold">{dob}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Email</h1>
                <h2 className="text-2xl font-bold">{email}</h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>School</h1>
                <h2 className="text-2xl font-bold">{school}</h2>
              </div>
            </div>         
          </div>



        </div>
      </div>
    </div>
  );
};

export default Body;
