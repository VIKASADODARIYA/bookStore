import React from "react";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import './Login.css'
import { Link } from "react-router-dom";

const Logout = () => {
    const [authUser, setAuthUser] = useAuth();

    const handleLogout = () => {
        try {
            setAuthUser(null);
            localStorage.removeItem("Users");
            toast.success("Logout successfully");

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            toast.error("Error: " + error);
            setTimeout(() => { }, 2000);
        }
    };

    return (
        <div className="logout-btn" onClick={handleLogout}>
            {/* <a href="#/">Logout</a> */}
            <Link to="/">Logout</Link>
        </div>
    );
};

export default Logout;
