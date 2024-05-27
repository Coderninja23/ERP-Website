import React, { useEffect, useState, useContext } from "react";
import BoyIcon from "@mui/icons-material/Boy";

import * as classes from "../../../utils/styles";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import facultyContext from "../../../store/faculty-context";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { store } = useContext(facultyContext);
  const email = store?.["Faculty Details"]?.["Email"];
  const [grade, setGrade] = useState("");
  const [roll, setRoll] = useState();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    try {
      const getStudents = async () => {
        const data = await axios.get(
          "https://gc-webathon-2024.onrender.com/api/faculty/getAllRegisteredStudents",
          {
            params: {
              courseId: courseId,
            },
          }
        );
        setStudents(data.data);
      };
      getStudents();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateHandler = (e) => {
    const body = {
      rollNumber: e.target.value,
      courseId: courseId,
      grade: grade,
    };
    try {
      const sendingData = async () => {
        const response = await axios.post(
          `https://gc-webathon-2024.onrender.com/api/faculty/giveGrade`,
          body
        );
        console.log(response);
      };
      sendingData();
      alert("Grade updated successfully!");
    } catch (err) {
      alert("Could not update Grade!");
      const message = err.response.data;
      console.log(message);
      alert(message);
    } finally {
      alert("Grade updated successfully!");
      navigate("/faculty/home");
    }
  };

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center overflow-auto">
      <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[100%] rounded-2xl shadow-2xl space-y-6 overflow-auto ml-10 mr-10">
        <Header />
        <div className="flex flex-[0.95] ml-10 mr-10">
          <Sidebar />
          <div className="flex-[0.8] mt-3">
            <div className="space-y-5 ml-10">
              <div className="flex text-gray-400 items-center space-x-2 ">
                <BoyIcon />
                <h1>All Students</h1>
              </div>
              <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
                <div className="col-span-3 mr-6">
                  <div className={`${classes.adminData} h-[20rem] w-300`}>
                    <div className="grid grid-cols-7">
                      <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                        S No.
                      </h1>
                      <h1 className={`col-span-3 ${classes.adminDataHeading}`}>
                        Roll Number
                      </h1>
                      <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                        Grade
                      </h1>
                      <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                        Submit
                      </h1>
                    </div>
                    {students?.map((stu, idx) => (
                      <div
                        key={idx}
                        className={`${classes.adminDataBody} grid-cols-7`}
                      >
                        <h1
                          className={`col-span-1 ${classes.adminDataBodyFields}`}
                        >
                          {idx + 1}
                        </h1>
                        <h1
                          className={`col-span-3 ${classes.adminDataBodyFields}`}
                        >
                          {students[idx]}
                        </h1>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border mr-10  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200"
                          placeholder="Grade"
                          onChange={(e) => setGrade(e.target.value)}
                        />
                        <button
                          // onClick={uploadAttendance}
                          className={`${classes.adminFormSubmitButton} bg-blue-500`}
                          onClick={updateHandler}
                          value={students[idx]}
                        >
                          Grade
                        </button>
                      </div>
                    ))}
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

export default Body;
