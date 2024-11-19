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
}

function MedicalRecordPage() {
  const { email, userType } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = 0;
        if (userType === "doctor") {
          response = await fetch(`/users/doctor/${email}`);
        } else if (userType === "patient") {
          response = await fetch(`/users/profile/${email}`);
        } else {
          response = await fetch(`/medCenter/profile/${email}`);
        }
        const data = await response.json();
        setProfileData(data);
        console.log(data, userType);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email, userType]);
  function submitPrescription(appointmentId, prescription) {
    fetch("/users/appointments/prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: appointmentId, prescription }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Prescription updated successfully", data);
      })
      .catch((error) => {
        console.error("Error updating prescription", error);
      });
  }
  return (
    <>
      <div className="ProfilePage">
        <div className="ProfilePage-header">
          <h1>Welcome, {profileData?.email}</h1>
        </div>
        <div className="ProfilePage-name">{profileData?.name}</div>
        <div className="ProfilePage-details">
          <h2>Details:</h2>
          <p>Address: {profileData?.address}</p>
              
        </div>
      </div>
    </>
  );
}

export default AppointmentForm;
