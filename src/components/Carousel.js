import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import classes from "./Carousel.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Carousel = ({ height }) => {
  const nav = useNavigate();
  const handleButton1 = () => {
    nav("/styles");
  };
  const handleButton2 = () => {
    window.scroll(0,height)
  };
  const handleButton3=()=>{
    nav('/books')
  }
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className={`${classes.imgModel} carousel-item active`}>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="https://i.ibb.co/cXFnLLV/6.png"
              className={`d-block h-100 w-50`}
              alt="model 1"
            />
            <div className="text-center">
              <h1>SEASONAL SALE</h1>
              <p>5-10% off</p>
              <Button clickHandler={handleButton1} title="SHOP NOW" />
            </div>
          </div>
        </div>
        <div className={`${classes.imgModel} carousel-item  `}>
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="https://i.ibb.co/DG69bQ4/2.png"
              className="d-block h-100 w-50"
              alt="model 2"
            />
            <div className="text-center">
              <h1>TRENDING NOW</h1>
              <p>Explore never seen before on clothing</p>
              <Button clickHandler={handleButton2} title="SHOP NOW" />
            </div>
          </div>
        </div>
        <div className={`${classes.imgModel} relative carousel-item  `}>
            <div className="d-flex position-absolute top-50 start-50 translate-middle flex-column align-items-center text-center">
              <h1><i>"A book is a gift you can open again and again"</i></h1>
              <p>upto 10% off</p>
              <Button clickHandler={handleButton3} title="SHOP NOW" />
            </div>
        </div>
      </div>
      <button
        className="carousel-control-prev "
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon " aria-hidden="true"></span>
        <span className="visually-hidden ">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
