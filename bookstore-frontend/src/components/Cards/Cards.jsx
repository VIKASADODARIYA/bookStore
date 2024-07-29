import React, { useState } from "react";
import './Cards.css'
import { useDarkMode } from "../../DarkModeContext";

function Cards({ item }) {
  const { isDarkMode } = useDarkMode();
  const [isFilled, setIsFilled] = useState(false);

  const handleViewClick = () => {
    try {
      window.open(item.path, "_blank");
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const handleClick = () => {
    setIsFilled(!isFilled); // Toggle the state
  };

  const handleDownloadClick = async () => {
    try {
      const response = await fetch(item.path); // Replace with the actual path to your file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${item.name}${getFileExtension(item.path)}`); // Set download attribute with file extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url); // Clean up the URL object after download
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop(); // Extract file extension from the path
  };

  return (
    <div className={`card ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="custom-card">
        <figure>
          <img src={item.image} alt="Images" />
          <i className={`bi ${isFilled ? 'bi-star-fill' : 'bi-star'} star-icon`} onClick={handleClick}></i>
        </figure>
        <div className="card-body">
          <div className="card-details">
            <h2 className="card-name">
              {item.name}
            </h2>
            <div className="card-category">
              {item.category}
            </div>
          </div>
          <p className="card-title">{item.title}</p>
          <div className="card-actions">
          </div>
          {/* <div className="price-badge">${item.price}</div> */}
          <div className="book-action">
            <div className="read-now-button" onClick={handleViewClick}>
              &#8377; {item.price}
            </div>
            <div className="buy-now-button" onClick={handleDownloadClick}>
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
