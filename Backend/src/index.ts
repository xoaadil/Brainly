import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import contentRoute from "./routes/contentRoute"
import cors from "cors"

const app = express();
dotenv.config();
const PORT=process.env.PORT || 2020;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home root");
});

app.use("/auth", authRoute);
app.use("/content",contentRoute)

app.listen(PORT, async () => {
  console.log("app is listing on "+PORT);
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
      console.log("connect to db");
    })
    .catch((err) => {
      console.log("connection faild to db" + err);
    });
});
