import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import { useAuth } from "../../context/AuthProvider";
import { useDarkMode } from "../../DarkModeContext.js";
import "../Books/Books.css";
import Footer from "../../components/Footer/Footer.jsx";

const WishlistBook = () => {
    const [authUser] = useAuth();
    const { isDarkMode } = useDarkMode();
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6; // Number of books to display per page

    useEffect(() => {
        if (authUser) {
            const fetchWishlistBooks = async () => {
                try {
                    const res = await axios.get(`http://192.168.134.227:5002/user/wishlist/${authUser._id}`);
                    setWishlistBooks(res.data.wishlist);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching wishlist books:", error);
                    setLoading(false);
                }
            };

            fetchWishlistBooks();
        }
    }, [authUser]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = wishlistBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(wishlistBooks.length / booksPerPage);

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
                            Your Wishlist Books
                            <p>Here you can find all the books you've marked as wishlist.</p>
                        </div>
                        <div className="book-content">
                            {wishlistBooks.length === 0 ? (
                                <div className="content">
                                    <p>No wishlist books found.</p>
                                </div>
                            ) : (
                                <div className="content">
                                    {currentBooks.map((book) => (
                                        <Cards key={book._id} item={book} />
                                    ))}
                                </div>
                            )}
                        </div>
                        {wishlistBooks.length > booksPerPage && (
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

export default WishlistBook;
