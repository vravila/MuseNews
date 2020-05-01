import ReactDOM from "react-dom";
import React, { useState, useEffect, Component } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";

class SongsCard extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    console.log(props);
  }

  render() {
    return (
      <Link
        id="linkToSongsPage"
        to={`/songspage/${this.props.item.name}/${this.props.item.artist.name}`}
      >
        <div className="row-mt-1">
          <div className="col-3 col-sm-3 mx-auto mb-2">
            <div
              className="card center-block bg-dark text-white"
              style={{ width: "20rem", height: "35rem" }}
            >
              <img
                src={this.props.item.bingImageURL}
                alt="Image not Found"
                className="card-img-top"
                style={{ width: "20rem", height: "25rem" }}
              />
              <div className="card-body">
                <h3 id="songName" className="card-title text-uppecase">
                  {this.props.item.name}
                </h3>
                <h5 className="card-title text-uppecase">
                  Rank: {this.props.item.rank}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default SongsCard;
