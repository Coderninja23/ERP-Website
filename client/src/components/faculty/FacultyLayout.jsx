import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import facultyContext, { initialState } from "../../store/faculty-context";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import AuthWrapper from "../../utils/authWrapper";
import Sidebar from "./Sidebar";

const FacultyLayout = () => {
  const [store, setStore] = useState(initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const authEmail = auth?.currentUser?.email;

        if (authEmail) {
          const response = await axios.get(
            `https://gc-webathon-2024.onrender.com/api/faculty//getFacultyDetails`,
            { params: { email: "21cs01026@iitbbs.ac.in" } }
          );
          const response2 = await axios.get(
            `https://gc-webathon-2024.onrender.com/api/faculty/getFacultyCourses`,
            {
              params: { email: "21cs01025@iitbbs.ac.in" },
            }
          );
          const arr = [];
          response2.data.map((res, idx) => {
            arr.push(res["courseId"]);
          });
          const obj = { ...response.data, Courses: arr };
          setStore(obj);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <facultyContext.Provider value={{ store, setStore }}>
      <Outlet />
    </facultyContext.Provider>
  );
};

export default AuthWrapper(FacultyLayout);
