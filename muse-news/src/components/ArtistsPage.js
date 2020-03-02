import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ArtistsPage() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(
      `http://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=${process.env.REACT_APP_LASTFM_API_KEY}`
    );
    // console.log(process.env.REACT_APP_LASTFM_API_KEY);
    const items = await data.json();
    // console.log(items.artists.artist);
    setItems(items.artists.artist);
  };

  return (
    <div>
      {items.map(item => (
        <h4 key={item.name}>
          <Link to={`/artists/${item.mbid}`}>{item.name}</Link>
        </h4>
      ))}
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
