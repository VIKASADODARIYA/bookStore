import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import '../Cards/Cards.css'

function Freebook() {
    const [book, setBook] = useState([]);
    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get("http://localhost:5002/book");

                const data = res.data.filter((data) => data.category === "Free");
                console.log(data);
                setBook(data);
            } catch (error) {
                console.log(error);
            }
        };
        getBook();
    }, []);

    const CustomPrevArrow = ({ onClick }) => (
        <div className="prev custom-arrow" onClick={onClick}>
            <i className="bi bi-caret-left-fill"></i>
        </div>
    );
    
    const CustomNextArrow = ({ onClick }) => (
        <div className="next custom-arrow" onClick={onClick}>
            <i className="bi bi-caret-right-fill"></i>
        </div>
    );
    

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: '3rem',
        initialSlide: 0,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    infinite: true,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0rem',
                },
            },
        ],
    };
    return (
        <>
            <h1 className="">Free Offered Courses</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium veritatis alias pariatur ad dolor repudiandae eligendi
                corporis nulla non suscipit, iure neque earum?
            </p>
            <hr />
            <div className="card">
                <Slider {...settings}>
                    {book.map((item) => (
                        <>
                            <div className="custom-card">
                                <figure>
                                    <img src={item.image} alt="Images" />
                                    <i className="star-icon"></i>
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
                                        <div className="read-now-button">
                                            &#8377; {item.price}
                                        </div>
                                        <div className="buy-now-button">
                                            Buy Now
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default Freebook;