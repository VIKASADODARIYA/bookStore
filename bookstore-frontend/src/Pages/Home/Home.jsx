import React from "react";
import "./Home.css";
import { useDarkMode } from "../../DarkModeContext";
import Footer from "../../components/Footer/Footer";
import Banner from '../../components/Banner/Banner';
import FreeBook from '../../components/FreeBook/FreeBook';
import { useAuth } from "../../context/AuthProvider";


export default function Home() {
  const { isDarkMode } = useDarkMode();
  const [authUser] = useAuth();

  return (
    <div className={`main ${isDarkMode ? "dark-mode" : ""}`}>
      <Banner />
      <hr />
      <div className="sub-1">
        {
          authUser ? (
            <><FreeBook />
            </>
          ) : (
            <>
              <h1>Free Offered Courses</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium veritatis alias pariatur ad dolor repudiandae eligendi
                corporis nulla non suscipit, iure neque earum?
              </p>
            </>
          )
        }
      </div>
      <hr />
      <Footer />
    </div>
  );
}
