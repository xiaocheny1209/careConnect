//models
const DoctorModel = require("../../models/Doctor");
const UserModel = require("../../models/Users");
const medicalCenterModel = require("../../models/MedicalCenter");
const AppointmentModel = require("../../models/Appointments");
const prescriptionModel = require("../../models/Prescription");
async function viewAppointments(req, res) {
  try {
    const doctor = await DoctorModel.findOne({
      email: req.params.email,
    }).populate("appointments");
    res.json(doctor.appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function viewDoctorProfile(req, res) {
  try {
    const doctor = await DoctorModel.findOne({
      email: req.params.email,
    }).populate("scheduled");
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function viewProfile(req, res) {
  try {
    const profile = await UserModel.findOne({
      email: req.params.email,
    }).populate({
      path: "scheduled",
      populate: { path: "prescription", model: 'prescriptionModel' },
    });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function viewDoctors(req, res) {
  try {
    const center = await medicalCenterModel
      .findById({
        _id: req.params.id,
      })
      .populate("doctors_list");
    res.json(center.doctors_list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function viewMedicalCenters(req, res) {
  try {
    const centers = await medicalCenterModel.find();
    res.json(centers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function viewMedicalCenter(req, res) {
  try {
    const centerId = req.params.id;
    const center = await medicalCenterModel.findById(centerId);

    if (!center) {
      return res.status(404).json({ message: "Medical center not found" });
    }

    res.json(center);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function postPrescription(req, res) {
  const {
    id,
    name,
    brand,
    amount,
    frequency,
    route,
    totalAmountAndRefill,
    signature,
  } = req.body;

  try {
    const appointment = await AppointmentModel.findById(id);

    const newPres = new prescriptionModel({
      name: name,
      brand: brand,
      amount: amount,
      frequency: frequency,
      route: route,
      totalAmountAndRefill: totalAmountAndRefill,
      signature: signature,
    });

    await newPres.save();
    appointment.prescription = newPres;
    await appointment.save();

    res.status(200).json({ message: "Prescription updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating prescription", error });
  }
}

async function bookAppointment(req, res) {
  try {
    const { date } = req.body;
    const doctorEmail = req.params.email;
    const clientEmail = req.body.clientEmail;
    const description = req.body.description;
    const inputDate = new Date(date);
    const formattedDate = inputDate.toISOString();
    console.log(doctorEmail, clientEmail);

    if (clientEmail.length === 0) {
      return res.status(404).json({ message: "You are not logged in" });
    }

    const doctor = await DoctorModel.findOne({ email: doctorEmail }).populate(
      "appointments scheduled"
    );

    const appointments = doctor.appointments.filter(
      (appt) => appt.date.toISOString() === formattedDate
    );
    console.log(appointments);
    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments available for the requested date" });
    }
    const appointment = appointments[0];
    appointment.visitor = clientEmail;
    appointment.description=description;
    await appointment.save();

    doctor.scheduled.push(appointment);

    await doctor.save();

    const index = doctor.appointments.indexOf(appointment);
    doctor.appointments.splice(index, 1);
    await doctor.save();

    appointment.status = "success";
    await appointment.save();

    const client = await UserModel.findOne({ email: clientEmail });

    client.scheduled.push(appointment);
    await client.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  viewAppointments,
  viewDoctorProfile,
  bookAppointment,
  viewMedicalCenters,
  viewMedicalCenter,
  viewProfile,
  viewDoctors,
  postPrescription,
};
