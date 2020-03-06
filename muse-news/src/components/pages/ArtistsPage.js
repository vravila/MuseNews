import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";

function ArtistsPage({ match }) {
  useEffect(() => {
    fetchItem();
    console.log(match);
  }, []);

  const [item, setItem] = useState({
    bio: {},
    stats: {},
    image: {
      size: {},
      text: {}
    }
  });

  const fetchItem = async () => {
    const fetchItem = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${match.params.id}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
    );
    const item = await fetchItem.json();
    setItem(item.artist);
    // console.log(item.artist);
  };

  return (
    <div>
      <h1>{item.name}</h1>
      <img
        className="center-block"
        src={temporaryImages(item.name)}
        alt=""
        style={{ width: 500, height: 500 }}
      />
      <br />
      <p className="lead" style={{ fontSize: "18px" }}>
        {escapeHREF(item.bio.content)}
      </p>
      <br></br>
      <p className="lead" style={{ fontSize: "15px" }}>
        <strong>Listeners:</strong> {item.stats.listeners}{" "}
      </p>
    </div>
    // <div>
    //   <h1>Artists Page!!!</h1>
    //   <h4>Drake</h4>
    //   <h4>The Weeknd</h4>
    //   <h4>Coldplay</h4>
    // </div>
  );
}

function temporaryImages(name) {
  if (name) {
    console.log(name);
    if (name === "Billie Eilish") {
      return Billie;
    } else if (name === "The Weeknd") {
      return Abel;
    } else if (name === "Tame Impala") {
      return Tame;
    } else {
      return "";
    }
  }
}

function escapeHREF(content) {
  console.log(typeof content);
  console.log(content);
  if (content) {
    return content.substring(0, content.indexOf("<a href"));
  }
  //   content.indexOf("k");
  //   return content.substring(0, content.indexOf("<a href"));
  return content;
}

export default ArtistsPage;
