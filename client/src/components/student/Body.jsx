import React, { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "react-calendar/dist/Calendar.css";
import studentContext from "../../store/student-context";
const Body = () => {
  const { store } = useContext(studentContext);

  const name = store?.["Student Details"]?.["Name"] ?? "N/A";
  const rollNo = store?.["Student Details"]?.["Roll Number"] ?? "N/A";
  const batch = store?.["Academic Details"]?.["Batch"] ?? "N/A";
  const school = store?.["Academic Details"]?.["School"] ?? "N/A";
  const sem = store?.["Academic Details"]?.["Semester"] ?? "N/A";
  const branch = store?.["Academic Details"]?.["Branch"] ?? "N/A";
  let atten = 0;
  let totalAtten = 0;
  if (store?.["Courses"]) {
    for (let i = 0; i < store?.["Courses"].length; i++) {
      atten += store?.["Courses"]?.[i]?.["Attendance"];
      totalAtten += store?.["Courses"]?.[i]?.["TotalClasses"] ?? 0;
    }
  }
  const attendance = atten;
  const totalAttendance = totalAtten;
  return (
    <div className="flex-[0.8] mt-4">
      <div className="space-y-5 mt-15 ml-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
            <div className="flex items-center space-x-4 border-r-2 ml-4">
              <EngineeringIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Name</h1>
                <h2 className="text-2xl font-bold">{name}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <BoyIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Roll No.</h1>
                <h2 className="text-2xl font-bold">{rollNo}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Attended</h1>
                <h2 className="text-2xl font-bold">{attendance}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Total Classes</h1>
                <h2 className="text-2xl font-bold">{totalAttendance}</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col mr-5 space-y-4 overflow-y-auto">
            <div className="bg-white h-[8rem] rounded-xl shadow-lg grid ml-10 grid-cols-4 justify-between px-8 items-center space-x-4">
              <div className="flex items-center space-x-4 border-r-2 ml-4">
                <EngineeringIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Batch</h1>
                  <h2 className="text-2xl font-bold">{batch}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-r-2">
                <BoyIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Semester</h1>
                  <h2 className="text-2xl font-bold">{sem}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-r-2">
                <SupervisorAccountIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>Branch</h1>
                  <h2 className="text-2xl font-bold">{branch}</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-r-2">
                <SupervisorAccountIcon
                  className="rounded-full py-2 bg-orange-300"
                  sx={{ fontSize: 40 }}
                />
                <div className="flex flex-col">
                  <h1>School</h1>
                  <h2 className="text-2xl font-bold">{school}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
