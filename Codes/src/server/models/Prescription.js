const mongoose = require("mongoose");

// services: diagnostic-imaging, rehabilitation-services, pain-management, mental-health-service

const prescriptionSchema = new mongoose.Schema({
  name: String,
  brand: String,
  amount: String,
  frequency: String,
  route: String,
  totalAmountAndRefill: String,
  signature: String,
});

module.exports = mongoose.model("prescriptionModel", prescriptionSchema);
