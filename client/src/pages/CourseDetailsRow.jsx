import React from "react";
import "./course.css";
import axios from "axios";
import { useEffect, useState } from "react";

const CourseDetailsRow = ({ course }) => {
  const courseDetails = course["Course Details"];
  console.log(courseDetails);
  return (
    <tr>
      <td>{course.courseCode}</td>
      <td>{course.sem}</td>
      <td>{course.year}</td>
      <td>{course.branch}</td>
      <td>{courseDetails.Credits}</td>
      <td>{courseDetails.Instructor}</td>
      <td>{courseDetails["Course Code"]}</td>
      <td>{courseDetails["Course Name"]}</td>
      <td>{courseDetails["Instructor Id"]}</td>
      <td>
        {course?.["registered"] === true ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={async () => {
              try {
                const email = localStorage.getItem("email");
                const response = await axios.post(
                  `https://gc-webathon-2024.onrender.com/api/student/deregisterStudentForCourse`,
                  { email: email, courseId: course.courseId }
                );
                console.log(response);
                alert("Deregistered successfully");
              } catch (error) {
                alert("Error fetching data:");
              }
            }}
          >
            <i className="fas fa-edit">Deregister</i>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={async () => {
              try {
                const email = localStorage.getItem("email");
                const response = await axios.post(
                  `https://gc-webathon-2024.onrender.com/api/student/registerStudentForCourse`,
                  { email: email, courseId: course.courseId }
                );
                console.log(response);
                alert("Deregistered successfully");
              } catch (error) {
                console.error("Error registering for course:", error);
                const errorMessage = error?.response?.data;
                if (errorMessage) {
                  alert("Student already registered for this course");
                }
              }
            }}
          >
            <i className="fas fa-edit">Register</i>
          </button>
        )}
      </td>
    </tr>
  );
};

export default CourseDetailsRow;
