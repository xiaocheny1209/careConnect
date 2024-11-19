const express = require("express");
const router = express.Router();
const {
  viewAppointments,
  viewProfile,
  bookAppointment,
  viewMedicalCenters,
  viewMedicalCenter,
  viewDoctorProfile,
  viewDoctors,
  postPrescription,
} = require("../controller/users/users");

const io = require("socket.io");

router.get("/profile/:email", viewProfile);
router.get("/doctor/:email", viewDoctorProfile);

router.get("/medicCenters/:id/doctors", viewDoctors);

router.get("/medicCenters", viewMedicalCenters);
router.get("/medicCenters/:id", viewMedicalCenter);

router.get("/availability/:email", viewAppointments);

router.post("/availability/book/:email", bookAppointment);

router.post("/appointments/prescription", postPrescription);

router.post("/chat/:id", (req, res) => {
  const chatId = req.params.id;
  // Create a new socket for this chat
  const chatSocket = io.of(`/${chatId}`);

  // Listen for new connections to this chat socket
  chatSocket.on("connection", (socket) => {
    console.log(`New user connected to chat ${chatId}`);

    // Listen for messages from this socket
    socket.on("message", (message) => {
      console.log(`Received message in chat ${chatId}: ${message}`);
      // Broadcast the message to all other sockets in this chat
      socket.broadcast.emit("message", message);
    });
  });

  res.sendStatus(200);
});
module.exports = router;
