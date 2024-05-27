import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import axios from "axios";

const DisplayAttendance = (props) => {
  let arr = [];
  // setRarr(esult)
  console.log(props.array);
  // if(props.array === undefined){
  //   return <div></div>
  // }
  if (props.array) {
    for (let i = 0; i < Object.keys(props.array).length; i++) {
      const tempp = {
        ...props.array[Object.keys(props.array)[i]],
        Name: Object.keys(props.array)[i],
      };
      arr.push(tempp);
    }
    console.log(arr);
  }
  return (
    <>
      {arr.map((res, idx) => (
        <div
          key={props.index}
          className={`${classes.adminDataBody} grid-cols-8`}
        >
          <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
            {idx + 1}
          </h1>
          <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
            {res["Name"].split("_")[0]}
          </h1>
          <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
            {res["Name"].split("_")[3] + " " + res["Name"].split("_")[2]}
          </h1>
          <h1 className={`col-span-2 ${classes.adminDataBodyFields}`}>
            {res?.["Attendance"]??0}
          </h1>
          <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
            {res?.["TotalClasses"]??0}
          </h1>
          <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
            {((res["Attendance"] / res["TotalClasses"])*100)?(res["Attendance"] / res["TotalClasses"])*100:0}
          </h1>
        </div>
      ))}
    </>
  );
};

export default DisplayAttendance;
