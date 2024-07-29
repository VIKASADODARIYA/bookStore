import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../../DarkModeContext";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards.jsx";
import AddBook from "../../components/admin-side/AddBook/addBook.jsx"; // Import the AddBook component
import "./Course.css";
import { useAuth } from "../../context/AuthProvider.jsx";

export default function Course() {
  const [authUser] = useAuth();
  const { isDarkMode } = useDarkMode();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5002/book");
        console.log(res.data);
        setBooks(res.data);

        // Extract unique categories from the books
        const uniqueCategories = [
          ...new Set(res.data.map((book) => book.category))
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  const filteredBooks = books.filter((item) => {
    // Filter books based on the search input and selected category
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? item.category === selectedCategory : true)
    );
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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

  const openAddBookModal = () => {
    setIsAddBookOpen(true);
  };

  const closeAddBookModal = () => {
    setIsAddBookOpen(false);
  };

  const handleAddBook = async (newBook) => {
    try {
      await axios.post("http://localhost:5002/admin/addbook", newBook);
      // Fetch updated books list after adding new book
      const res = await axios.get("http://localhost:5002/book");
      setBooks(res.data);
      closeAddBookModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="container">
          <div className="sub-container">
            <div className="heading">
              We're delighted to have you <span>Here! :)</span>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
                assumenda? Repellendus, iste corrupti? Tempore laudantium
                repellendus accusamus accusantium sed architecto odio, nisi
                expedita quas quidem nesciunt debitis dolore non aspernatur
                praesentium assumenda sint quibusdam, perspiciatis, explicabo
                sequi fugiat amet animi eos aut. Nobis quisquam reiciendis sunt
                quis sed magnam consequatur!
              </p>
              <div className="back-btn">
                <a href="/">Back</a>
              </div>
            </div>
            <br />
            <hr />
            <div className="book-content">
              <div className="search-filter-container">
                {authUser && authUser.role === 'admin' && (
                  <>
                    <i className="bi bi-plus-square" onClick={openAddBookModal}></i>
                    {isAddBookOpen && <AddBook onCloseModal={closeAddBookModal} onAddBook={handleAddBook} />}
                  </>
                )}
                <input
                  type="search"
                  className="search-box"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for a book"
                />
                <select
                  name="filter"
                  id="filter-book"
                  className="filter-box"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Book Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {authUser ? (
                <div className="content">
                  {currentBooks.map((item) => (
                    <Cards key={item._id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="content">
                  <p>Please log in to read the books.</p>
                </div>
              )}
            </div>
            {filteredBooks.length > booksPerPage && (
              <div className="pagination">
                <button
                  className="prev-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-double-left"></i>
                </button>
                {currentPage - 1}...
                {currentPage}...
                {currentPage + 1}
                <button
                  className="next-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-chevron-double-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
        <hr />
        <Footer />
      </div>

      {isAddBookOpen && (
        <AddBook
          onCloseModal={closeAddBookModal}
          onAddBook={handleAddBook}
        />
      )}
    </>
  );
}
