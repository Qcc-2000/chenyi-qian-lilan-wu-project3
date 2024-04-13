import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import UserModel from "../db/user/model.js";

router.post("/", async function (request, response) {
  const body = request.body;
  console.log(body);
  await UserModel.createUser(body);

  response.send("Created new user!");
});

router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const createUserResponse = await UserModel.findUserByUsername(username);
    console.log(createUserResponse.password);
    console.log(password);
    if (createUserResponse.password !== password) {
      return res.status(403).send("Invalid password");
    }

    const token = jwt.sign(username, "HUNTERS_PASSWORD");

    res.cookie("username", token);

    return res.send("User created successfully");
  } catch (e) {
    res.status(401).send(null);
  }
});

router.post("/register", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      return res.status(409).send("Missing username or password");
    }

    await UserModel.createUser({
      username: username,
      password: password,
    });

    const token = jwt.sign(username, "HUNTERS_PASSWORD");

    res.cookie("username", token);

    return res.send("User created successfully");
  } catch (e) {
    res.status(401).send("Error: username already exists");
  }
});

router.get("/isLoggedIn", async function (req, res) {
  const username = req.cookies.username;

  if (!username) {
    return res.send({ username: null });
  }
  let decryptedUsername;
  try {
    decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD");
  } catch (e) {
    return res.send({ username: null });
  }

  if (!decryptedUsername) {
    return res.send({ username: null });
  } else {
    return res.send({ username: decryptedUsername });
  }
});

router.post("/logOut", async function (req, res) {
  res.cookie("username", "", {
    maxAge: 0,
  });

  res.send(true);
});

router.get("/:username", async function (req, res) {
  const username = req.params.username;

  const userData = await UserModel.findUserByUsername(username);

  return res.send(userData);
});

export default router;
