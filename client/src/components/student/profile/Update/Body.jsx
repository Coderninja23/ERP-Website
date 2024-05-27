import React, { useContext, useEffect, useState } from "react";
import studentContext from "../../../../store/student-context";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../utils/Spinner";
import * as classes from "../../../../utils/styles";
import axios from "axios";
import { firebaseApp } from "../../../../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Body = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { store, setStore } = useContext(studentContext);
  const email = store?.["Student Details"]?.["Email"] ?? "N/A";
  const [name, setName] = useState(
    store?.["Student Details"]?.["Name"] ?? "N/A"
  );
  const [category, setCategory] = useState(
    store?.["Personal Details"]?.["Category"] ?? "N/A"
  );
  const [perAdd, setPerAdd] = useState(
    store?.["Personal Details"]?.["Permanent Address"] ?? "N/A"
  );
  const [corAdd, setCorAdd] = useState(
    store?.["Personal Details"]?.["Correspondence Address"] ?? "N/A"
  );
  const [pwd, setPwd] = useState(store?.["Personal Details"]?.["PWD"] ?? "N/A");
  const [addBank, setAddBank] = useState(
    store?.["Bank Details"]?.["Address of Bank"] ?? "N/A"
  );
  const [accHolder, setAccountHolder] = useState(
    store?.["Bank Details"]?.["Name of Beneficiary"] ?? "N/A"
  );
  const [accountNumber, setAccountNumber] = useState(
    store?.["Bank Details"]?.["Account Number"] ?? "N/A"
  );
  const [ifscCode, setIfscCode] = useState(
    store?.["Bank Details"]?.["IFSC Code"] ?? "N/A"
  );
  const [bankName, setBankName] = useState(
    store?.["Bank Details"]?.["Name of the Bank"] ?? "N/A"
  );
  const [fatherContactNumber, setFatherContactNumber] = useState(
    store?.["Parents Information"]?.["Father's Mobile Number"] ?? "N/A"
  );
  const [motherContactNumber, setMotherContactNumber] = useState(
    store?.["Parents Information"]?.["Mother's Mobile Number"] ?? "N/A"
  );
  const [fatherOccupation, setFatherOccupation] = useState(
    store?.["Parents Information"]?.["Father's Occupation"] ?? "N/A"
  );
  const [motherOccupation, setMotherOccupation] = useState(
    store?.["Parents Information"]?.["Mother's Occupation"] ?? "N/A"
  );
  const [presentPostal, setPresentPostal] = useState(
    store?.["Parents Information"]?.["Present Postal Address"] ?? "N/A"
  );
  const [motherName, setMotherName] = useState(
    store?.["Parents Information"]?.["Mother's Name"] ?? "N/A"
  );
  const [fatherName, setFatherName] = useState(
    store?.["Parents Information"]?.["Father's Name"] ?? "N/A"
  );
  const [school, setSchool] = useState(
    store?.["Academic Details"]?.["School"] ?? "N/A"
  );
  const [sem, setSem] = useState(
    store?.["Academic Details"]?.["Semester"] ?? "N/A"
  );
  const [branch, setBranch] = useState(
    store?.["Academic Details"]?.["Branch"] ?? "N/A"
  );
  const [batch, setBatch] = useState(
    store?.["Academic Details"]?.["Batch"] ?? "N/A"
  );
  const [rollNo, setRollNo] = useState(
    store?.["Student Details"]?.["Roll Number"] ?? "N/A"
  );

  const accountNumberChangeHandler = (event) => {
    setAccountNumber(event.target.value);
    console.log(accountNumber);
  };

  const cancelHandler = () => {
    navigate("/student/home/profile");
  };

  const formSubmitHandler = async (event) => {
    const data = {
      email: email,
      updateData: {
        "Student Details": {
          "Roll Number": rollNo,
          Email: email,
          Name: name,
        },
        "Personal Details": {
          Category: category,
          "Permanent Address": perAdd,
          "Correspondence Address": corAdd,
          PWD: pwd,
        },
        "Bank Details": {
          "Account Number": accountNumber,
          "IFSC Code": ifscCode,
          "Address of Bank": addBank,
          "Name of Beneficiary": accHolder,
          "Name of the Bank": bankName,
        },
        "Parents Information": {
          "Father's Mobile Number": fatherContactNumber,
          "Mother's Mobile Number": motherContactNumber,
          "Father's Occupation": fatherOccupation,
          "Present Postal Address": presentPostal,
          "Mother's Name": motherName,
          "Father's Name": fatherName,
          "Mother's Occupation": motherOccupation,
        },
        "Academic Details": {
          School: school,
          Batch: batch,
          Branch: branch,
          "Roll Number": rollNo,
          Semester: sem,
        },
      },
    };
    try {
      axios
        .post(
          `https://gc-webathon-2024.onrender.com/api/student/updateUserDetails`,
          data
        )
        .then((response) => {
          console.log(response.status, response.data.token);
        });
      setStore({
        ...store,
        ...data,
      });

      navigate("/student/home/profile");
    } catch (err) {
      alert("Error in storing the information!");
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
                    placeholder={"Enter Email"}
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
                    placeholder={"Enter Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="rollno"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollno"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder={"Roll Number"}
                    value={rollNo}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={category}
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  />
                </div>
                <div>
                  <label
                    htmlFor="PWD"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    PWD
                  </label>
                  <input
                    type="text"
                    id="PWD"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Account Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="Account Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={accountNumberChangeHandler}
                    placeholder={accountNumber}
                    value={accountNumber}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Mother's Name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    id="Mother's Name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={motherName}
                    value={motherName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="<Father's Name>"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="Father's Name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={fatherName}
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="Mother's Occupation"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Mother's Occupation
                  </label>
                  <input
                    type="text"
                    id="Mother's Occupation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setMotherOccupation(e.target.value)}
                    placeholder={motherOccupation}
                    value={motherOccupation}
                  />
                </div>
              </div>

              <div className={classes.adminForm2r}>
                <div>
                  <label
                    for="IFSC Code"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    id="IFSC Code"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    value={ifscCode}
                  />
                </div>

                <div>
                  <label
                    for="Name of the Bank"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Name of Bank
                  </label>
                  <input
                    type="text"
                    id="Name of the Bank"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    value={bankName}
                  />
                </div>
                <div>
                  <label
                    for="Father's Mobile Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Father's Mobile Number
                  </label>
                  <input
                    type="text"
                    id="Father's Mobile Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={fatherContactNumber}
                    onChange={(e) => setFatherContactNumber(e.target.value)}
                    value={fatherContactNumber}
                  />
                </div>
                <div>
                  <label
                    for="Mother's Mobile Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Mother's Mobile Number
                  </label>
                  <input
                    type="text"
                    id="Mother's Mobile Number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={motherContactNumber}
                    onChange={(e) => setMotherContactNumber(e.target.value)}
                    value={motherContactNumber}
                  />
                </div>
                <div>
                  <label
                    for="Father's Occupation"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Father's Occupation
                  </label>
                  <input
                    type="text"
                    id="Father's Occupation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={fatherOccupation}
                    onChange={(e) => setFatherOccupation(e.target.value)}
                    value={fatherOccupation}
                  />
                </div>

                <div>
                  <label
                    for="Semester"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Semester
                  </label>
                  <input
                    type="text"
                    id="Semester"
                    class="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={sem}
                    value={sem}
                    onChange={(e) => setSem(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="Branch"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Branch
                  </label>
                  <input
                    type="text"
                    id="Branch"
                    class="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={branch}
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="Batch"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Batch
                  </label>
                  <input
                    type="text"
                    id="Batch"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed"
                    placeholder={batch}
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
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
