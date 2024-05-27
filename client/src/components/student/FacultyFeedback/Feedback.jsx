import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubject } from "../../../redux/actions/studentActions";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const FacultyFeedback = () => {
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-3 overflow-auto">
        <Header />
        <div className="flex flex-[0.6]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default FacultyFeedback;
