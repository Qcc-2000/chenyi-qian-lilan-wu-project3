import { Schema } from "mongoose";

export const PasswordSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  shared_with: [
    {
      type: String,
    },
  ],
});
