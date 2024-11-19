import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./MedicalCenter.css";

function MedicalCenter() {
  const [doctors, setDoctors] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetch(`/users/medicCenters/${id}/doctors`);
      const data = await response.json();
      setDoctors(data);
      console.log(data);
    }
    fetchDoctors();
  }, [id]);

  return (
    <div className="medical-center">
      <div className="header">
        <h1>Medical Center</h1>
      </div>
      <div className="details">
        <h2>Details</h2>
        <div>Details content ....</div>
      </div>

      <div className="doctors-list">
        <h3>List of Doctors:</h3>
        <div className="doctor-box-container">     
          {doctors.map((doctor) => (
            <Link
              to={`/doctor/${doctor?.email}`}
              key={doctor?._id}
              className="doctor-box"
            >
              {"Doctor: "}
              {doctor?.name}
              <br />
              {"Email: "}
              {doctor?.email}
              <br />
              {"Year of employment: "}
              {doctor?.YoE}
              <br />
              {"Works at: "}
              {doctor?.worksAt}
              <br />
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}

export default MedicalCenter;
