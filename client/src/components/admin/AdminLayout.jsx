import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import AuthWrapper from "../../utils/authWrapper";
import Sidebar from "./Sidebar";
import adminContext, { adminInitialState } from "../../store/admin-context";

const AdminLayout = () => {
  const [store, setStore] = useState(adminInitialState);

  useEffect(() => {
    const getData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const authEmail = auth?.currentUser?.email;

        if (authEmail) {
          const response = await axios.get(
            `https://gc-webathon-2024.onrender.com/api/admin/getAdminDetails`,
            { params: { email: authEmail } }
          );
          console.log(response.data);
          setStore({ ...response.data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <adminContext.Provider value={{ store, setStore }}>
      <Outlet />
    </adminContext.Provider>
  );
};

export default AuthWrapper(AdminLayout);
