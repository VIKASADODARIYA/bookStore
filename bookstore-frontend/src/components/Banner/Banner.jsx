import React from "react";
import "../../Pages/Home/Home.css";
import Banner from "../../assets/Banner.png";
import { useDarkMode } from "../../DarkModeContext";

export default function Home() {
    const { isDarkMode } = useDarkMode();
    

    return (
        <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
            <div className="container-left">
                <div className="sub-container">
                    <div className="sub-1">
                        <div className="text">
                            Hello, welcome here to learn something{" "}
                            <span>new everyday!!!</span>
                        </div>
                        <p>
                            Welcome to The BookShelf, your one-stop destination for literary
                            treasures. Discover a diverse collection of books from all
                            genres, curated to ignite your imagination. Enjoy personalized
                            recommendations and exclusive offers tailored just for you. Join
                            our community of book lovers and embark on your next reading
                            adventure today!
                        </p>
                    </div>
                    <input type="email" placeholder="Email" />
                    <div className="start-btn">
                        <a href="/">Get Started</a>
                    </div>
                </div>
            </div>
            <div className="container-right">
                <img src={Banner} alt="Banner" />
            </div>
        </div>
    );
}
