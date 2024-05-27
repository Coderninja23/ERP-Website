import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";

import * as classes from "../../../utils/styles";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  // const courseId="CS3L003_2_2022_CSE";
  const [student, setStudent] = useState([]);

  const [checkedValue, setCheckedValue] = useState([]);

  useEffect(() => {
    const getStudent = async () => {
      const response = await axios.get(
        `https://gc-webathon-2024.onrender.com/api/faculty/getCourseDetails`,
        {
          params: {
            courseId: courseId,
          },
        }
      );
      // console.log(response.data);
      setStudent(Object.keys(response.data?.["Students"]));
      console.log(Object.keys(response.data?.["Students"]));
    };
    getStudent();
  }, []);

  const handleInputChange = (event) => {
    const tempCheck = checkedValue;
    let index;
    if (event.target.checked) {
      tempCheck.push(event.target.value);
    }
    setCheckedValue(tempCheck);
    console.log(tempCheck);
  };

  const uploadAttendance = () => {
    let currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const datefinal = date + "/" + month + "/" + year;

    let time = currentDate.getHours();
    if (time > 12) {
      time = time - 12 + "PM";
    } else {
      time += "AM";
    }
    console.log(time);

    const data = {
      courseId: courseId,
      date: datefinal,
      time: time,
      students: checkedValue,
    };
    try {
      const upload = async () => {
        await axios.post(
          `https://gc-webathon-2024.onrender.com/api/faculty/registerAttendence`,
          data
        );
      };
      upload();
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    } finally {
      alert("Successfully updated");
      navigate("/faculty/home/attendance");
    }
  };

  const backHandler = () => {
    navigate("/faculty/home/attendance");
  };

  return (
    <div className="flex-[0.8] mt-3">
      {/* {console.log("djjjjjdd")} */}
      <div className="space-y-5 ml-10">
        <div className="flex text-gray-400 items-center space-x-2 ">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <div className="col-span-3 mr-6">
            <div className={`${classes.adminData} h-[20rem] w-300`}>
              <div className="grid grid-cols-7">
                <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                  S No.
                </h1>
                <h1 className={`col-span-3 ${classes.adminDataHeading}`}>
                  Roll Number
                </h1>
                <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                  Mark
                </h1>
              </div>
              {console.log(student)}
              {student?.map((stu, idx) => {
                console.log(stu);
                return (
                  <div
                    key={idx}
                    className={`${classes.adminDataBody} grid-cols-7`}
                  >
                    <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {idx + 1}
                    </h1>
                    <h1 className={`col-span-3 ${classes.adminDataBodyFields}`}>
                      {stu}
                    </h1>
                    <input
                      onChange={handleInputChange}
                      value={stu?.[idx]}
                      className="col-span-2 border-2 w-16 h-4 mt-3 px-2 "
                      type="checkbox"
                    />
                  </div>
                );
              })}
            </div>
            <div className="space-x-3 flex items-center justify-center mt-5">
              <button
                onClick={uploadAttendance}
                className={`${classes.adminFormSubmitButton} bg-blue-500`}
              >
                Mark
              </button>
              <button
                onClick={backHandler}
                className={`${classes.adminFormSubmitButton} bg-blue-500`}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
