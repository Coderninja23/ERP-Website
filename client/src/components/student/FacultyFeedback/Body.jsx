import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
import DisplayData from "./DisplayData";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const Body = () => {
  const [courses, setCourses] = useState();
  const email = localStorage.getItem("email");
  const [updatedCourses, setUpdatedCourses] = useState();
  const arr = [];

  useEffect(() => {
    // console.log(courses);
    courses?.map((res) => {
      arr.push(res);
    });
    // console.log(arr);
    setUpdatedCourses(arr);
  }, [courses]);

  useEffect(() => {
    const response = async () => {
      const auth = getAuth(firebaseApp);
      const email = auth?.currentUser?.email;
      const data = await axios.get(
        `https://gc-webathon-2024.onrender.com/api/student/getRegisteredCourses`,
        {
          params: {
            email: email,
          },
        }
      );

      setCourses(data.data);
    };
    response();
  }, []);

  return (
    <div className="flex-[0.8] mt-3 ml-10 mr-10">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-1">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-2 bg-white rounded-xl pt-6 pl-3 h-[30rem]">
          <div className="col-span-3 mr-2">
            <div className={classes.adminData}>
              <div className="grid grid-cols-7">
                <h1 className={`${classes.adminDataHeading} col-span-1`}>
                  Sr no.
                </h1>
                <h1 className={`${classes.adminDataHeading} col-span-2`}>
                  Subject Code
                </h1>
                <h1 className={`${classes.adminDataHeading} col-span-3`}>
                  Professor
                </h1>

                <h1 className={`${classes.adminDataHeading} col-span-1`}>
                  Feedback
                </h1>
              </div>
              {
                // console.log(updatedCourses)
              }
              {updatedCourses &&
                updatedCourses.map((sub, idx) => <DisplayData obj={sub} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
