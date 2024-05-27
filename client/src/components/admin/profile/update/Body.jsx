import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
import * as classes from "../../../../utils/styles";
import axios from "axios";
import { firebaseApp } from "../../../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import adminContext from "../../../../store/admin-context";

const Body = () => {
  const navigate = useNavigate();

  const { store, setStore } = useContext(adminContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(store?.["Admin Details"]?.["Name"]);
  const [dob, setdob] = useState(store?.["Admin Details"]?.["DOB"]);
  const [adminId, setAdminId] = useState(store?.["Admin Details"]?.["Id"]);
  const [email, setEmail] = useState(store?.["Admin Details"]?.["Email"]);

  const cancelHandler = () => {
    navigate("/admin/home/profile");
  };

  const formSubmitHandler = async (event) => {
    try {
      const data = {
        email: email,
        updateData: {
          "Admin Details": {
            Name: name,
            Email: email,
            Id: adminId,
            DOB: dob,
          },
        },
      };
      const res = await axios.post(
        `https://gc-webathon-2024.onrender.com/api/admin/updateAdminDetails`,
        data
      );
      console.log(res);
      setStore({
        ...store,
        ...data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("done");
      // navigate("/admin/home/profile");
    }
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className=" mr-10 ml-10 bg-white flex flex-col rounded-xl overflow-y-scroll h-[35rem] ">
          <form className={classes.adminForm0} onSubmit={formSubmitHandler}>
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                <div>
                  <label
                    htmlFor="Email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="Email"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={email}
                    value={email}
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="rollno"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Admin Id
                  </label>
                  <input
                    type="text"
                    id="rollno"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    value={adminId}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="rollno"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    id="dob"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"YYYY-MM-DD"}
                    onChange={(e) => setdob(e.target.value)}
                    value={dob}
                  />
                </div>
              </div>
            </div>

            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>

              <button
                // onClick={() => navigate("/admin/profile")}
                className={classes.adminFormClearButton}
                type="button"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>

            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Updating"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
