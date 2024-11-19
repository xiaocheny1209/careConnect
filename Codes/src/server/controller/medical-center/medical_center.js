//models
const Appointments = require("../../models/Appointments");
const MedicalCenter = require("../../models/MedicalCenter");
const DoctorModel = require("../../models/Doctor");

async function postAvailability(req, res) {
  const appointments = req.body.appointments.map(
    (appointment) =>
      new Appointments({
        doctor: appointment.doctor,
        date: appointment.date,
        location: appointment.location,
        description: appointment.description,
      })
  );
  try {
    const savedAppointments = await Appointments.insertMany(appointments);
    const center = await MedicalCenter.findOne({ email: req.body.email });
    // TODO: part
    for (const appointment of req.body.appointments) {
      for (const doctor of await DoctorModel.find({
        email: appointment.doctor,
      })) {
        doctor.appointments.push(
          savedAppointments.find((a) => a.doctor === appointment.doctor)._id
        );
        await doctor.save();
        break;
      }
    }
    // TODO: end
    center.appointments.push(
      ...savedAppointments.map((appointment) => appointment._id)
    );
    await center.save();
    res.status(201).send({ message: "Appointments created successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error creating appointments", error: err });
  }
}

async function viewMedProfile(req, res) {
  try {
    const center = await MedicalCenter.findOne({ email: req.params.email });
    res.json(center);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function viewDoctorsList(req, res) {
  try {
    const center = await MedicalCenter.findOne({
      email: req.params.email,
    }).populate("doctors_list");
    res.json(center.doctors_list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  postAvailability,
  viewMedProfile,
  viewDoctorsList,
};
