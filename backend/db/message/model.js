import mongoose from "mongoose";
import { MessageSchema } from "./schema.js";
const MessageModel = mongoose.model("Message", MessageSchema);
const findMessageById = (messageId) => {
  return MessageModel.findById(messageId).exec();
};
const createMessage = (message) => {
  return MessageModel.create(message);
};
const deleteMessageById = (messageId) => {
  return MessageModel.deleteOne({ _id: messageId });
};

const findMessageByreceiver = (receiver) => {
  return MessageModel.find({
    receiver: receiver,
  });
};
export default {
  findMessageById,
  findMessageByreceiver,
  createMessage,
  deleteMessageById,
};
