import { Schema } from "mongoose";

export const MessageSchema = new Schema({
  receiver: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});
