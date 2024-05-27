import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();


import studentRoutes from "./router/student";
import adminRoutes from "./router/admin";
import facultyRoutes from "./router/faculty";
import eventRoutes from "./router/event";
import https from "https";
const cron = require("node-cron");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});


const backendUrl = "https://gc-webathon-2024.onrender.com";
cron.schedule("*/180 * * * * *", async function () {
  console.log("Restarting server");

  await https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Restarted");
      } else {
        console.error(`failed to restart with status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.log("hi");
      console.error("Error ", err.message);
    });
});

export default app;


