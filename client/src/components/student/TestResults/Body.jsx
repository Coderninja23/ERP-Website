import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import axios from "axios";
import DisplaySgpa from "./DisplaySgpa";

const Body = () => {
  // const email = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  let totalCredits = 0;
  let obtainedCredits = 0;

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

  const grades = {
    Ex: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    P: 5,
    F: 0,
    NA: 0,
  };

  function isNumber(value) {
    return typeof value === "number";
  }

  const [arr, setarr] = useState([]);
  const [sgpa, setsgpa] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [cgpa, setcgpa] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const temp = [];
    if (sem1.size !== 0) {
      temp.push(sem1);
      for (let i = 0; i < Object.keys(sem1).length; i++) {
        totalCredits += parseInt(sem1[Object.keys(sem1)[i]]["Credits"]);
        // if (grades[sem1[Object.keys(sem1)[i]]["Grade"]] === "NA") {
        //   continue;
        // } else {
        obtainedCredits +=
          grades[sem1[Object.keys(sem1)[i]]["Grade"]] *
          parseInt(sem1[Object.keys(sem1)[i]]["Credits"]);
        // }
      }
      console.log(totalCredits);
      sgpa[0] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
      setsgpa(sgpa);
      // sgpa[1] = (tempObtained / tempTotal) * 10;
      cgpa[0] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
      setcgpa(cgpa);
    }
    if (sem2.size !== 0) {
      temp.push(sem2);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem2).length; i++) {
        tempTotal = sem2[Object.keys(sem2)[i]]["Credits"] * 10;
        totalCredits += sem2[Object.keys(sem2)[i]]["Credits"] * 10;

        tempObtained =
          grades[sem2[Object.keys(sem2)[i]]["Grade"]] *
          sem2[Object.keys(sem2)[i]]["Credits"];

        obtainedCredits +=
          grades[sem2[Object.keys(sem2)[i]]["Grade"]] *
          sem2[Object.keys(sem2)[i]]["Credits"];
      }
      sgpa[1] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
      setsgpa(sgpa);
      cgpa[1] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
      setcgpa(cgpa);
    }
    if (sem3.size !== 0) {
      temp.push(sem3);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem3).length; i++) {
        tempTotal += sem3[Object.keys(sem3)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem3[Object.keys(sem3)[i]]["Grade"]] *
          sem3[Object.keys(sem3)[i]]["Credits"];
        totalCredits += sem3[Object.keys(sem3)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem3[Object.keys(sem3)[i]]["Grade"]] *
          sem3[Object.keys(sem3)[i]]["Credits"];
        sgpa[2] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[2] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem4.size !== 0) {
      temp.push(sem4);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem4).length; i++) {
        tempTotal += sem4[Object.keys(sem4)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem4[Object.keys(sem4)[i]]["Grade"]] *
          sem4[Object.keys(sem4)[i]]["Credits"];
        totalCredits += sem4[Object.keys(sem4)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem4[Object.keys(sem4)[i]]["Grade"]] *
          sem4[Object.keys(sem4)[i]]["Credits"];
        sgpa[3] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[3] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem5.size !== 0) {
      temp.push(sem5);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem5).length; i++) {
        tempTotal += sem5[Object.keys(sem5)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem5[Object.keys(sem5)[i]]["Grade"]] *
          sem5[Object.keys(sem5)[i]]["Credits"];
        totalCredits += sem5[Object.keys(sem5)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem5[Object.keys(sem5)[i]]["Grade"]] *
          sem5[Object.keys(sem5)[i]]["Credits"];
        sgpa[4] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[4] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem6.size !== 0) {
      temp.push(sem6);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem6).length; i++) {
        tempTotal += sem6[Object.keys(sem6)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem6[Object.keys(sem6)[i]]["Grade"]] *
          sem6[Object.keys(sem6)[i]]["Credits"];
        totalCredits += sem6[Object.keys(sem6)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem6[Object.keys(sem6)[i]]["Grade"]] *
          sem6[Object.keys(sem6)[i]]["Credits"];
        sgpa[5] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[5] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem7.size !== 0) {
      temp.push(sem7);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem7).length; i++) {
        tempTotal += sem7[Object.keys(sem7)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem7[Object.keys(sem7)[i]]["Grade"]] *
          sem7[Object.keys(sem7)[i]]["Credits"];
        totalCredits += sem7[Object.keys(sem7)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem7[Object.keys(sem7)[i]]["Grade"]] *
          sem7[Object.keys(sem7)[i]]["Credits"];
        sgpa[6] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[6] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem8.size !== 0) {
      temp.push(sem8);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem8).length; i++) {
        tempTotal += sem8[Object.keys(sem8)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem8[Object.keys(sem8)[i]]["Grade"]] *
          sem8[Object.keys(sem8)[i]]["Credits"];
        totalCredits += sem8[Object.keys(sem8)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem8[Object.keys(sem8)[i]]["Grade"]] *
          sem8[Object.keys(sem8)[i]]["Credits"];
        sgpa[7] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[7] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem9.size !== 0) {
      temp.push(sem9);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem9).length; i++) {
        tempTotal += sem9[Object.keys(sem9)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem9[Object.keys(sem9)[i]]["Grade"]] *
          sem9[Object.keys(sem9)[i]]["Credits"];
        totalCredits += sem9[Object.keys(sem9)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem9[Object.keys(sem9)[i]]["Grade"]] *
          sem9[Object.keys(sem9)[i]]["Credits"];
        sgpa[8] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[8] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    if (sem10.size !== 0) {
      temp.push(sem10);
      let tempTotal = 0;
      let tempObtained = 0;
      for (let i = 0; i < Object.keys(sem10).length; i++) {
        tempTotal += sem10[Object.keys(sem10)[i]]["Credits"] * 10;
        tempObtained =
          grades[sem10[Object.keys(sem10)[i]]["Grade"]] *
          sem10[Object.keys(sem10)[i]]["Credits"];
        totalCredits += sem10[Object.keys(sem10)[i]]["Credits"] * 10;
        obtainedCredits +=
          grades[sem10[Object.keys(sem10)[i]]["Grade"]] *
          sem10[Object.keys(sem10)[i]]["Credits"];
        sgpa[9] = (parseInt(tempObtained) / parseInt(tempTotal)) * 10;
        setsgpa(sgpa);
        // sgpa[1] = (tempObtained / tempTotal) * 10;
        cgpa[9] = (parseInt(obtainedCredits) / parseInt(totalCredits)) * 10;
        setcgpa(cgpa);
      }
    }
    setarr(temp);
    console.log(arr);
  }, [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, sem9, sem10]);

  useEffect(() => {
    const fetchingResults = async () => {
      try {
        const data = await axios.get(
          "https://gc-webathon-2024.onrender.com/api/student/getResults",
          { params: { email: "21cs01026@iitbbs.ac.in" } }
        );

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
        // setsem1(info["1"] ? info["1"] : {});
        // setsem2(info["2"] ? info["2"] : {});
        // setsem3(info["3"] ? info["3"] : {});
        // setsem4(info["4"] ? info["4"] : {});
        // setsem5(info["5"] ? info["5"] : {});
        // setsem6(info["6"] ? info["6"] : {});
        // setsem7(info["7"] ? info["7"] : {});
        // setsem8(info["8"] ? info["8"] : {});
        // setsem9(info["9"] ? info["9"] : {});
        // setsem10(info["10"] ? info["10"] : {});
      } catch (err) {
        alert("Error in fetching the results!");
      }
    };

    fetchingResults();
  }, []);

  return (
    <div className="flex-[0.8] mt-3 ml-10">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[24rem]">
          <div className="col-span-3 mr-6 h-[20rem]">
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
              // subjects?.length !== 0 &&
              <div
                className={
                  "flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-black h-[20rem]  shadow-lg pl-5 rounded-md overflow-x-hidden"
                }
              >
                <div className="grid grid-cols-8">
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Sr no.
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Subject Code
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Batch
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-2`}>
                    Credits
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Grade Obtained
                  </h1>
                </div>
                {arr?.map(
                  (res, idx) =>
                    Object.keys(res).length !== 0 && (
                      <div>
                        <h1
                          className={`col-span-2 text-xl ${classes.adminDataHeading}`}
                        >
                          Semester-{idx + 1}
                        </h1>
                        <DisplaySgpa index={idx} array={res} />
                        {/* <h1
                          className={`col-span-2 font-bold text-slate-600	 italic py-2 px-2`}
                        >
                          SGPA-{sgpa[idx]}
                        </h1> */}
                        <h1
                          className={`col-span-2 italic text-slate-600	 ${classes.adminDataHeading}`}
                        >
                          CGPA-{cgpa[idx]}
                        </h1>
                      </div>
                    )
                )}
                <div className="flex-1 bg-grey-500 rounded-lg ml-[3rem] text-xl font-bold">
                  {/* CGPA: {sgpa} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
