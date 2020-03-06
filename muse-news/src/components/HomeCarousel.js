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
    // <div
    //   id="carouselExampleControls"
    //   class="carousel slide"
    //   data-ride="carousel"
    // >
    //   <div class="carousel-inner">
    //     <div class="carousel-item active">
    //       <img class="d-block w-100" src={Billie} alt="First slide" />
    //     </div>
    //     <div class="carousel-item">
    //       <img class="d-block w-100" src={Billie} alt="Second slide" />
    //     </div>
    //     <div class="carousel-item">
    //       <img class="d-block w-100" src={Tame} alt="Third slide" />
    //     </div>
    //   </div>
    //   <a
    //     class="carousel-control-prev"
    //     href="#carouselExampleControls"
    //     role="button"
    //     data-slide="prev"
    //   >
    //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span class="sr-only">Previous</span>
    //   </a>
    //   <a
    //     class="carousel-control-next"
    //     href="#carouselExampleControls"
    //     role="button"
    //     data-slide="next"
    //   >
    //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span class="sr-only">Next</span>
    //   </a>
    // </div>

    // <div id="demo" class="carousel slide" data-ride="carousel">
    //   <ul class="carousel-indicators">
    //     <li data-target="#demo" data-slide-to="0" class="active"></li>
    //     <li data-target="#demo" data-slide-to="1"></li>
    //     <li data-target="#demo" data-slide-to="2"></li>
    //   </ul>

    //   <div class="carousel-inner">
    //     <div class="carousel-item active">
    //       <img src={Abel} alt="The Weeknd" />
    //     </div>
    //     <div class="carousel-item">
    //       <img src={Billie} alt="Billie Eilish" />
    //     </div>
    //     <div class="carousel-item">
    //       <img src={Tame} alt="Tame Impala" />
    //     </div>
    //   </div>

    //   <a class="carousel-control-prev" href="#demo" data-slide="prev">
    //     <span class="carousel-control-prev-icon"></span>
    //   </a>
    //   <a
    //     class="carousel-control-next"
    //     href="#demo"
    //     data-slide="next"
    //     style={{ color: "red" }}
    //   >
    //     <span class="carousel-control-next-icon"></span>
    //   </a>
    // </div>
  );
}

export default HomeCarousel;
