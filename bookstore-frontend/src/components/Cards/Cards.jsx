import React, { useState, useEffect } from "react";
import './Cards.css';
import { useDarkMode } from "../../DarkModeContext";
import { useAuth } from "../../context/AuthProvider"; // Import the useAuth hook
import axios from "axios";

function Cards({ item }) {
  const { isDarkMode } = useDarkMode();
  const [authUser] = useAuth(); // Get authUser from context
  const [isFilled, setIsFilled] = useState(false);

  const userId = authUser ? authUser._id : null; // Ensure userId is fetched

  useEffect(() => {
    if (userId) {
      const checkFavouriteStatus = async () => {
        try {
          const res = await axios.get(`http://192.168.134.227:5002/user/favourites/${userId}`);
          const favourites = res.data.favourites.map(fav => fav._id);
          setIsFilled(favourites.includes(item._id));
        } catch (error) {
          console.error("Error fetching favourite status:", error);
        }
      };

      checkFavouriteStatus();
    }
  }, [userId, item._id]);

  const handleViewClick = () => {
    try {
      window.open(item.path, "_blank");
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const handleStarClick = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const newFavouriteStatus = !isFilled;
    setIsFilled(newFavouriteStatus);

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

  return (
    <div className={`card ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="custom-card">
        <figure>
          <img src={item.image} alt={item.name} />
          <i 
            className={`bi ${isFilled ? 'bi-star-fill' : 'bi-star'} star-icon`} 
            onClick={handleStarClick}
          ></i>
        </figure>
        <div className="card-body">
          <div className="card-details">
            <h2 className="card-name">{item.name}</h2>
            <div className="card-category">{item.category}</div>
          </div>
          <p className="card-title">{item.title}</p>
          <div className="card-actions">
          </div>
          <div className="book-action">
            <div className="read-now-button" onClick={handleViewClick}>
              &#8377; {item.price}
            </div>
            <div className="buy-now-button">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
