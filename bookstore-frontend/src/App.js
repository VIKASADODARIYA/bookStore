import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Books from "./Pages/Books/Books";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import SocialMedia from "./components/Social-media/SocialMedia";
import Profile from './Pages/Profile/Profile';
import UserDetails from "./components/admin-side/user-details/UserDetails";
import { DarkModeProvider } from "./DarkModeContext";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import FavouriteBook from "./Pages/FavouriteBook/FavouriteBook";
import WishlistBook from "./Pages/WishlistBook/WishlistBook";

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <SocialMedia />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/favorites" element={<FavouriteBook/>} />
              <Route path="/wishlist" element={<WishlistBook/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
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