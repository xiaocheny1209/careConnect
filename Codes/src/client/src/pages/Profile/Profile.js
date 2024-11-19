import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Context";

import "./Profile.css"; // Import the CSS file

function Profile() {
  const { email, userType } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    fetchData();
  }, [email, userType]);
  function submitPrescription(
    appointmentId,
    name,
    brand,
    amount,
    frequency,
    route,
    totalAmountAndRefill,
    signature
  ) {
    fetch("/users/appointments/prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: appointmentId,
        name,
        brand,
        amount,
        frequency,
        route,
        totalAmountAndRefill,
        signature,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("Prescription created successfully!");
        console.log("Prescription updated successfully", data);
      })
      .catch((error) => {
        console.error("Error updating prescription", error);
      });
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="ProfilePage">
        <div className="ProfilePage-header">
          <h1>Welcome, {profileData?.name}</h1>
        </div>
        <div className="ProfilePage-name">{profileData?.name}</div>
        <div className="ProfilePage-details">
          <h2>Details:</h2>
          <p>Name: {profileData?.name}</p>
          <p>DoB: {profileData?.DoB}</p>
          <p>Address: {profileData?.address}</p>
          {userType === "patient" && (
            <div className="ProfilePage-appointments">
              <h2>Your appointments:</h2>
              <ul>
                {profileData?.scheduled?.map((appointment) => {
                  const dateObj = new Date(appointment.date);
                  const formattedDate = dateObj.toLocaleString();
                  return (
                    <li key={appointment._id}>
                      <div className="app_container">
                        <div>
                          <strong>Date:</strong> {formattedDate}
                        </div>
                        <div>
                          <strong>Location:</strong> {appointment.location}
                        </div>
                        <div>
                          <strong>Description:</strong>{" "}
                          {appointment.description}
                        </div>
                        <strong>Prescription :</strong>
                        <div class="prescription">
                          <div class="label">Name:</div>
                          <div class="value">
                            {appointment?.prescription?.name}
                          </div>
                        </div>
                        <div class="prescription">
                          <div class="label">Brand:</div>
                          <div class="value">
                            {appointment?.prescription?.brand}
                          </div>
                        </div>
                        <div class="prescription">
                          <div class="label">Amount:</div>
                          <div class="value">
                            {appointment?.prescription?.amount}
                          </div>
                        </div>
                        <div class="prescription">
                          <div class="label">Frequency:</div>
                          <div class="value">
                            {appointment?.prescription?.frequency}
                          </div>
                        </div>
                        <div class="prescription">
                          <div class="label">Route:</div>
                          <div class="value">
                            {appointment?.prescription?.route}
                          </div>
                        </div>
                        <div class="prescription">
                          <div class="label">Total Amount and Refill:</div>
                          <div class="value">
                            {appointment?.prescription?.totalAmountAndRefill}
                          </div>
                        </div>
                        <div class="prescription">
                          <div class="label">Signature:</div>
                          <div class="value">
                            {appointment?.prescription?.signature}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {userType === "doctor" && (
            <div className="ProfilePage-appointments">
              Your appointments:
              <div></div>
              <ul>
                {profileData?.scheduled?.map((appointment) => {
                  const dateObj = new Date(appointment.date);
                  const formattedDate = dateObj.toLocaleString();
                  return (
                    <li key={appointment._id}>
                      <div>
                        <strong>Patient Email:</strong> {appointment.visitor}
                      </div>
                      <div>
                        <strong>Doctor Email:</strong> {appointment.doctor}
                      </div>
                      <div>
                        <strong>Date:</strong> {formattedDate}
                      </div>
                      <div>
                        <strong>Location:</strong> {appointment.location}
                      </div>
                      <div>
                        <strong>Description:</strong> {appointment.description}
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const appointmentId = appointment._id;
                          const name = e.target.elements.name.value;
                          const brand = e.target.elements.brand.value;
                          const amount = e.target.elements.amount.value;
                          const frequency = e.target.elements.frequency.value;
                          const route = e.target.elements.route.value;
                          const totalAmountAndRefill =
                            e.target.elements.totalAmountAndRefill.value;
                          const signature = e.target.elements.signature.value;
                          submitPrescription(
                            appointmentId,
                            name,
                            brand,
                            amount,
                            frequency,
                            route,
                            totalAmountAndRefill,
                            signature
                          );
                        }}
                      >
                        <br></br>
                        Prescription:
                        <br></br>
                        Name:
                        <input name="name" />
                        <br></br>
                        Brand:
                        <input name="brand" />
                        <br></br>
                        Amount:
                        <input name="amount" />
                        <br></br>
                        Frequency:
                        <input name="frequency" />
                        <br></br>
                        Route of taking:
                        <input name="route" />
                        <br></br>
                        Total amount and refill in pharmacy:
                        <input name="totalAmountAndRefill" />
                        <br></br>
                        Signature:
                        <input name="signature" />
                        <br></br>
                        <button type="submit">Submit</button>
                      </form>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <Link to="/chat" className="ProfilePage-chat-link">
            Chat
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
