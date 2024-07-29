import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../../DarkModeContext';
import { useAuth } from '../../context/AuthProvider';
import './Profile.css';
import Footer from '../../components/Footer/Footer';
import { useNavigate, Link } from 'react-router-dom';
import ProfileImg from '../../assets/profile.png';
import ForgotPassword from '../../components/Forgot-Password/ForgotPassword';
import EditDetails from '../../components/EditUserDetails/EditUserDetails';
import toast from 'react-hot-toast';

const Profile = () => {
    const { isDarkMode } = useDarkMode(); // Ensure this hook is correctly implemented
    const [authUser, setAuthUser] = useAuth();
    const [userData, setUserData] = useState(null);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            navigate('/');
        } else {
            fetchUserData(authUser._id);
        }
    }, [authUser]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5002/user/userdetails/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data.user);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:5002/user/delete-user/${authUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }
    
            toast.success('Account deleted successfully');
            setAuthUser(null); // Clear authUser after successful deletion
            navigate('/'); // Redirect to the home page after successful deletion
        } catch (error) {
            console.error('Error deleting user:', error.message);
            toast.error('Failed to delete account. Please try again.');
        }
    };
    

    if (!authUser) {
        return null;
    }

    const openForgotPasswordModal = () => {
        setIsForgotPasswordOpen(true);
    };

    const closeForgotPasswordModal = () => {
        setIsForgotPasswordOpen(false);
    };

    const openEditDetailsModal = () => {
        setIsEditDetailsOpen(true);
    };

    const closeEditDetailsModal = () => {
        setIsEditDetailsOpen(false);
        fetchUserData(authUser._id);
    };

    return (
        <>
            <div className={`main ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="profile-container">
                    <h1>User Profile</h1>
                    {userData ? (
                        <>
                            <div className="profile-details">
                                <div className="profile-image">
                                    <img src={userData.profile || ProfileImg} alt="Profile" />
                                </div>
                                <div className="user-info">
                                    <ul>
                                        <li><strong>Full Name:</strong> {userData.fullname}</li>
                                        <li><strong>Phone:</strong> {userData.phone}</li>
                                        <li><strong>Email:</strong> {userData.email}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="update-profile">
                                <div className="forgot-pass">
                                    <Link onClick={openForgotPasswordModal}>Forgot Password</Link>
                                </div>
                                <div className="edit-details">
                                    <Link onClick={openEditDetailsModal}>Edit Details</Link>
                                </div>
                                <div className="delete-account">
                                    <Link onClick={deleteUser}>Delete Account</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
                <hr />
                <Footer />
            </div>
            {isForgotPasswordOpen && (
                <ForgotPassword onCloseModal={closeForgotPasswordModal} />
            )}
            {isEditDetailsOpen && (
                <EditDetails onCloseModal={closeEditDetailsModal} />
            )}
        </>
    );
};

export default Profile;
