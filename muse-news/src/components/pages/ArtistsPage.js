import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    console.log(item.artist);
  };

  return (
    <div>
      <h4>{item.name}</h4>
      {/* <img src={temporaryImages(item.name)} alt="" /> */}
      <p>{escapeHREF(item.bio.content)}</p>
      <br></br>
      <p>Listeners: {item.stats.listeners} </p>
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
      console.log("Acsdfadsf");
      return "./src/components/images/billie_eilish.jpg";
    } else if (name === "The Weeknd") {
      return "./images/the_weeknd.jpg";
    } else if (name === "Tame Impala") {
      return "./images/tame_impala.jpg";
    } else if (name === "Kanye West") {
      return "./images/kanye.jpg";
    } else if (name === "Dua Lipa") {
      return "./images/dua_lipa.jpg";
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
