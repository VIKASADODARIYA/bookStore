import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../../DarkModeContext.js";
import Footer from "../../components/Footer/Footer.jsx";
import Cards from "../../components/Cards/Cards.jsx";
import AddBook from "../../components/admin-side/AddBook/addBook.jsx";
import "./Books.css";
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
  const [sortBy, setSortBy] = useState('title'); // Default sort by title
  const [order, setOrder] = useState('asc'); // Default order is ascending
  const booksPerPage = 6;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://192.168.134.227:5002/book");
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
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? item.category === selectedCategory : true)
    );
  });

  const sortBooks = (books, sortBy, order) => {
    return books.slice().sort((a, b) => {
      if (sortBy === 'name') {
        return order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return order === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });
  };


  const sortedBooks = sortBooks(filteredBooks, sortBy, order);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

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
      await axios.post("http://192.168.134.227:5002/admin/addbook", newBook);
      // Fetch updated books list after adding new book
      const res = await axios.get("http://192.168.134.227:5002/book");
      setBooks(res.data);
      closeAddBookModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (e) => {
    const [newSortBy, newOrder] = e.target.value.split(':');
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  const noBooksAvailable = filteredBooks.length === 0;

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
                  <option value="">All Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select onChange={handleSortChange} className="filter-box">
                  <option value="name:asc">Name Ascending</option>
                  <option value="name:desc">Name Descending</option>
                  <option value="price:asc">Price Ascending</option>
                  <option value="price:desc">Price Descending</option>
                </select>
              </div>
              {authUser ? (
                noBooksAvailable ? (
                  <div className="content">
                    <p>No books available</p>
                  </div>
                ) : (
                  <div className="content">
                    {currentBooks.map((item) => (
                      <Cards key={item._id} item={item} />
                    ))}
                  </div>
                )
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
