import React, { Component } from "react";
import { Link } from "react-router-dom";

class ArtistsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link id="linkToArtistsPage" to={`/artistspage/${this.props.item.name}`}>
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
                <h3 id="artistName" className="card-title text-uppecase">
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

export default ArtistsCard;
