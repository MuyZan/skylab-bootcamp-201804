import React, { Component } from 'react'
import Slider from "react-slick";

const one = require('./../../../static/images/carousel/011-happy.svg')
const two = require('./../../../static/images/carousel/061-route.svg')

const three = require('./../../../static/images/carousel/039-fun.svg')



export default class Carousel extends Component {
  render() {
    var settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
    
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={one}/>
          <h3>Do you wanna party?</h3>
        </div>
        <div>
        <img src={two}/>
          <h3>
partygoer finds the nearbiest parties for you</h3>
        </div>
        <div>
        <img src={three}/>
          <h3>Just sign up for free and get ready for fun.</h3>
        </div>
      </Slider>
    );
  }
}