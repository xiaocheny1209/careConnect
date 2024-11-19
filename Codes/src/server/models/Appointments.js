const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  visitor: String,
  doctor: String,
  date: Date,
  location: String,
  description: String,
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prescriptionModel",
  },
});

module.exports = mongoose.model("AppointmentModel", appointmentSchema);
