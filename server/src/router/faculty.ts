import express from "express";
import { firestoreDB } from "../config/config";
import { FieldValue } from "firebase-admin/firestore";
import { getStudentDetails } from "../controller/studentController";
const router = express.Router();
router.get("/isFaculty", async (req, res) => {
  try {
    const email = req.query.email as string;
    const adminCollection = firestoreDB.collection("faculty");
    const docRef = await adminCollection.doc(email).get();
    if (docRef.exists) {
      return res.status(200).send(true);
    }
    return res.status(200).send(false);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/getFacultyDetails", async (req, res) => {
  try {
    const email = req.query.email as string;
    const facultyCollection = firestoreDB.collection("faculty");
    const docRef = await facultyCollection.doc(email).get();
    if (!docRef.exists) {
      await facultyCollection.doc(email).set({
        "Faculty Details": {
          Name: "N/A",
          Email: email,
          Id: "N/A",
          DOB: "N/A",
        },
        "Academic Details": {
          School: "School",
          Department: "Department",
          Designation: "Designation",
        },
      });
    }
    const doc = await facultyCollection.doc(email).get();
    const facultyData = doc.data();
    return res.status(200).send(facultyData);
  } catch (e: any) {
    console.error(e);

    return res.status(500).send(e.message);
  }
});

router.post("/addAssignment", async (req, res) => {
  try {
    const email = req.body.email;
    const courseId = req.body.courseId;
    const assignmentName = req.body.assignmentName;
    const dueDate = req.body.dueDate;
    const description = req.body.description;
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const courseData = courseDoc.data();
    if (!courseData) {
      return res.status(500).send("Course data not found");
    }
    const assignments = courseData["Assignments"];
    const numAssignments = courseData["Total Assignments"];



    const updateObj = {
      "Total Assignments": numAssignments + 1,
      [`Assignments.${numAssignments + 1}`]: {
        [`Name`]: assignmentName,
        [`Description`]: description,
        [`Due Date`]: dueDate

      },
    };
    await courseCollection.doc(courseId).update(updateObj);

    return res.status(200).send("Assignment registered successfully");
  } catch (e: any) {
    console.error(e);

    return res.status(500).send(e.message);
  }
});
router.get("/getAssignments", async (req, res) => {
  const email = req.query.email as string;
  const courseId = req.query.courseId as string;
  const courseCollection = firestoreDB.collection("courses");
  const courseDoc = await courseCollection.doc(courseId).get();
  if (courseDoc.exists) {
    const courseData = courseDoc.data();
    if (courseData) {
      if (!courseData?.["Assignments"]) {
        return res.status(400).send("Assignments not found in course data");
      }
      return res.status(200).send(courseData["Assignments"]);
    }
    else {
      return res.status(404).send("Course not found");
    }
  }
  else {
    return res.status(404).send("Course not found");
  }

});
router.post("/updateFacultyDetails", async (req, res) => {
  try {
    const { email, updateData } = req.body;
    const facultyCollection = firestoreDB.collection("faculty");
    const facultyDoc = await facultyCollection.doc(email).get();
    if (facultyDoc.exists) {
      await facultyCollection.doc(email).update(updateData);
      console.log("Faculty details updated successfully");
      return res.status(200).send("Faculty details updated successfully");
    } else {
      await facultyCollection.doc(email).set(updateData);
      return res.status(200).send("Faculty details added successfully");
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/getFacultyFeedback", async (req, res) => {
  try {
    const courseId = req.query.courseId as string;
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const courseData = courseDoc.data();
    if (!courseData) {
      return res.status(500).send("Course data not found");
    }
    const feedback = courseData["Faculty Feedback"];
    return res.status(200).send(feedback);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: "error",
      message: e?.message,
    });
  }
});

router.get("/getCourseFeedback", async (req, res) => {
  try {
    const courseId = req.query.courseId as string;
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const courseData = courseDoc.data();
    if (!courseData) {
      return res.status(500).send("Course data not found");
    }
    const feedback = courseData["Course Feedback"];
    return res.status(200).send(feedback);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: "error",
      message: e?.message,
    });
  }
});

