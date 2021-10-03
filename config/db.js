const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const server = require('./serverApollo')


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });

    console.log("db conectada");
    server();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
