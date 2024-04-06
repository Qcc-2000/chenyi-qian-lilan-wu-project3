import mongoose from "mongoose";
import { UserSchema } from "./schema.js";
const UserModel = mongoose.model("UserModel", UserSchema);

function createUser(user) {
  return UserModel.create(user);
}

function findUserByUsername(username) {
  return UserModel.findOne({ username: username }).exec();
}

export default { createUser, findUserByUsername };
