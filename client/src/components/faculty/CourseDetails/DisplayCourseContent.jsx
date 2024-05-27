import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Header from "../Header";

import Sidebar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayCourseContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [courseData, setCourseData] = useState();
  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axios.get(
          `https://gc-webathon-2024.onrender.com/api/faculty/getCourseDetails`,
          {
            params: {
              courseId: courseId,
            },
          }
        );
        console.log(response.data);
        setCourseData(response.data);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const backHandler = () => {
    navigate("/faculty/home/courses");
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
              </div>
              {courseData && (
                <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
                  <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-3 justify-between px-8 items-center space-x-4">
                    <div className="flex items-center space-x-4 border-r-2 ml-4">
                      <EngineeringIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold">Course ID</h1>
                        <h2 className="text-l font">{courseId}</h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold">Intructor</h1>
                        <h2 className="text-l font">
                          {courseData["Course Details"]["Instructor"]}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1 className=" font-bold">Credits</h1>
                        <h2 className="text-l font">
                          {courseData["Course Details"]["Credits"]}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold">Course Name</h1>
                        {courseData["Course Details"]["Course Name"]}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold">Instructor Id</h1>
                        <h2 className="text-l ">
                          {courseData["Course Details"]["Course Name"]}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 border-r-2">
                      <BoyIcon
                        className="rounded-full py-2 bg-orange-300"
                        sx={{ fontSize: 40 }}
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold">Total Classes</h1>
                        <h2 className="text-l">
                          {Object.keys(courseData?.["Attendance"])?.length}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
                    <h1 className="font-bold">Course feedback</h1>
                    <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-2 justify-between px-8 items-center space-x-4">
                      {courseData["Course Feedback"]?.map((feedback, idx) => (
                        <div className="flex items-center space-x-4 border-r-2">
                          <BoyIcon
                            className="rounded-full py-2 bg-orange-300"
                            sx={{ fontSize: 40 }}
                          />
                          <div className="flex flex-col">
                            <h1 className="font-bold">Feedback {idx + 1}</h1>
                            <h2 className="text-l font">{feedback}</h2>
                          </div>
                        </div>
                      ))}
                      {!courseData && (
                        <h1 className="font-bold">No feedback</h1>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
                    <h1 className="font-bold">Faculty feedback</h1>
                    <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-2 justify-between px-8 items-center space-x-4">
                      {courseData?.["Faculty Feedback"]?.map(
                        (feedback, idx) => (
                          <div className="flex items-center space-x-4 border-r-2">
                            <BoyIcon
                              className="rounded-full py-2 bg-orange-300"
                              sx={{ fontSize: 40 }}
                            />
                            <div className="flex flex-col">
                              <h1 className="font-bold">Feedback {idx + 1}</h1>
                              <h2 className="text-l font">{feedback}</h2>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="ml-10">
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={backHandler}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCourseContent;
