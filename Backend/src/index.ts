import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
const app = express();
dotenv.config();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("yoho");
});

app.use("/auth", authRoute);

app.listen(2020, async () => {
  console.log("app is listing ");
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
      console.log("connect to db");
    })
    .catch((err) => {
      console.log("connection faild to db" + err);
    });
});
