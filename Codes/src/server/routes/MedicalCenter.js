const express = require("express");
const {
  postAvailability,
  viewMedProfile,
  viewDoctorsList,
} = require("../controller/medical-center/medical_center");
const router = express.Router();

// doctors will be register my medical center

router.post("/availability", postAvailability);

router.get("/profile/:email", viewMedProfile);
router.get("/doctors/:email", viewDoctorsList);


module.exports = router;
