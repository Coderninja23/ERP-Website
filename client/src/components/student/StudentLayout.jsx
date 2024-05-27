import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import studentContext, { initialState } from "../../store/student-context";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import AuthWrapper from "../../utils/authWrapper";
import Sidebar from "./Sidebar";


const StudentLayout = () => {
  const [store, setStore] = useState(initialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const authEmail = auth?.currentUser?.email;

        if (authEmail) {
          const response = await axios.get(
            `https://gc-webathon-2024.onrender.com/api/student/getStudentDetails`,
            { params: { email: authEmail } }
          );
          setStore({ ...response.data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <studentContext.Provider value={{ store, setStore }}>
      <Outlet />
    </studentContext.Provider>
  );
};

export default AuthWrapper(StudentLayout);
