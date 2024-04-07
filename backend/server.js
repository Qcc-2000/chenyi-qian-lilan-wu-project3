import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import users from "./api/user.js";
import messages from "./api/message.js";
import passwords from "./api/password.js";
import swaggerInit from "./docs/swagger.js";
import DBInit from "./db/config.js";
import { PORT } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users/", users);
app.use("/api/messages/", messages);
app.use("/api/passwords/", passwords);

DBInit();
swaggerInit(app);

let server = app.listen(PORT, function () {
  console.log(`Starting server now... ${server.address().port}`);
});
