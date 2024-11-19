const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  DoB: String,
  balance: Number,
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppointmentModel",
    },
  ],
  scheduled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppointmentModel",
    },
  ],
});

module.exports = mongoose.model("UserModel", userSchema);
