import React, { Component } from 'react'
import Slider from "react-slick";

const one = require('/Users/Zan/Desktop/SKYLAB/skylab-collab/skylab-bootcamp-201804/staff/muyzan/partygoer/client/app/src/static/images/carousel/011-happy.svg')




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
          <img src={one}/>
          <h3>Do you wanna party?</h3>
        </div>
        <div>
        <img src=""/>
          <h3>
partygoer finds the nearbiest parties for you</h3>
        </div>
        <div>
        <img src=""/>
          <h3>SLIDE</h3>
        </div>
      </Slider>
    );
  }
}