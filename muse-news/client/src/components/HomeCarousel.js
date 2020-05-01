import React, { Component } from "react";
import "./../App.css";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import Billie from "./../imgs/BillieHome.jpg";
import Abel from "./../imgs/weeknd_home.jpg";
import Tame from "./../imgs/tame_impala.jpg";
import Drake from "./../imgs/drake_home.jpg";
import Carousel from "react-bootstrap/Carousel";

function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={Abel} alt="First slide" />
        <Carousel.Caption>
          <h3>The Weeknd</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Billie} alt="Third slide" />

        <Carousel.Caption>
          <h3>Billie Eilish</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Drake} alt="Third slide" />

        <Carousel.Caption>
          <h3>Drake</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
