import mongoose from "mongoose";

const connect = async function () {
  try {
    const connecTo = await mongoose.connect(process.env.DB_URL);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
