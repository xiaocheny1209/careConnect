import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";
function DoctorAppointments() {
  const { email } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let { emailD } = useParams();
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/users/availability/book/${emailD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientEmail: email,
        date: selectedDate,
        description: description,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      // setAppointments(data);
      window.alert("Appointment booked successfully!");
    } else {
      // Handle error notification
      window.alert(data.message);
      navigate("/login");
    }
    setBookingStatus(data.status);
  };

  useEffect(() => {
    async function fetchDoctorAppointments() {
      // const response = await fetch(`/users/availability/${emailD}`);
      // const data = await response.json();
      // setAppointments(data);
      setIsLoading(true);
      try {
        const response = await fetch(`/users/availability/${emailD}`);
        const data = await response.json();
        if (response.ok) {
          setAppointments(data);
        } else {
          // Handle error notification
          window.alert(data.message);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchDoctorAppointments();
  }, [emailD]);

  useEffect(() => {
    if (bookingStatus === "success") {
      window.alert("Appointment booked successfully!");
    }
  }, [bookingStatus]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2 class="page-heading">Doctor Appointments</h2>
      <form class="form-container" onSubmit={handleFormSubmit}>
        <label htmlFor="date-select">Select a date:</label>
        <select
          class="select-field"
          id="date-select"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="">-- Please select a date --</option>
          {appointments &&
            appointments?.map((appointment) => {
              const dateObj = new Date(appointment.date);
              const formattedDate = dateObj.toLocaleString();
              return (
                <option key={appointment.id} value={appointment.date}>
                  {formattedDate}
                </option>
              );
            })}
        </select>
        <div>
          <label class="description" htmlFor="description">
            Description:
          </label>
          <textarea
            className="description-field"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <button class="submit-btn" type="submit" disabled={!selectedDate}>
          Book Appointment
        </button>
      </form>
      {bookingStatus && <p class="status-msg">{bookingStatus}</p>}
      {appointments.length === 0 && (
        <p class="no-appointments">No appointments found.</p>
      )}
    </div>
  );
}

export default DoctorAppointments;
