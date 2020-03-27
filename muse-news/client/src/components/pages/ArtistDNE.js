import React from "react";
import { InfoConsumer } from "../context";
import Info from "./../Info";
import { Link } from "react-router-dom";

function ArtistDNE() {
  return (
    <div className="outsideContainer">
      <div className="container">
        <h1>
          We're sorry, Muse-News does not have any information on this artist at
          the moment! :(
        </h1>
        <h1>
          <Link to="/songs/1">Link Back to Songs Page</Link>
        </h1>
      </div>
    </div>
  );
}

export default ArtistDNE;
