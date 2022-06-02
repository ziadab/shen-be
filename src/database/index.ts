import mongoose from "mongoose";

const con = mongoose.createConnection(process.env.MONGO_URI!, {
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 60000,
});

export default con;
