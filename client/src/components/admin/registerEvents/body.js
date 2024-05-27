import React, { useState } from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch } from "react-redux";
import { ADD_EVENT, SET_ERRORS } from "../../../redux/actionTypes";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    title: "",
    adminEmail: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    try {
      const response = await axios.post(
        `https://gc-webathon-2024.onrender.com/api/event/addEvent`,
        value
      );
      console.log("Event registered successfully:", response.data);
      setLoading(false);
      setValue({ title: "", adminEmail: "", description: "" });
      dispatch({ type: ADD_EVENT, payload: true });
      dispatch({ type: SET_ERRORS, payload: {} });
    } catch (error) {
      console.error("Error registering event:", error.response.data);
      setLoading(false);
      setError(error.response.data);
    }
  };

  const handleInputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <EngineeringIcon />
          <h1>Register Event</h1>
        </div>
        <div className="mr-10 bg-white flex flex-col rounded-xl">
          <form className={classes.adminForm0} onSubmit={handleSubmit}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Title :</h1>
                  <input
                    placeholder="Title"
                    required
                    className={classes.adminInput}
                    type="text"
                    name="title"
                    value={value.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Admin Email :</h1>
                  <input
                    required
                    placeholder="Admin Email"
                    className={classes.adminInput}
                    type="email"
                    name="adminEmail"
                    value={value.adminEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={classes.adminForm2r}>
                <div className={classes.adminForm3}>
                  <h1 className={`${classes.adminLabel} self-start`}>
                    Description :
                  </h1>
                  <textarea
                    rows={10}
                    cols={40}
                    required
                    placeholder="Description...."
                    className={classes.adminInput}
                    name="description"
                    value={value.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Register
              </button>
              <button
                onClick={() => {
                  setValue({ title: "", adminEmail: "", description: "" });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Registering Event"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.message && <p className="text-red-500">{error.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
