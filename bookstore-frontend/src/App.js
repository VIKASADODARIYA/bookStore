import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Course from "./Pages/Course/Course";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
// import Login from "./components/Login-Signup/Login";
// import Signup from "./components/Login-Signup/Signup";
import Profile from './Pages/Profile/Profile';
import UserDetails from "./components/admin-side/user-details/UserDetails";
import { DarkModeProvider } from "./DarkModeContext";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course" element={<Course />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<UserDetails />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
