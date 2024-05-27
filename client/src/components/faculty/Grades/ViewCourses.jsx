import React, { useContext, useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import facultyContext from "../../../store/faculty-context";
import DisplayData from "./DisplayData";

const ViewCourses = () => {
  // const [course, setCourse] = useState([]);
  const { store } = useContext(facultyContext);
  const [loading, setLoading] = useState(false);
  const course = store?.Courses;

  const email = store?.["Faculty Details"]["Email"];

  return (
    <div className="flex-[0.8] mt-3 overflow-auto">
      <div className="space-y-5">
        <div className="ml-10 flex text-gray-400 items-center space-x-2 overflow-auto">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 ml-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem] overflow-auto">
          <div className="col-span-3 mr-10 overflow-auto">
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
              <div className={classes.adminData}>
                <div className="grid grid-cols-3">
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Sr no.
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Courses
                  </h1>
                  <h1 className={`${classes.adminDataHeading} col-span-1`}>
                    Grade
                  </h1>
                  {/* <button
                    type="button"
                    class="text-white mb-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={markHandler}
                    value={data && data["Course Details"]["Course Code"]}
                  >
                    View
                  </button> */}
                  {course.length !== 0 &&
                    course?.map((res, idx) => (
                      <DisplayData obj={res} index={idx} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourses;
