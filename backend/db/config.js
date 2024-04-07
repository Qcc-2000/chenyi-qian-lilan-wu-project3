import mongoose from "mongoose";
const DBInit = () => {
  mongoose.connect(process.env.MONGODB_ENDPOINT, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));
};
export default DBInit;
