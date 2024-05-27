import React from "react";
import "./course.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseDetailsRow from "./CourseDetailsRow";
import CourseDetailsTable from "./CourseDetailsTable";

const DataTable = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `https://gc-webathon-2024.onrender.com/api/student/getAvailableCourses`,
          { params: { email: email } }
        );
        setCourses(response.data);
        console.log(response);
        // console.log("gggggggg");
        console.log(response.data);
      } catch (error) {
        alert("Error fetching data:");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CourseDetailsTable courses={courses} />
    </div>
  );
};

export default DataTable;
