import { createContext, useState } from "react";

export const initialState = {
  "Student Details": {
    Name: "",
    Email: "",
    "Roll Number": "",
  },
  "Personal Details": {
    Category: "N/A",
    PWD: false,
    "Permanent Address": "N/A",
    "Correspondence Address": "N/A",
  },
  "Academic Details": {
    School: "",
    Branch: "",
    Batch: "",
  },
  "Bank Details": {
    "Name of Benificiary": "N/A",
    "Account Number": "N/A",
    "Name of the Bank": "N/A",
    "IFSC Code": "N/A",
    "Address of Bank": "N/A",
  },
  "Parents Information": {
    "Father's Name": "N/A",
    "Father's Occupation": "N/A",
    "Father's Mobile Number": "N/A",
    "Mother's Name": "N/A",
    "Mother's Occupation": "N/A",
    "Mother's Mobile Number": "N/A",
    "Present Postal Address": "N/A",
  },
};

const studentContext = createContext({
  store: initialState,
  setStore: () => {},
});

export default studentContext;

export const StudentProvider = ({ children }) => {
  const [store, setStore] = useState(initialState);

  return (
    <studentContext.Provider value={{ store, setStore }}>
      {children}
    </studentContext.Provider>
  );
};
