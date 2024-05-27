import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import axios from "axios";

const DisplaySgpa = (props) => {
  let arr = [];
  // setRarr(esult)
  console.log(props.array);
  // result.
  // console.log(Object.keys(props.array));
  for (let i = 0; i < Object.keys(props.array).length; i++) {
    const tempp = {
      ...props.array[Object.keys(props.array)[i]],
      Name: Object.keys(props.array)[i],
    };
    arr.push(tempp);
  }
  console.log(arr);

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
            {res["Credits"]}
          </h1>
          <h1 className={`col-span-1 ${classes.adminDataBodyFields}`}>
            {res["Grade"]}
          </h1>
        </div>
      ))}
    </>
  );
};

export default DisplaySgpa;
