import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Context";
import "./Appointment.css";

function AppointmentForm() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const { email } = useContext(AuthContext);
  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetch(`/medCenter/doctors/${email}`);
      const data = await response.json();
      setDoctorList(data);
    }

    fetchDoctors();
  }, [email]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/medCenter/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointments,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create appointments");
      }
      alert("Appointments created successfully");
      setAppointments([]);
    } catch (error) {
      console.error(error);
      alert("Error creating appointments");
    }
  };

  const handleAddAppointment = () => {
    const newAppointment = { doctor, date, location, description };
    setAppointments([...appointments, newAppointment]);
    setDoctor("");
    setDate("");
    setLocation("");
    setDescription("");
  };
  if (!email) {
    return (
      <div className="authorize">
        <span>Log In First</span>
      </div>
    );
  }
  return (
    <div className="appointment_card">
      List of available doctors:
      {doctorList?.map((item) => {
        return <p>{item.email}</p>;
      })}
      <form onSubmit={handleSubmit}>
        {appointments.map((appointment, index) => (
          <div key={index} className="appointment">
            <h3>Appointment {index + 1}</h3>
            <p className="doctor">Doctor: {appointment.doctor}</p>
            <p className="date">
              Date: {new Date(appointment.date).toLocaleString()}
            </p>
            <p className="location">Location: {appointment.location}</p>
            <p className="description_app">
              Description: {appointment.description}
            </p>
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="doctor">Doctor:</label>
          <input
            type="text"
            id="doctor"
            value={doctor}
            onChange={(event) => setDoctor(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={handleAddAppointment}
          className="btn btn-secondary"
        >
          Add Appointment
        </button>
        <button type="submit" className="btn btn-primary">
          Post All Appointments
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
