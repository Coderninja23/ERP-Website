import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
import * as classes from "../../../../utils/styles";
import axios from "axios";
import { firebaseApp } from "../../../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const Body = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [dept, setDept] = useState();
  const [designation, setDesignation] = useState();
  const [school, setSchool] = useState();
  const [dob, setDob] = useState();

  useEffect(() => {
    //get aemail from auth
    const auth = getAuth(firebaseApp);
    const authEmail = auth?.currentUser?.email;
    console.log(authEmail);
    if (!authEmail) {
      navigate("/login/faculty");
    }
    setEmail(authEmail);
    const getData = async () => {
      if (authEmail) {
        if (authEmail) {
          const data = await axios.get(
            "https://gc-webathon-2024.onrender.com/api/faculty/getFacultyDetails",
            { params: { email: authEmail } }
          );
          setName(data.data?.["Faculty Details"]?.["Name"]);
          setId(data.data["Faculty Details"]?.["Id"]);
          setEmail(data.data["Faculty Details"]?.["Email"]);
          setDept(data.data["Academic Details"]?.["Department"]);
          setDesignation(data.data["Academic Details"]?.["Designation"]);
          setSchool(data.data["Academic Details"]?.["School"]);
          setDob(data.data["Faculty Details"]?.["DOB"]);
        }
      }
    };

    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  const cancelHandler = () => {
    navigate("/faculty/home/profile");
  };

  const formSubmitHandler = async (event) => {
    try {
      const data = {
        email: email,
        updateData: {
          "Faculty Details": {
            Name: name,
            Email: email,
            Id: id,
            DOB: dob,
          },
          "Academic Details": {
            School: school,
            Department: dept,
            Designation: designation,
          },
        },
      };
      const res = await axios.post(
        "https://gc-webathon-2024.onrender.com/api/faculty/updateFacultyDetails",
        data
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      alert("Detials updated successfully!");
      navigate("/faculty/home/profile");
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    placeholder={id}
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    id="dob"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"YYYY-MM-DD"}
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                  />
                </div>
                <div>
                  <label
                    htmlFor="designation"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    value={designation}
                  />
                </div>

                <div>
                  <label
                    htmlFor="school"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={school}
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                  />
                </div>

                <div>
                  <label
                    htmlFor="dep"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="dep"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={dept}
                    onChange={(e) => setDept(e.target.value)}
                    value={dept}
                  />
                </div>
              </div>
            </div>

            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>

              <button
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
