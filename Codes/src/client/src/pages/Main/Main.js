import React from 'react'
import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="MainPage">
    {/*<img src={logo} className="careConnect-logo" alt="logo" />*/}
      <span className="logo">careConnect</span>
      <div className="MainPage-profile">
        <img src="https://example.com/profile.jpg" alt="Profile" />
        <span className="username">John Doe</span>
      </div>
      <div className="MainPage-text">
        <h1>Your source for multiple solutions</h1>
          <p>Appointment Booking</p>
          <p>Online Consultations</p>
          <p>E-medical records and e-prescriptions</p>
          <p>Online medicine shopping</p>
      </div>
      <nav className="MainPage-navigation">
        <ul>
          <li><Link to="/">Find a Medical Center</Link></li>
          <li><Link to="/appointment">Book an Appointment</Link></li>
          <li><a href="#">My appointments</a></li>
          <li><a href="#">My medical record</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Main