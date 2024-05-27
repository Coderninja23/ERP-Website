
import express from "express";
import { firestoreDB } from "../config/config";
import { FieldValue } from "firebase-admin/firestore";
const router = express.Router();

router.get("/getDashboardItems", async (req, res) => {
    try {
        const email = req.query.email as string;
        const adminCollection = firestoreDB.collection("admins");
        const docRef = await adminCollection.doc(email).get();
        if (!docRef.exists) {
            return res.status(400).send("Admin does not exist");
        }
        const adminData = docRef.data();
        const facultyCollection = firestoreDB.collection("faculty");
        //get no of docs
        const facultyDocs = await facultyCollection.get();
        const facultyCount = facultyDocs.size;
        //get no of students
        const studentCollection = firestoreDB.collection("students");
        const studentDocs = await studentCollection.get();
        const studentCount = studentDocs.size;
        //get no of admins
        const adminDocs = await adminCollection.get();
        const adminCount = adminDocs.size;

        //get no of events
        const eventCollection = firestoreDB.collection("events");
        const eventDocs = await eventCollection.get();
        const eventCount = eventDocs.size;


        return res.status(200).send({
            ...adminData,
            facultyCount,
            studentCount,
            adminCount,
            eventCount
        });
    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
})
router.post("/registerFaculty", async (req, res) => {
    try {
        const { name, email, id, school, department, designation, adminEmail } = req.body;
        const facultyCollection = firestoreDB.collection("faculty");
        const docRef = await facultyCollection.doc(email).get();
        if (docRef.exists) {
            return res.status(400).send("Faculty already exists");
        }
        await facultyCollection.doc(email).set({
            "Faculty Details": {
                "Name": name,
                "Email": email,
                "Id": id,
                "DOB": "N/A",
            },
            "Academic Details": {
                "School": school,
                "Department": department,
                "Designation": designation,
            },
        });
        return res.status(200).send("Faculty registered successfully");
    }
    catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});
router.post("/registerStudent", async (req, res) => {
    try {
        const { name, email, rollNumber, school, branch, batch, adminEmail } = req.body;
        const studentCollection = firestoreDB.collection("students");
        const docRef = await studentCollection.doc(email).get();
        if (docRef.exists) {
            return res.status(400).send("Student already exists");
        }
        await studentCollection.doc(email).set({
            "Student Details": {
                "Name": name,
                "Email": email,
                "Roll Number": rollNumber,
            },
            "Personal Details": {
                "Category": "N/A",
                "PWD": false,
                "Permanent Address": "N/A",
                "Correspondence Address": "N/A"
            },
            "Academic Details": {
                "School": school,
                "Branch": branch,
                "Batch": batch,

            },
            "Bank Details": {
                "Name of Benificiary": "N/A",
                "Account Number": "N/A",
                "Name of the Bank": "N/A",
                "IFSC Code": "N/A",
                "Address of Bank": "N/A"
            },
            "Parents Information": {
                "Father's Name": "N/A",
                "Father's Occupation": "N/A",
                "Father's Mobile Number": "N/A",
                "Mother's Name": "N/A",
                "Mother's Occupation": "N/A",
                "Mother's Mobile Number": "N/A",
                "Present Postal Address": "N/A"
            }
        });
        return res.status(200).send("Student registered successfully");
    }
    catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});

router.get("/getStudentsOfParticularBranchAndBatch", async (req, res) => {
    try {
        const email = req.query.email as string;
        const branch = req.query.branch as string;
        const batch = req.query.batch as string;
        const batchInt = parseInt(batch);
        const studentCollection = firestoreDB.collection("students");
        const studentDocs = await studentCollection.where("Academic Details.Branch", "==", branch).where("Academic Details.Batch", "==", batchInt).get();
        const studentArray: any = [];
        studentDocs.forEach(doc => {
            const studentData = doc.data();
            studentArray.push({
                email: doc.id,
                "Academic Details": studentData?.["Academic Details"],
                "Student Details": studentData?.["Student Details"]
            });
        });
        return res.status(200).send(studentArray);

    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});
router.get("/getStudents", async (req, res) => {
    try {
        const email = req.query.email as string;
        const branch = req.query.branch as string;
        const studentCollection = firestoreDB.collection("students");
        const studentDocs = await studentCollection.get();
        const studentArray: any = [];
        studentDocs.forEach(doc => {
            const studentData = doc.data();
            studentArray.push({
                email: doc.id,
                "Academic Details": studentData?.["Academic Details"],
                "Student Details": studentData?.["Student Details"]
            });
        });
        return res.status(200).send(studentArray);

    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});

router.get("/isAdmin", async (req, res) => {
    try {
        const email = req.query.email as string;
        const adminCollection = firestoreDB.collection("admins");
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
router.get("/getalldepartment", async (req, res) => {
    try {
        const departments = [
            "CSE",
            "ECE",
            "ME",
            "CE",
            "EE",
        ]
        return res.status(200).send(departments);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});
router.get("/getAdminDetails", async (req, res) => {
    try {
        const email = req.query.email as string;
        const adminCollection = firestoreDB.collection("admins");
        const docRef = await adminCollection.doc(email).get();
        if (!docRef.exists) {
            await adminCollection.doc(email).set({
                "Admin Details": {
                    "Name": "N/A",
                    "Email": email,
                    "Id": "N/A",
                    "DOB": "N/A",
                },
            });
        }
        const doc = await adminCollection.doc(email).get();
        const adminData = doc.data();
        return res.status(200).send(adminData);
    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});
router.post("/updateAdminDetails", async (req, res) => {
    try {
        const { email, updateData } = req.body;
        const adminCollection = firestoreDB.collection("admins");
        const docRef = await adminCollection.doc(email).get();
        if (!docRef.exists) {
            return res.status(400).send("Admin does not exist");
        }
        await adminCollection.doc(email).update(updateData);
        return res.status(200).send("Admin data updated successfully");

    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
})


router.get("/getAllFaculty", async (req, res) => {
    try {
        const email = req.query.email as string;
        const facultyCollection = firestoreDB.collection("faculty");
        const facultyDocs = await facultyCollection.get();
        const facultyArray: any = [];
        facultyDocs.forEach(doc => {
            const facultyData = doc.data();
            facultyArray.push({
                email: doc.id,
                ...facultyData
            });
        });
        return res.status(200).send(facultyArray);
    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});

router.get("/getFacultyByDepartment", async (req, res) => {
    try {
        const email = req.query.email as string;
        const department = req.query.department as string;
        if (!department) {
            return res.status(400).send("Department is required");
        }
        const facultyCollection = firestoreDB.collection("faculty");
        const facultyDocs = await facultyCollection.where("Academic Details.Department", "==", department).get();
        const facultyArray: any = [];
        facultyDocs.forEach(doc => {
            const facultyData = doc.data();
            facultyArray.push({
                email: doc.id,
                ...facultyData
            });
        });
        return res.status(200).send(facultyArray);
    } catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});



export default router;