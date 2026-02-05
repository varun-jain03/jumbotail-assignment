const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log("Mongo DB Error:", error.message);
  }
}

module.exports = connectDB;