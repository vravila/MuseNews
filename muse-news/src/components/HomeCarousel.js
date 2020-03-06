import React, { Component } from "react";
import "./../App.css";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import Weeknd1 from "./../imgs/the_weeknd.jpg";

function HomeCarousel() {
  return (
    <div id="demo" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
      </ul>

      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={Weeknd1} alt="The Weeknd" />
        </div>
        <div class="carousel-item">
          <img src="./../imgs/Billie.jpg" alt="Billie Eilish" />
        </div>
        <div class="carousel-item">
          <img src="./../imgs/Tame.jpg" alt="Tame Impala" />
        </div>
        <div class="carousel-item">
          <img src="./../imgs/weeknd.jpg" alt="The Weeknd" />
        </div>
        <div class="carousel-item">
          <img src="./../imgs/tame_impala.jpg" alt="Tame  Impala" />
        </div>
      </div>

      <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
  );
}

export default HomeCarousel;
