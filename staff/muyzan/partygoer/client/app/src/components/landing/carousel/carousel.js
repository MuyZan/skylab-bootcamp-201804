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
        autoplay: true,
        autoplaySpeed: 3500,
    
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={one}/>
          <h3><strong>Hey!</strong><br/> Do you wanna <strong>party?</strong></h3>
        </div>
        <div>
        <img src={two}/>
          <h3>
<strong>partygoer</strong> finds the nearbiest parties for you</h3>
        </div>
        <div>
        <img src={three}/>
          <h3>Just sign up for <strong>free</strong> and get ready for <strong>fun.</strong></h3>
        </div>
      </Slider>
    );
  }
}