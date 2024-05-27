import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTest } from "../../../redux/actions/facultyActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_TEST, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
const Body = () => {
  const [courseName, setCourseName] = useState();
  const [courseCode, setCourseCode] = useState();
  const [facultyEmail, setFacultyEmail] = useState();
  const [credits, setCredits] = useState();
  const [branch, setBranch] = useState();
  const [semester, setSemester] = useState();
  const [year, setYear] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    try {
      const data = {
        courseName: courseName,
        courseCode: courseCode,
        facultyEmail: facultyEmail,
        credits: credits,
        branch: branch,
        sem: semester,
        year: year,
      };
      console.log(data);
      try {
        const response = async () => {
          const res = await axios.post(
            "https://gc-webathon-2024.onrender.com/api/faculty/registerCourse",
            data
          );
          // console.log("jjj");
          if (res.response.status === 404) {
            alert("Could not register course!");
          } else if (res.response.status === 200) {
            alert("Course Registered Successfully!");
          }
        };
        response();
      } catch (err) {
        alert(err);
      }
      // console.log(response);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-4">
        <div className="flex text-gray-400 items-center space-x-2 ml-10">
          <AddIcon />
          <h1>Create Test</h1>
        </div>
        <div className=" ml-10 h-[24rem] mr-10 bg-white flex flex-col rounded-xl ">
          <form className={classes.adminForm0} onSubmit={formSubmitHandler}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Course Name :</h1>

                  <input
                    placeholder="Course Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    onChange={(e) => setCourseName(e.target.value)}
                    // value={value.test}
                    // onChange={(e) =>
                    //   setValue({ ...value, test: e.target.value })
                    // }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Course Code :</h1>

                  <input
                    required
                    placeholder="Course Code"
                    className={classes.adminInput}
                    type="text"
                    onChange={(e) => setCourseCode(e.target.value)}
                    // value={value.subjectCode}
                    // onChange={(e) =>
                    //   setValue({ ...value, subjectCode: e.target.value })
                    // }
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>

                  <input
                    required
                    // placeholder={user.result.department}
                    className={classes.adminInput}
                    type="text"
                    placeholder="Department"
                    onChange={(e) => setFacultyEmail(e.target.value)}
                    // value={user.result.department}
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Faculty Email</h1>
                  <input
                    required
                    // placeholder={user.result.department}
                    className={classes.adminInput}
                    type="text"
                    placeholder="Faculty Email"
                    onChange={(e) => setFacultyEmail(e.target.value)}
                    // value={user.result.department}
                  />
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Credits</h1>

                  <input
                    required
                    placeholder="Credits"
                    className={classes.adminInput}
                    type="number"
                    onChange={(e) => setCredits(e.target.value)}
                    // value={value.totalMarks}
                    // onChange={(e) =>
                    //   setValue({ ...value, totalMarks: e.target.value })
                    // }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Branch</h1>

                  <input
                    required
                    className={classes.adminInput}
                    type="text"
                    placeholder="Branch"
                    onChange={(e) => setBranch(e.target.value)}
                    // value={value.date}
                    // onChange={(e) =>
                    //   setValue({ ...value, date: e.target.value })
                    // }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Semester</h1>

                  <input
                    required
                    className={classes.adminInput}
                    type="number"
                    placeholder="Semester"
                    onChange={(e) => setSemester(e.target.value)}
                    // value={value.date}
                    // onChange={(e) =>
                    //   setValue({ ...value, date: e.target.value })
                    // }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Year</h1>

                  <input
                    required
                    className={classes.adminInput}
                    type="number"
                    placeholder="Year"
                    onChange={(e) => setYear(e.target.value)}
                    // value={value.date}
                    // onChange={(e) =>
                    //   setValue({ ...value, date: e.target.value })
                    // }
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              {/* <button 
                // onClick={() => {
                //   setValue({
                //     subjectCode: "",
                //     section: "",
                //     year: "",
                //     test: "",
                //     totalMarks: "",
                //     date: "",
                //     department: "",
                //   });
                  // setError({});
                // }}*/}
              {/* className={classes.adminFormClearButton}
                type="button"> */}
              {/* Clear
              </button> */}
            </div>
            <div className={classes.loadingAndError}>
              {/* {loading && (
                <Spinner
                  message="Creating Test"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )} */}
              {/* {(error.testError || error.backendError) && (
                <p className="text-red-500">
                  {error.testError || error.backendError}
                </p>
              )} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
