import { createContext, useState } from "react";

export const initialState = {
    "Faculty Details": {
        "Email": "21CS01025@iitbbs.ac.in",
        "DOB": "N/A",
        "Id": "N/A",
        "Name": "N/A"
    },
    "Academic Details": {
        "Designation": "Designation",
        "School": "School",
        "Department": "Department",
        "Courses":[]
    }
};

const facultyCoursesContext = createContext({
  store: initialState,
  setStore: () => {},
});

export default facultyCoursesContext;

export const FacultyCoursesProvider = ({ children }) => {
  const [store, setStore] = useState(initialState);

  return (
    <facultyCoursesContext.Provider value={{ store, setStore }}>
      {children}
    </facultyCoursesContext.Provider>
  );
};
