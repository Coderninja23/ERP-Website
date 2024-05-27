import { createContext, useState } from "react";

export const adminInitialState = {
  "Admin Details": {
    Name: "N/A",
    Email: "N/A",
    Id: "N/A",
    DOB: "N/A",
  },
};

const adminContext = createContext({
  store: adminInitialState,
  setStore: () => {},
});

export default adminContext;

export const AdminProvider = ({ children }) => {
  const [store, setStore] = useState(adminInitialState);

  return (
    <adminContext.Provider value={{ store, setStore }}>
      {children}
    </adminContext.Provider>
  );
};
