import { createContext, useState } from "react";

export const initialState = {
  "Academic Details": {
    Designation: "Designation",
    School: "School",
    Department: "Department",
  },
  "Faculty Details": {
    Email: "21CS01025@iitbbs.ac.in",
    DOB: "N/A",
    Id: "N/A",
    Name: "N/A",
  },
  Courses: [],
};

const facultyContext = createContext({
  store: initialState,
  setStore: () => {},
});

export default facultyContext;

export const FacultyProvider = ({ children }) => {
  const [store, setStore] = useState(initialState);

  return (
    <facultyContext.Provider value={{ store, setStore }}>
      {children}
    </facultyContext.Provider>
  );
};
