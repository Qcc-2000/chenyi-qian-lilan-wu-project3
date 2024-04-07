import express from "express";
import MessageModel from "../db/message/model.js";
import PasswordModel from "../db/password/model.js";
import UserModel from "../db/user/model.js";
const router = express.Router();
/*
    body {
        "accepted": true,
    }
*/
router.post("/:messageId", async function (req, res) {
  const messageId = req.params.messageId;
  const accepted = req.body.accepted;
  const message = await MessageModel.findMessageById(messageId);
  console.log(message);
  if (!message) return res.status(404).send("Message not found");
  if (accepted) {
    // update the password db of receiver and sender
    const sender = message.sender;
    const receiver = message.receiver;
    const [senderPassword, receiverPassword] = await Promise.all([
      PasswordModel.findPasswordByOwner(sender),
      PasswordModel.findPasswordByOwner(receiver),
    ]);
    await Promise.all([
      addSharedPassword(senderPassword, receiver),
      addSharedPassword(receiverPassword, sender),
    ]);
    // delete from db
  }
  await MessageModel.deleteMessageById(messageId);
  return res.send("Message processed");
});

const addSharedPassword = async (passwords, shared_with) => {
  const promises = passwords.map((password) => {
    return PasswordModel.addPasswordSharedWith(password._id, shared_with);
  });
  return Promise.all(promises);
};

router.post("/", async function (req, res) {
  const message = req.body;
  const sender = message.sender;
  const receiver = message.receiver;
  // check if sender and receiver are valid
  const senderExsits = await UserModel.isUserExist(sender);
  const receiverExsits = await UserModel.isUserExist(receiver);
  if (!senderExsits || !receiverExsits) {
    return res.status(404).send("Sender or receiver does not exist");
  } else if (sender === receiver) {
    return res.status(400).send("Sender and receiver cannot be the same");
  }
  await MessageModel.createMessage(message);
  res.send("Message created!");
});

router.get("/:username", async function (req, res) {
  const username = req.params.username;
  const messages = await MessageModel.findMessageByreceiver(username);
  res.send(messages);
});

export default router;
