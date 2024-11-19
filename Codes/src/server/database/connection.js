const mongoose = require("mongoose");

async function connect(mongo_URL) {
  try {
    await mongoose.connect(mongo_URL, {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connect;
