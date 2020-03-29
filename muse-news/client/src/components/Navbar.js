import React, { Component } from "react";
import "./../App.css";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="logo" style={{ width: "60px" }} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link text-white ml-5" href="#">
              <h1>
                muse-news&nbsp;<i class="fas fa-record-vinyl"></i>
              </h1>{" "}
              <span class="sr-only">(current)</span>
            </a>
          </li>

          <li className="nav-item active m-auto">
            <Link
              id="homeButton"
              className="nav-link text-white text-uppercase ml-5"
              to="/"
            >
              <h3>Home</h3> <span class="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item m-auto">
            <Link
              id="aboutButton"
              className="nav-link text-white text-uppercase ml-5"
              to="/about"
            >
              <h3>About</h3>{" "}
            </Link>
          </li>

          <li className="nav-item m-auto">
            <Link
              id="songsButton"
              className="nav-link text-white text-uppercase ml-5"
              to="/songs/1"
            >
              <h3>Songs</h3>{" "}
            </Link>
          </li>

          <li className="nav-item m-auto">
            <Link
              id="newsButton"
              className="nav-link text-white text-uppercase ml-5"
              to="/news"
            >
              <h3>News</h3>{" "}
            </Link>
          </li>

          <li className="nav-item m-auto">
            <Link
              id="artistsButton"
              className="nav-link text-white text-uppercase ml-5"
              to="/artists/1"
            >
              <h3>Artists</h3>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
