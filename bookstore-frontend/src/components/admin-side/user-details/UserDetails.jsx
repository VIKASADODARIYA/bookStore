import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import './UserDetails.css';
import { useDarkMode } from '../../../DarkModeContext';
import toast from 'react-hot-toast';
import UpdateUser from '../update-user/UpdateUser';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [authUser] = useAuth();
    const navigate = useNavigate();
    const { isDarkMode } = useDarkMode();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (!authUser) {
            navigate('/');
        } else {
            fetchUsers();
        }
    }, [authUser, navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5002/admin/users');
            setUsers(response.data || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
        }
    };

    const handleDeleteUser = (userId) => {
        if (userId === authUser.id) {
            toast.error('You cannot delete your own account.');
            return;
        }
        setDeleteUserId(userId);
        setShowConfirmation(true);
    };

    const cancelDeleteUser = () => {
        setShowConfirmation(false);
        setDeleteUserId(null);
    };

    const confirmDeleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:5002/admin/delete-users/${deleteUserId}`);
            if (response.status === 200) {
                toast.success('User deleted successfully');
                fetchUsers(); // Refetch users after deletion
                cancelDeleteUser(); // Close confirmation popup
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again later.');
        }
    };

    const handleUpdateUser = (userId) => {
        const user = users.find((user) => user._id === userId);
        setSelectedUser(user);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedUser(null);
        fetchUsers(); // Refetch users after update
    };

    return (
        <div className={`main ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="user-details-container">
                <h2>All Users</h2>
                {error && <p className="error-message">{error}</p>}
                {users.length > 0 ? (
                    <div className="user-list">
                        <table className="user-details-table">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Edit Details</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="user-item">
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <i className='bi bi-pencil-square' onClick={() => handleUpdateUser(user._id)}></i>
                                        </td>
                                        <td>
                                            <i className='bi bi-trash' onClick={() => handleDeleteUser(user._id)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !error && <p className="loading-message">Loading users...</p>
                )}
            </div>
            <hr />
            <Footer />

            {showConfirmation && (
                <div className="confirmation-popup">
                    <div className={`popup-content ${isDarkMode ? 'dark-mode' : ''}`}>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="button-container">
                            <button className="confirm-button" onClick={confirmDeleteUser}>Confirm</button>
                            <button className="cancel-button" onClick={cancelDeleteUser}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <UpdateUser
                    userId={selectedUser._id}
                    userData={selectedUser}
                    onCloseModal={closeUpdateModal}
                />
            )}
        </div>
    );
};

export default UserDetails;
