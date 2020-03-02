import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ArtistsPage({ match }) {
  useEffect(() => {
    fetchItem();
    // console.log(match);
  }, []);

  const [item, setItem] = useState({
    bio: {},
    image: {
      size: {},
      text: {}
    }
  });

  const fetchItem = async () => {
    const fetchItem = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${match.params.id}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
    );
    const item = await fetchItem.json();
    setItem(item.artist);
    console.log(item.artist);
  };

  return (
    <div>
      <h4>{item.name}</h4>
      <img src={item.image.small} alt="" />
      <p>{item.bio.content}</p>
    </div>
    // <div>
    //   <h1>Artists Page!!!</h1>
    //   <h4>Drake</h4>
    //   <h4>The Weeknd</h4>
    //   <h4>Coldplay</h4>
    // </div>
  );
}

export default ArtistsPage;
