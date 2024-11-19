import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AppointmentForm from "./pages/Appointment/Appointments";
import Profile from "./pages/Profile/Profile";
import MedicalCenter from "./pages/MedicalCenter/MedicalCenter";
import ChatRoom from "./pages/Chat/Chat";
// import Appointment from "./pages/Appointment/Appointments";
import Doctor from "./pages/Doctor/Doctor";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Filter from "./pages/Filter/Filter";
import { AuthContext } from "./context/Context";
import './index.css'
//context
function App() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("patient");
  const [toggleAuth, setToggleAuth] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        email,
        userType,
        setEmail,
        setUserType,
        setToggleAuth,
        toggleAuth,
      }}
    >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/medical-center/:id" element={<MedicalCenter />} />
        <Route path="/doctor/:emailD" element={<Doctor />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/manage-appointment/:email" element={<AppointmentForm />} />
        <Route path="/search" element={<Filter />} />
        {/* <Route path="/newAppointment" element={<Appointment />} /> */}
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
