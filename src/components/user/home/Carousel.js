import React, { useEffect } from "react";
import "./carousel.css";
import { useDispatch } from "react-redux";
import { orderActions } from "../../../store/userstore/OrderSlice";
import ProductBox from "./ProductBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel({ products, loggedStatus }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1341,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1038,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 795,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 513,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderActions.updateOnOrderScreenValueToFalse());
  }, [dispatch]);

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {products.map((pro, index) => {
          return (
            <div key={index}>
              <ProductBox loggedStatus={loggedStatus} product={pro} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Carousel;
