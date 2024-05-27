import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const DisplayData = (props) => {
  const [feedback, setFeedback] = useState();
  let code = "";

  const changeHandler = (event) => {
    setFeedback(event.target.value);
  };

  const submitHandler = () => {
    const getting = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const email = auth?.currentUser?.email;
        const body = {
          courseId: code,
          feedback: feedback,
          email: email,
        };
        const res = await axios.post(
          `https://gc-webathon-2024.onrender.com/api/student/submitCourseFeedback`,
          body
        );
        console.log(res);
        alert("Feedback submitted successfully");
      } catch (err) {
        // err is a Axios error
        console.log(err?.response?.data);
        alert(err?.response?.data || "Error  feedback");
      }
    };
    getting();
  };

  return (
    <div>
      {props.obj["courses"].map(
        (res, idx) => (
          (code = res["courseId"]),
          (
            <div
              key={idx}
              className={
                "grid grid-cols-12 hover:scale-105 transition-all duration-150 grid-cols-7"
              }
            >
              <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
                {idx + 1}
              </h1>
              <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
                {res["courseId"].split("_")[0]}
              </h1>
              <h1 className={`col-span-3 ${classes.adminDataBodyFields}`}>
                {res["courseId"].split("_")[3] +
                  " " +
                  res["courseId"].split("_")[2]}
              </h1>
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 border mr-10  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-200 dark:focus:border-blue-200"
                placeholder="Feedback"
                onChange={changeHandler}
              />
              <button
                type="button"
                class="text-white bg-gradient-to-r from-green-400 w-[20rem] mt-10 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          )
        )
      )}
    </div>
  );
};

export default DisplayData;
