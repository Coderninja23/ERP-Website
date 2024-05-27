import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = ["CSE", "ECE", "ME", "CE", "EE"];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const errorRef = useRef();

  const [value, setValue] = useState({
    name: "",
    email: "",
    rollNumber: "",
    school: "",
    batch: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      errorRef.current.scrollIntoView({ behavior: "smooth" });
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    try {
      const response = await axios.post(
        `https://gc-webathon-2024.onrender.com/api/admin/registerStudent`,
        value
      );
      if (response.status === 200) {
        toast.success("Student added successfully!");
      }
      dispatch({ type: ADD_STUDENT, payload: true });
      setValue({
        name: "",
        email: "",
        rollNumber: "",
        school: "",
        batch: "",
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

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div>
      <div className="flex-[0.8] mt-3">
        <div className="space-y-5">
          <div className="flex text-gray-400 items-center space-x-2">
            <AddIcon />
            <h1>Add Student</h1>
          </div>
          <div className="mr-10 bg-white flex flex-col rounded-xl ">
            <form
              className={`${classes.adminForm0} scrollbar-thin scrollbar-track-white scrollbar-thumb-black overflow-y-scroll h-[30rem]`}
              onSubmit={handleSubmit}
            >
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
                    <h1 className={classes.adminLabel}>Roll Number :</h1>
                    <input
                      required
                      placeholder=""
                      className={classes.adminInput}
                      type="text"
                      value={value.rollNumber}
                      onChange={(e) =>
                        setValue({ ...value, rollNumber: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>Batch :</h1>
                    <input
                      required
                      placeholder="yyyy"
                      className={classes.adminInput}
                      type="text"
                      value={value.batch}
                      onChange={(e) =>
                        setValue({ ...value, batch: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminForm3}>
                    <h1 className={classes.adminLabel}>School :</h1>
                    <input
                      required
                      placeholder=""
                      className={classes.adminInput}
                      type="text"
                      value={value.school}
                      onChange={(e) =>
                        setValue({ ...value, school: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.adminFormButton}>
                    <button
                      className={classes.adminFormSubmitButton}
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setValue({
                          name: "",
                          email: "",
                          rollNumber: "",
                          school: "",
                          batch: "",
                          userEmail: "",
                        });
                        setError({});
                      }}
                      className={classes.adminFormClearButton}
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                  <div ref={errorRef} className={classes.loadingAndError}>
                    {loading && (
                      <Spinner
                        message="Adding Student"
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
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Body;
