import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import "./Login.css";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const [password, setPassword] = useState("");
  const { email, setEmail, userType, setUserType, setToggleAuth } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   `Email: ${email}, Password: ${password}, UserType: ${userType}`
    // );
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      if (response.ok) {
        setToggleAuth(true);
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
      <div className="form-box">
        <Avatar className="icon">
          <LockOutlinedIcon />
        </Avatar>
        <h1 id="title">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field" id="emailField">
              <i className="fa-light fa-user">
                <label>
                  Email Address:
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
              </i>
            </div>

            <div className="input-field" id="passwordField">
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

            <div className="input-field" id="typeField">
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
          </div>

          <div className="btn-field">
            <button type="submit" id="signupBtn">
              Login
            </button>
          </div>
        </form>

        <div className="to-register">
          <Link to="/register">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
