import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("patient");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [yoe, setYoe] = useState("");
  const [medicalCenterEmail, setMedicalCenterEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleUserTypeChange = (e) => setUserType(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleDobChange = (e) => setDob(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleYoeChange = (e) => setYoe(e.target.value);
  const handleMedicalCenterEmailChange = (e) =>
    setMedicalCenterEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   `Email: ${email}, Password: ${password}, UserType: ${userType}, Address: ${address}, DOB: ${dob}, Description: ${description}, YoE: ${yoe}, Medical Center Email: ${medicalCenterEmail}`
    // );

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          userType,
          address,
          dob,
          description,
          yoe,
          medicalCenterEmail,
        }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        // Handle error notification
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="form-box-register">
        <h1 id="title">Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field" id="nameField">
              <i className="fa-light fa-user">
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
              </i>
            </div>

            <div className="input-field" id="nameField">
              <i className="fa-light fa-envelope">
                <label>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
              </i>
            </div>
            <div className="input-field" id="nameField">
              <i className="fa-light fa-envelope">
                <label>
                  Name:
                  <input type="text" value={name} onChange={handleNameChange} />
                </label>
              </i>
            </div>
            <div className="input-field" id="nameField">
              <i className="fa-light fa-user">
                <label>
                  User Type:
                  <select value={userType} onChange={handleUserTypeChange}>
                    <option value="patient">Patient</option>
                    <option value="medicalCenter">Medical Center</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
              </i>
            </div>

            {userType === "patient" && (
              <div>
                <div className="input-field" id="nameField">
                  <i className="fa-light fa-map-marker-alt">
                    <label>
                      Address:
                      <input
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </label>
                  </i>
                </div>

                <div className="input-field" id="nameField">
                  <i className="fa-light fa-calendar">
                    <label>
                      Date of Birth:
                      <input
                        type="text"
                        value={dob}
                        onChange={handleDobChange}
                      />
                    </label>
                  </i>
                </div>
              </div>
            )}

            {userType === "doctor" && (
              <div>
                <div className="input-field" id="nameField">
                  <i className="fa-light fa-map-marker-alt">
                    <label>
                      Address:
                      <input
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </label>
                  </i>
                </div>

                <div className="input-field" id="nameField">
                  <i className="fa-light fa-calendar">
                    <label>
                      Date of Birth:
                      <input
                        type="text"
                        value={dob}
                        onChange={handleDobChange}
                      />
                    </label>
                  </i>
                </div>
                <div className="input-field" id="nameField">
                  <i className="fa-light fa-calendar">
                    <label>
                      Years of Experience
                      <input
                        type="text"
                        value={yoe}
                        onChange={handleYoeChange}
                      />
                    </label>
                  </i>
                </div>
                <div className="input-field" id="nameField">
                  <i className="fa-light fa-calendar">
                    <label>
                      Work Place(email)
                      <input
                        type="text"
                        value={medicalCenterEmail}
                        onChange={handleMedicalCenterEmailChange}
                      />
                    </label>
                  </i>
                </div>
              </div>
            )}

            {userType === "medicalCenter" && (
              <div>
                <div className="input-field" id="nameField">
                  <i className="fa-light fa-map-marker-alt">
                    <label>
                      Address:
                      <input
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </label>
                  </i>
                </div>

                <div className="input-field" id="nameField">
                  <i className="fa-light fa-calendar">
                    <label>
                      Description:
                      <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                    </label>
                  </i>
                </div>
              </div>
            )}
          </div>
          <div class="btn-field-register">
            <button type="submit" id="signupBtn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
