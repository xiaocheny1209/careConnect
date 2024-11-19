import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function MedicalCenter() {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch("/users/medicCenters");
        if (!response.ok) {
          throw new Error("Failed to fetch medical centers");
        }
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCenters();
  }, []);

  return (
    <div className="MedicalCentersPage">
      <h1>Medical centers</h1>
      <div className="MedicalCentersList">
        {centers?.map((center) => (
          <div key={center._id} className="MedicalCenterCard">
            <Link to={`/medical-center/${center._id}`} className="CardLink">
              <h2>{center?.name}</h2>
              <p className="CardDescription">{center?.description}</p>
              <p>
                <strong>Address:</strong> {center?.address}
                <br />
                <strong>Email:</strong>
                {center?.email}
                <br />
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalCenter;
