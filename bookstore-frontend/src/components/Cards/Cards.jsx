import React, { useState, useEffect } from "react";
import "./Cards.css";
import { useDarkMode } from "../../DarkModeContext";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import toast from 'react-hot-toast';

function Cards({ item, onDeleteBook }) {
  const { isDarkMode } = useDarkMode();
  const [authUser] = useAuth();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isWishlistFilled, setIsWishlistFilled] = useState(false);

  const userId = authUser ? authUser._id : null;

  useEffect(() => {
    if (userId) {
      const checkFavouriteStatus = async () => {
        try {
          const res = await axios.get(
            `http://192.168.134.227:5002/user/favourites/${userId}`
          );
          const favourites = res.data.favourites.map((fav) => fav._id);
          setIsHeartFilled(favourites.includes(item._id));
        } catch (error) {
          console.error("Error fetching favourite status:", error);
        }
      };

      checkFavouriteStatus();

      const checkWishlistStatus = async () => {
        try {
          const res = await axios.get(
            `http://192.168.134.227:5002/user/wishlist/${userId}`
          );
          const wishlist = res.data.wishlist.map((fav) => fav._id);
          setIsWishlistFilled(wishlist.includes(item._id));
        } catch (error) {
          console.error("Error fetching wishlist status:", error);
        }
      };

      checkWishlistStatus();
    }
  }, [userId, item._id]);

  const handleFavouriteClick = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const newFavouriteStatus = !isHeartFilled;
    setIsHeartFilled(newFavouriteStatus);

    try {
      if (newFavouriteStatus) {
        await axios.post("http://192.168.134.227:5002/user/add-favourite", {
          userId,
          bookId: item._id,
        });
      } else {
        await axios.post("http://192.168.134.227:5002/user/remove-favourite", {
          userId,
          bookId: item._id,
        });
      }
    } catch (error) {
      console.error("Error updating favourite status:", error);
    }
  };

  const handleWishlistClick = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const newWishlistStatus = !isWishlistFilled;
    setIsWishlistFilled(newWishlistStatus);

    try {
      if (newWishlistStatus) {
        await axios.post("http://192.168.134.227:5002/user/add-wishlist", {
          userId,
          bookId: item._id,
        });
      } else {
        await axios.post("http://192.168.134.227:5002/user/remove-wishlist", {
          userId,
          bookId: item._id,
        });
      }
    } catch (error) {
      console.error("Error updating wishlist status:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://192.168.134.227:5002/admin/delete-book/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      toast.success('Book deleted successfully');
      if (onDeleteBook) {
        onDeleteBook(bookId); // Notify parent component about the deletion
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className={`card ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="custom-card">
        <div className="inner">
          <div className="front">
            <figure>
              <img src={item.image} alt={item.name} />
            </figure>
            <h2 className="card-name">{item.name}</h2>
          </div>
          <div
            className="back"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="wish-star">
              <i className={`bi ${isWishlistFilled ? "bi-bag-fill" : "bi-bag"} bag-icon`} onClick={handleWishlistClick}></i>
              <i className={`bi ${isHeartFilled ? "bi-heart-fill" : "bi-heart"} heart-icon`} onClick={handleFavouriteClick}></i>
            </div>
            <div className="card-body">
              <div className="card-details">
                <h2 className="card-name">{item.name}</h2>
                <div className="card-category">{item.category}</div>
              </div>
              <p className="card-title">{item.title}</p>
              <div className="book-action">
                <div className="read-now-button">&#8377; {item.price}</div>
                <div className="buy-now-button">Buy Now</div>
              </div>
              {authUser && authUser.role === 'admin' && (
                <i className="bi bi-trash3" onClick={() => handleDeleteBook(item._id)}></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