router.post("/registerCourse", async (req, res) => {
  try {
    const { courseName, courseCode, facultyEmail, credits, branch, sem, year } =
      req.body;
    if (
      !courseName ||
      !courseCode ||
      !facultyEmail ||
      !credits ||
      !branch ||
      !sem ||
      !year
    ) {
      return res.status(400).send("Bad Request");
    }
    const courseCollection = firestoreDB.collection("courses");
    const courseId = `${courseCode}_${sem}_${year}_${branch}`;
    const facultyCollection = firestoreDB.collection("faculty");
    const facultyDoc = await facultyCollection.doc(facultyEmail).get();
    if (facultyDoc.exists) {
      const facultyData = facultyDoc.data();
      const courseDoc = await courseCollection.doc(courseId).get();
      if (courseDoc.exists) {
        return res.status(400).send("Course already exists");
      } else {
        await courseCollection.doc(courseId).set({
          "Course Details": {
            "Course Name": courseName,
            "Course Code": courseCode,
            Credits: credits,
            Instructor: facultyData?.["Faculty Details"]?.["Name"],
            "Instructor Id": facultyData?.["Faculty Details"]?.["Id"],
            email: facultyEmail,
          },
          "Total Classes": 0,
          "Total Assignments": 0,
          Students: {},
          Attendance: {},
          Assignments: {},
        });
        return res.status(200).send("Course registered successfully");
      }
    } else {
      return res.status(404).send("Faculty not found");
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});

const getEmailFromRollNumber = async (rollNumber: string) => {
  try {
    const studentCollection = firestoreDB.collection("students");
    const studentDoc = await studentCollection
      .where("Student Details.Roll Number", "==", rollNumber)
      .get();
    if (studentDoc.empty) {
      return null;
    } else {
      return studentDoc.docs[0].id;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
router.post("/giveGrade", async (req, res) => {
  try {
    const { rollNumber, courseId, grade } = req.body;
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (courseDoc.exists) {
      const courseData = courseDoc.data();
      if (courseData) {
        if (!courseData?.["Students"]) {
          return res.status(400).send("Students not found in course data");
        }
        if (!courseData["Students"][rollNumber]) {
          return res.status(400).send("Student not registered for this course");
        }
        await firestoreDB.collection("courses").doc(courseId).update({
          [`Students.${rollNumber}.Grade`]: grade,
        });
        const email: any = await getEmailFromRollNumber(rollNumber);
        await firestoreDB.collection("students").doc(email).update({
          [`Courses.${courseId}.Grade`]: grade,
        });

        return res.status(200).send("Grades submitted successfully");
      }
      else {
        return res.status(404).send("Course not found");
      }
    }
    else {
      return res.status(404).send("Course not found");
    }
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(
      {
        status: "error",
        message: e?.message
      }
    );
  }
});
// router.post("/addAssignment", async (req, res) => {
router.post("/registerAttendence", async (req, res) => {
  try {
    const { email, courseId, date, time, students } = req.body;
    if (!courseId || !date || !time || !students) {
      return res.status(400).send("Bad Request");
    }
    const courseCode = courseId.split("_")[0];
    const sem = courseId.split("_")[1];
    const year = courseId.split("_")[2];
    const branch = courseId.split("_")[3];
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const courseData = courseDoc.data();
    if (!courseData) {
      return res.status(500).send("Course data not found");
    }
    const totalClasses = courseData["Total Classes"];
    const attendance = courseData["Attendance"];
    const updateObj = {
      "Total Classes": totalClasses + 1,
      [`Attendance.${totalClasses + 1}`]: {
        Date: date,
        Time: time,
        Students: students,
      },
    };
    const studentsJson = Object.keys(courseData["Students"]);
    for (const student of studentsJson) {
      if (students.includes(student)) {
        updateObj[`Students.${student}.Attendance.${totalClasses + 1}`] = true;
      } else {
        updateObj[`Students.${student}.Attendance.${totalClasses + 1}`] = false;
      }
      const email: any = await getEmailFromRollNumber(student);
      const updateObj2 = {
        [`Courses.${sem}.${courseId}.TotalClasses`]: FieldValue.increment(1),
      };
      if (students.includes(student)) {
        updateObj2[`Courses.${sem}.${courseId}.Attendance`] =
          FieldValue.increment(1);
      }
      firestoreDB.collection("students").doc(email).update(updateObj2);
    }
    await courseCollection.doc(courseId).update(updateObj);

    return res.status(200).send("Attendance registered successfully");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/getAllRegisteredStudents", async (req, res) => {
  try {
    const courseId = req.query.courseId as string;
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const courseData = courseDoc.data();
    if (!courseData) {
      return res.status(500).send("Course data not found");
    }
    const students = courseData["Students"];
    const studentsJson = Object.keys(students);

    return res.status(200).send(studentsJson);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/getCourseDetails", async (req, res) => {
  try {
    const courseId = req.query.courseId as string;
    const courseCollection = firestoreDB.collection("courses");
    const courseDoc = await courseCollection.doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send("Course not found");
    }
    const courseData = courseDoc.data();
    if (!courseData) {
      return res.status(500).send("Course data not found");
    }
    return res.status(200).send(courseData);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/getFacultyCourses", async (req, res) => {
  try {
    const email = req.query.email as string;
    const courseCollection = firestoreDB.collection("courses");
    const courseDocs = await courseCollection
      .where("Course Details.email", "==", email)
      .get();
    const coursesArray: any = [];
    courseDocs.forEach((doc) => {
      const courseData = doc.data();
      coursesArray.push({
        courseId: doc.id,
        ...courseData,
      });
    });
    return res.status(200).send(coursesArray);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send({
      status: "error",
      message: e?.message,
    });
  }
});
export default router;
