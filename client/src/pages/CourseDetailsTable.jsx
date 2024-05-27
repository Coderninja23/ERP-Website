import React from "react";
import "./course.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CourseDetailsRow from "./CourseDetailsRow";

const CourseDetailsTable = ({ courses }) => {
  if (!courses) {
    return <div>No courses available</div>;
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table className="stickyheader">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Sem</th>
                <th>Year</th>
                <th>Branch</th>
                <th>Credits</th>
                <th>Instructor</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Instructor Id</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {console.log(courses)}
              {courses.map((course) => (
                <CourseDetailsRow key={course.courseCode} course={course} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsTable;
