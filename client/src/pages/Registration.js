import React, { useEffect } from "react";
import DataTable1 from "./registerCourses";
import Header from "../components/student/Header";
import Sidebar from "../components/student/Sidebar";
const Registration = () => {
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-auto">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <DataTable1 />
        </div>
      </div>
    </div>
  );
};

export default Registration;
