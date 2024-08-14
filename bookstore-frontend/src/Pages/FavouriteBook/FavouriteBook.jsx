import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import { useAuth } from "../../context/AuthProvider";
import { useDarkMode } from "../../DarkModeContext.js";
import "../Books/Books.css";
import Footer from "../../components/Footer/Footer.jsx";

const FavouriteBook = () => {
    const [authUser] = useAuth();
    const { isDarkMode } = useDarkMode();
    const [favouriteBooks, setFavouriteBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6; // Adjust the number of books per page as needed

    useEffect(() => {
        if (authUser) {
            const fetchFavouriteBooks = async () => {
                try {
                    const res = await axios.get(`http://192.168.134.227:5002/user/favourites/${authUser._id}`);
                    setFavouriteBooks(res.data.favourites);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching favourite books:", error);
                    setLoading(false);
                }
            };

            fetchFavouriteBooks();
        }
    }, [authUser]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const noFavouriteBooksAvailable = favouriteBooks.length === 0;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = favouriteBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(favouriteBooks.length / booksPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="container">
                    <div className="sub-container">
                        <div className="heading">
                            Your Favourite Books
                            <p>
                                Here you can find all the books you've marked as favourites.
                            </p>
                        </div>
                        <div className="book-content">
                            {noFavouriteBooksAvailable ? (
                                <div className="content">
                                    <p>No favourite books found.</p>
                                </div>
                            ) : (
                                <div className="content">
                                    {currentBooks.map((book) => (
                                        <Cards key={book._id} item={book} />
                                    ))}
                                </div>
                            )}
                        </div>
                        {favouriteBooks.length > booksPerPage && (
                            <div className="pagination">
                                <button
                                    className="prev-btn"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    <i className="bi bi-arrow-left-circle"></i>
                                </button>
                                <span>{currentPage}</span>
                                <button
                                    className="next-btn"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className="bi bi-arrow-right-circle"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <Footer />
        </>
    );
};

export default FavouriteBook;
