import React, { Component } from 'react'
import Slider from "react-slick";

export default class Carousel extends Component {
  render() {
    var settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    
    };
    return (
      <Slider {...settings}>
        <div>
          <h3>HERE</h3>
        </div>
        <div>
          <h3>A</h3>
        </div>
        <div>
          <h3>SLIDE</h3>
        </div>
      </Slider>
    );
  }
}