import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useDarkMode } from "../../../DarkModeContext";
import "./addBook.css";

const AddBook = ({ onCloseModal, onAddBook }) => {
    const { isDarkMode } = useDarkMode();
    const [newBook, setNewBook] = useState({
        title: "",
        name: "",
        price: "",
        category: "",
        image: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddBook = async (event) => {
        event.preventDefault();
        try {
            await onAddBook(newBook); // Call the onAddBook prop function
            toast.success("Book added successfully");
            onCloseModal();
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <dialog id="AddBookModal" className="modal">
            <div className={`add-book-main ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="add-book-content">
                    <p>Add New Book</p>
                    <form onSubmit={handleAddBook}>
                        <div className="form-details">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter book title"
                                value={newBook.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter book name"
                                value={newBook.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Enter book price"
                                value={newBook.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                placeholder="Enter book category"
                                value={newBook.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="image">Image URL:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Enter image URL"
                                value={newBook.image}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="add-book-btn">
                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={onCloseModal}
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

export default AddBook;
