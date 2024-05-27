import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import DisplayAttendance from "./DisplayAttendance";

const Body = () => {
  const [loading, setLoading] = useState(false);
  let totalCredits = 0;
  let obtainedCredits = 0;

  const [sem1, setsem1] = useState({});
  const [sem2, setsem2] = useState({});
  const [sem3, setsem3] = useState({});
  const [sem4, setsem4] = useState({});
  const [sem5, setsem5] = useState({});
  const [sem6, setsem6] = useState({});
  const [sem7, setsem7] = useState({});
  const [sem8, setsem8] = useState({});
  const [sem9, setsem9] = useState({});
  const [sem10, setsem10] = useState({});

  // const info = {
  //   2: {
  //     CS3L001_2_2024_CSE: {
  //       Attendance: 1,
  //       Credits: 4,
  //       TotalClasses: 1,
  //       Grade: "A",
  //     },
  //     CS3L004_2_2022_CSE: {
  //       Attendance: 0,
  //       Credits: 2,
  //       TotalClasses: 0,
  //       Grade: "NA",
  //     },
  //     CS3L003_2_2022_CSE: {
  //       Attendance: 0,
  //       Credits: 2,
  //       TotalClasses: 0,
  //       Grade: "NA",
  //     },
  //     CS3L003_2_2023_CSE: {
  //       Attendance: 0,
  //       Credits: 2,
  //       Grade: "NA",
  //     },
  //   },
  //   3: {
  //     CS3L005_3_2022_CSE: {
  //       Attendance: 0,
  //       Credits: 2,
  //       TotalClasses: 0,
  //       Grade: "NA",
  //     },
  //   },
  // };

  const grades = {
    Ex: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    P: 5,
    F: 0,
  };

  const [arr, setarr] = useState([]);

  useEffect(() => {
    const temp = [];
    if (sem1.size !== 0) {
      temp.push(sem1);
    }
    if (sem2.size !== 0) {
      temp.push(sem2);
    }
    if (sem3.size !== 0) {
      temp.push(sem3);
    }
    if (sem4.size !== 0) {
      temp.push(sem4);
    }
    if (sem5.size !== 0) {
      temp.push(sem5);
    }
    if (sem6.size !== 0) {
      temp.push(sem6);
    }
    if (sem7.size !== 0) {
      temp.push(sem7);
    }
    if (sem8.size !== 0) {
      temp.push(sem8);
    }
    if (sem9.size !== 0) {
      temp.push(sem9);
    }
    if (sem10.size !== 0) {
      temp.push(sem10);
    }
    setarr(temp);
    // console.log(arr);
  }, [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10]);

  useEffect(() => {
    const fetchingResults = async () => {
      try {
        const email = localStorage.getItem("email");
        const data = await axios.get(
          "https://gc-webathon-2024.onrender.com/api/student/getResults",
          { params: { email: email } }
        );
        console.log(data);

        setsem1(data.data["1"] ? data.data["1"] : {});
        setsem2(data.data["2"] ? data.data["2"] : {});
        setsem3(data.data["3"] ? data.data["3"] : {});
        setsem4(data.data["4"] ? data.data["4"] : {});
        setsem5(data.data["5"] ? data.data["5"] : {});
        setsem6(data.data["6"] ? data.data["6"] : {});
        setsem7(data.data["7"] ? data.data["7"] : {});
        setsem8(data.data["8"] ? data.data["8"] : {});
        setsem9(data.data["9"] ? data.data["9"] : {});
        setsem10(data.data["10"] ? data.data["10"] : {});
      } catch (err) {
        alert("Error in fetching the results!");
      }
    };

    fetchingResults();
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem] ml-10 mr-10">
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
            </div>
            {!loading && (
              // Object.keys(error).length === 0 &&
              // subjects?.length !== 0 && (
              <div className={classes.adminData}>
                <div className="grid grid-cols-8">
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Sr no.
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Subject Code
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Branch
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Attended
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Total
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Percentage
                  </h1>
                  <h1></h1>
                </div>
                {arr?.map(
                  (res, idx) =>
                    Object.keys(res).length !== 0 && (
                      <div>
                        <h1 className="font-bold italic">
                          Semester - {idx + 1}
                        </h1>
                        {res && <DisplayAttendance index={idx} array={res} />}
                      </div>
                    )
                  // console.log(res)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
