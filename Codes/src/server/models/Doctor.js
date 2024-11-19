const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  DoB: String,
  balance: Number,
  YoE: Number,
  worksAt: String,
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

module.exports = mongoose.model("DoctorModel", doctorSchema);
