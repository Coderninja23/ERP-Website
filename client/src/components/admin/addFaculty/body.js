import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_FACULTY, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
  const dispatch = useDispatch();
  const departments = ["CSE", "ECE", "ME", "CE", "EE"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    name: "",
    email: "",
    id: "",
    school: "",
    department: "",
    designation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    try {
      const response = await axios.post(
        `https://gc-webathon-2024.onrender.com/api/admin/registerFaculty`,
        value
      );

      if (response.status === 200) {
        toast.success("Faculty added successfully!");
      }

      dispatch({ type: ADD_FACULTY, payload: true });
      setValue({
        name: "",
        email: "",
        id: "",
        school: "",
        department: "",
        designation: "",
      });
    } catch (error) {
      if (error.response) {
        dispatch({ type: SET_ERRORS, payload: error.response.data });
      } else {
        console.error("An error occurred:", error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Faculty</h1>
        </div>
        <div className="mr-10 bg-white flex flex-col rounded-xl">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Name :</h1>
                  <input
                    placeholder="Full Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Email :</h1>
                  <input
                    placeholder="Email"
                    required
                    className={classes.adminInput}
                    type="email"
                    value={value.email}
                    onChange={(e) =>
                      setValue({ ...value, email: e.target.value })
                    }
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>ID: </h1>
                  <input
                    placeholder="ID"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.id}
                    onChange={(e) => setValue({ ...value, id: e.target.value })}
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>School: </h1>
                  <input
                    placeholder="School"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.school}
                    onChange={(e) =>
                      setValue({ ...value, school: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.department}
                    onChange={(e) =>
                      setValue({ ...value, department: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp}>
                        {dp}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Designation :</h1>
                  <input
                    placeholder="Designation"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.designation}
                    onChange={(e) =>
                      setValue({ ...value, designation: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    name: "",
                    email: "",
                    id: "",
                    school: "",
                    department: "",
                    designation: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
          </form>
          <div className={classes.loadingAndError}>
            {loading && (
              <Spinner
                message="Adding Faculty"
                height={30}
                width={150}
                color="#111111"
                messageColor="blue"
              />
            )}
            {(error.emailError || error.backendError) && (
              <p className="text-red-500">
                {error.emailError || error.backendError}
              </p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Body;
