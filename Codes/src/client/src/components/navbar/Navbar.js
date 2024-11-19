import React, { useContext } from "react";
import { AuthContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { toggleAuth, userType, email, setToggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setToggleAuth(false);
    alert("Log out successfully");
    navigate("/");
  }

  return (
    <nav className="Toolbar">
      <div className="logo">careConnect</div>
      <div className="nav-links">
        {/*<Link to="/">Home</Link>*/}
        <Link to="/search">Search</Link>
        <Link to="/">Main</Link>
        {toggleAuth ? (
          <>
            <Link to="/profile">Profile</Link>
            {/* <Link to="/MedicalRecord">Medical Record</Link> */}

            <button className="logout" onClick={handleClick} >
              Logout
            </button>

            {userType === "medicalCenter" ? (
              <Link to={`/manage-appointment/${email}`}>Create Slots</Link>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
