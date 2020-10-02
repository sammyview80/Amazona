import mongoose from "mongoose";

import config from "./config";
const mongodbUrl = config.MONGODB_URL;

const connectDB = async () => {
  const connection = await mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  if (connection) {
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } else {
    console.log("Something went wrong !");
  }
};

export default connectDB;
