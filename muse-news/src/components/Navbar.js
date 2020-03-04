import React, {Component} from 'react';
import './../App.css'
import logo from '../logo.svg'

function Navbar() {

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" style={{width: '60px'}}/>
          </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
            <li className="nav-item active">
              <a className="nav-link text-white ml-5" href="#"><h1>muse-news&nbsp;<i class="fas fa-record-vinyl"></i></h1> <span class="sr-only">(current)</span></a>
            </li>

            <li className="nav-item active m-auto">
              <a className="nav-link text-white text-uppercase ml-5" href="#"><h3>Home</h3> <span class="sr-only">(current)</span></a>
            </li>
            <li className="nav-item m-auto">
              <a className="nav-link text-white text-uppercase ml-5" href="#"><h3>About</h3> </a>
            </li>

            <li className="nav-item m-auto">
              <a className="nav-link text-white text-uppercase ml-5" href="#"><h3>Songs</h3> </a>
            </li>

            <li className="nav-item m-auto">
              <a className="nav-link text-white text-uppercase ml-5" href="#"><h3>News</h3> </a>
            </li>

            <li className="nav-item m-auto">
              <a className="nav-link text-white text-uppercase ml-5" href="#"><h3>Artists</h3> </a>
            </li>
          </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

  ); 
}

export default Navbar;