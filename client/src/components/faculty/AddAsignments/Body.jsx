import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import facultyContext from "../../../store/faculty-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BodyElement = () => {
  const { store } = useContext(facultyContext);
  const email = store?.["Faculty Details"]?.["Email"];

  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");

  const updateHandler = () => {
    console.log(value);

    const data = {
      email: email,
      courseId: courseId,
      assignmentName: assignmentName,
      dueDate: value.toString(),
      description: description,
    };
    try {
      const sendingData = async () => {
        const response = await axios.post(
          `https://gc-webathon-2024.onrender.com/api/faculty/addAssignment`,
          data
        );
        console.log(response);
      };
      sendingData();
    } catch (err) {
      alert("Could not send assignment!");
    } finally {
      alert("Assignment submitted successfully!");
      navigate("/faculty/home");
    }
  };

  const backHandler = () => {
    navigate("/faculty/home");
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>Add Assignments</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem] ml-10 mr-10">
          <div className="col-span-2 mr-6">
            <div class="mb-5">
              <label
                htmlFor="courseId"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white italic"
              >
                Course id
              </label>
              <input
                type="text"
                id="courseId"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Course ID"
                onChange={(e) => {
                  setCourseId(e.target.value);
                }}
                required
              />
            </div>
            <div class="mb-5">
              <label
                htmlFor="assignmentName"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-black italic"
              >
                Assignment Name
              </label>
              <input
                type="text"
                id="assignmentName"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Assignment Name"
                onChange={(e) => {
                  setAssignmentName(e.target.value);
                }}
                required
              />
            </div>
            <label
              htmlFor="date"
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-black italic"
            >
              Due Date
            </label>
            <div class="mb-6 shadow-sm bg-gray-50 w-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
              <DatePicker
                selected={value}
                onChange={(date) => setValue(date)}
                value={value}
              />
            </div>
            <div class="mb-5">
              <label
                htmlFor="description"
                class="block mb-2 text-xl font-medium text-gray-900 dark:text-white italic"
              >
                Description
              </label>
              <input
                type="text"
                id="Description"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-span-2 mr-6">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-blue-500 text-xl via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={updateHandler}
              >
                Submit
              </button>
              <button
                type="button"
                class="text-white bg-gradient-to-r from-red-500 text-xl via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={backHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyElement;
