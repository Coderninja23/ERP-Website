import { firestoreDB } from "../config/config";

export const getStudentDetails = async (email: string) => {
    try {
        const studentCollection = firestoreDB.collection("students");
        const docRef = await studentCollection.doc(email).get();
        //check if student exists
        if (!docRef.exists) {
            await studentCollection.doc(email).set({
                "Student Details": {
                    "Name": "N/A",
                    "Email": email,
                    "Roll Number": "N/A",
                },
                "Personal Details": {
                    "Category": "",
                    "PWD": false,
                    "Permanent Address": "",
                    "Correspondence Address": ""
                },
                "Academic Details": {
                    "School": "School",
                    "Branch": "Batch",
                    "Batch": 0,

                },
                "Bank Details": {
                    "Name of Benificiary": "",
                    "Account Number": "",
                    "Name of the Bank": "",
                    "IFSC Code": "",
                    "Address of Bank": ""
                },
                "Parents Information": {
                    "Father's Name": "",
                    "Father's Occupation": "",
                    "Father's Mobile Number": "",
                    "Mother's Name": "",
                    "Mother's Occupation": "",
                    "Mother's Mobile Number": "",
                    "Present Postal Address": ""
                }
            });
        }
        const doc = await studentCollection.doc(email).get();
        const studentData = doc.data();
        return studentData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}