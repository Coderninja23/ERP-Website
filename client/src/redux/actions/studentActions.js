import {
  SET_ERRORS,
  UPDATE_PASSWORD,
  TEST_RESULT,
  STUDENT_LOGIN,
  ATTENDANCE,
  UPDATE_STUDENT,
  GET_SUBJECT,
  GET_EVENT,
} from "../actionTypes";
import * as api from "../api";

import axios from "axios";
export const studentSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://gc-webathon-2024.onrender.com/api/student/login",
      {
        username: formData.username,
        password: formData.password,
      }
    );

    dispatch({ type: STUDENT_LOGIN, data });
    if (data.result.passwordUpdated) {
      console.log("password updated");
      navigate("/student/home");
    } else {
      navigate("/student/password");
    }
  } catch (error) {
    // dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const studentUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.studentUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/student/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const updateStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(formData);
    dispatch({ type: UPDATE_STUDENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getSubject = (department, year) => async (dispatch) => {
  try {
    const formData = {
      department,
      year,
    };
    const { data } = await api.getSubject(formData);
    dispatch({ type: GET_SUBJECT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getEvents =
  (title, adminEmail, description) => async (dispatch) => {
    try {
      const formData = {
        title,
        adminEmail,
        description,
      };
      const { data } = await api.getEvents(formData);
      dispatch({ type: GET_SUBJECT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const getTestResult =
  (department, year, section) => async (dispatch) => {
    try {
      const formData = {
        department,
        year,
        section,
      };
      const { data } = await api.getTestResult(formData);
      dispatch({ type: TEST_RESULT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const getAttendance =
  (department, year, section) => async (dispatch) => {
    try {
      const formData = {
        department,
        year,
        section,
      };
      const { data } = await api.getAttendance(formData);
      dispatch({ type: ATTENDANCE, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
