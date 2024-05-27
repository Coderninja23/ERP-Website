import React, { useEffect, useState } from "react";
import axios from "axios";
import "./course.css";

const DataTable1 = () => {
  const [dataFromBackend, setDataFromBackend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `https://gc-webathon-2024.onrender.com/api/student/getRegisteredCourses`,
          { params: { email: email } }
        );
        setDataFromBackend(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {dataFromBackend.map((semesterData) => (
        <div key={semesterData.sem}>
          <h2>Semester {semesterData.sem}</h2>
          <table>
            <thead>
              <tr>
                <th>Sem</th>
                <th>Credits</th>
                <th>Course ID</th>
                <th>Attendance</th>
                <th>Total Classes</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.courses.map((course) => (
                <tr key={course.courseId}>
                  <td>{semesterData.sem}</td>
                  <td>{semesterData.credits}</td>
                  <td>{course.courseId}</td>
                  <td>{course.Attendance}</td>
                  <td>{course.TotalClasses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DataTable1;
