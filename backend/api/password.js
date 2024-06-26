import express from "express";
import PasswordModel from "../db/password/model.js";
const router = express.Router();

router.get("/:username", async function (req, res) {
  const username = req.params.username;
  const accessiblePassword = await PasswordModel.findAccessiblePassword(
    username
  );
  const displayPassord = accessiblePassword.map((password) => {
    return {
      _id: password._id,
      url: password.url,
      password: password.password,
      owner: password.owner,
      update_time: password.update_time
    };
  });
  res.send(displayPassord);
});

router.post("/", async function (req, res) {
  const password = req.body;
  password.update_time = new Date();
  await PasswordModel.createPassword(password);
  res.send("Password created!");
});

router.put("/:passwordId", async function (req, res) {
  const password = req.body;
  password.update_time = new Date();
  await PasswordModel.updatePassword(password);
  res.send("Password updated!");
});

router.delete("/:passwordId", async function (req, res) {
  const passwordId = req.params.passwordId;
  await PasswordModel.deletePasswordById(passwordId);
  res.send("Password deleted!");
});
export default router;
