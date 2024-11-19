const mongoose = require("mongoose");

// services: diagnostic-imaging, rehabilitation-services, pain-management, mental-health-service

const centerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  services: [String],
  rating: Number,
  price: Number,
  description: String,
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
  doctors_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorModel",
    },
  ],
});

centerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("medicalCenterModel", centerSchema);
