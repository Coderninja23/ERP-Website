import { FieldValue } from "@google-cloud/firestore";
import express from "express";
import { firestoreDB } from "../config/config";
const router = express.Router();

router.post("/addEvent", async (req, res) => {
    try {
        const { title, description, date, time, venue, adminEmail } = req.body;
        if (!title || !description) {
            return res.status(400).send("Title and Description are required");
        }
        const setDoc = {
            "Event Details": {
                "Title": title,
                "Description": description,
                "Date": date,
                "Time": time,
                "Venue": venue,
                "Created By": adminEmail,
                "Created At": FieldValue.serverTimestamp()
            },
            "Feedback": [],
            "Feedback Students": {}
        };
        //remove null values
        const eventCollection = firestoreDB.collection("events");
        await eventCollection.add(setDoc);
        return res.status(200).send("Event added successfully");
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/getAllEvents", async (req, res) => {
    try {
        const eventsCollection = firestoreDB.collection("events");
        const eventsDocs = await eventsCollection.get();
        const eventsArray: any = [];
        eventsDocs.forEach(doc => {
            const eventData = doc.data();
            eventsArray.push({
                id: doc.id,
                "Event Details": eventData?.["Event Details"],
            });
        });
        return res.status(200).send(eventsArray);
    }
    catch (e: any) {
        console.error(e);

        return res.status(500).send(e.message);
    }
});
router.post("/registerEventFeedback", async (req, res) => {
    try {
        const { email, feedback, eventId } = req.body;
        const eventCollection = firestoreDB.collection("events");
        const eventDoc = await eventCollection.doc(eventId).get();
        const studentCollection = firestoreDB.collection("students");
        const studentDoc = await studentCollection.doc(email).get();
        if (!studentDoc.exists) {
            return res.status(404).send("Student not found");
        }
        const studentData = studentDoc.data();
        const rollNumber = studentData?.["Student Details"]["Roll Number"];
        if (eventDoc.exists) {
            //check if student has already submitted feedback
            const studentData = eventDoc.data();
            if (studentData?.["Feedback Students"]?.[rollNumber]) {
                return res.status(400).send("Feedback already submitted");
            }
            await eventCollection.doc(eventId).update({
                [`Feedback`]: FieldValue.arrayUnion(feedback),
            });
            await eventCollection.doc(eventId).update({
                [`Feedback Students.${rollNumber}`]: true,
            });
            return res.status(200).send("Feedback submitted successfully");
        } else {
            return res.status(404).send("Event not found");
        }

    }
    catch (e: any) {
        console.error(e);
        return res.status(500).send({
            status: "error",
            message: e?.message
        });
    }
});

export default router;