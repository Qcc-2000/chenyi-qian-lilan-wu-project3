import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import process from "process";
import users from "./api/user.js";
import messages from "./api/message.js";
import passwords from "./api/password.js";
import mongoose from "mongoose";
const app = express();
const DEFAULT_PORT = 8000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_ENDPOINT, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

app.use("/api/users/", users);
app.use("/api/messages/", messages);
app.use("/api/passwords/", passwords);

let server = app.listen(process.env.PORT || DEFAULT_PORT, function () {
  console.log(`Starting server now... ${server.address().port}`);
});
