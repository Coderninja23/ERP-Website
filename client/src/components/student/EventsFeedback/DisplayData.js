import React, { useState } from "react";
import axios from "axios";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../../../firebase";

const DisplayData = ({ events }) => {
  const [feedbacks, setFeedbacks] = useState({}); // State to store feedback for each event

  const handleFeedbackChange = (eventId, feedback) => {
    setFeedbacks({ ...feedbacks, [eventId]: feedback });
  };

  const handleSubmitFeedback = async (eventId) => {
    try {
      const response = await axios.post(
        `https://gc-webathon-2024.onrender.com/api/event/submitFeedback`,
        {
          eventId: eventId,
          feedback: feedbacks[eventId],
        }
      );
      console.log("Feedback submitted successfully:", response.data);
      // Optionally, you can handle success message or update state
      alert("Feedback submitted successfully");
      setFeedbacks({ ...feedbacks, [eventId]: "" }); // Clear feedback input after submission
    } catch (error) {
      console.error("Error submitting feedback:", error.response.data);
      // Optionally, you can handle error message or update state
      alert("Error submitting feedback");
    }
  };

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>User Email</th>
            <th>Description</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr key={idx}>
              <td>{event.title}</td>
              <td>{event.adminEmail}</td>
              <td>{event.description}</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter feedback"
                  value={feedbacks[event._id] || ""}
                  onChange={(e) =>
                    handleFeedbackChange(event._id, e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  onClick={() => handleSubmitFeedback(event._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
