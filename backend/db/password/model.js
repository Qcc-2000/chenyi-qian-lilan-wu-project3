import mongoose from "mongoose";
import { PasswordSchema } from "./schema.js";
const PasswordModel = mongoose.model("Password", PasswordSchema);

const createPassword = (password) => {
  return PasswordModel.create(password);
};
const deletePasswordById = (passwordId) => {
  return PasswordModel.deleteOne({ _id: passwordId });
};
const updatePassword = (password) => {
  return PasswordModel.updateOne(
    { _id: password._id },
    {
      $set: {
        url: password.url,
        password: password.password,
        update_time: password.update_time,
      },
    }, // Update fields
    { new: true } // Set to true to return the updated document
  );
};

const findPasswordById = (passwordId) => {
  return PasswordModel.findById(passwordId).exec();
};
const findPasswordByOwner = (owner) => {
  return PasswordModel.find({
    owner: owner,
  });
};
const findPasswordBySharedWith = (shared_with) => {
  return PasswordModel.find({
    shared_with: shared_with,
  });
};

const findAccessiblePassword = (username) => {
  return PasswordModel.find({
    $or: [
      {
        owner: username,
      },
      {
        shared_with: username,
      },
    ],
  });
};

const addPasswordSharedWith = async (passwordId, username) => {
  const password = await findPasswordById(passwordId);
  if (password.shared_with.includes(username)) {
    return Promise.resolve(0);
  }
  return PasswordModel.updateOne(
    { _id: passwordId },
    { $push: { shared_with: username } }
  );
};

export default {
  createPassword,
  deletePasswordById,
  updatePassword,
  findPasswordByOwner,
  findPasswordBySharedWith,
  findAccessiblePassword,
  addPasswordSharedWith,
};
