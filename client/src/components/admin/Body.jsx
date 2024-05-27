import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const Body = () => {
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [numStudents, setNumStudents] = useState();
  const [numCourses, setNumCourses] = useState();
  const [numTeachers, setNumTeachers] = useState();
  const [numAdmins, setNumAdmins] = useState();
  const [eventCount, setEventCount] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-undef
    //update local storage
    const getData = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const authEmail = auth?.currentUser?.email;

        if (authEmail) {
          const data = await axios.get(
            `https://gc-webathon-2024.onrender.com/api/admin/getDashboardItems`,
            { params: { email: authEmail } }
          );
          console.log(data.data?.["Student Details"]?.["Name"]);
          setName(data.data?.["Admin Details"]?.["Name"]);
          setId(data.data["Admin Details"]?.["Id"]);
          setNumStudents(data.data.studentCount);
          setNumCourses(data?.data?.courseCount);
          setNumTeachers(data?.data?.facultyCount);
          setNumAdmins(data?.data?.adminCount);
          setEventCount(data?.data?.eventCount ?? 0);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <div className="flex-[0.8] mt-4">
      <div className="space-y-5 mt-15 ml-5">
        {/* <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div> */}
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Faculty Count</h1>
                <h2 className="text-2xl font-bold">{numTeachers}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Student Count</h1>
                <h2 className="text-2xl font-bold">{numStudents}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Admin Count</h1>
                <h2 className="text-2xl font-bold">{numAdmins}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Event Count</h1>
                <h2 className="text-2xl font-bold">{eventCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
