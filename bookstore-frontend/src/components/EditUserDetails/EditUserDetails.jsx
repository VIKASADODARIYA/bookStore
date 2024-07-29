import React, { useState, useEffect } from 'react';
import { useDarkMode } from "../../DarkModeContext";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import "./EditUserDetails.css";

const EditDetails = ({ onCloseModal }) => {
    const { isDarkMode } = useDarkMode(); // Ensure this hook is correctly implemented
    const [authUser] = useAuth();
    const [userData, setUserData] = useState({
        fullname: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        if (authUser) {
            setUserData({
                fullname: authUser.fullname || "",
                phone: authUser.phone || "",
                email: authUser.email || ""
            });
        }
    }, [authUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateDetails = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5002/user/edit-details/${authUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            console.log("User details updated successfully");
            toast.success("User details updated successfully");
            onCloseModal();
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("Something went wrong. Please try again.");
        }
    };
    
    
    const closeEditDetailsModal = () => {
        onCloseModal();
    };

    return (
        <dialog id="EditDetailsModel" className="modal">
            <div className={`edit-details-main ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="edit-details-content">
                    <p>Edit Details</p>
                    <form onSubmit={handleUpdateDetails}>
                        <div className="form-details">
                            <label htmlFor="fullname">Full Name:</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={userData.fullname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={userData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={userData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="edit-details-btn">
                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={closeEditDetailsModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default EditDetails;
