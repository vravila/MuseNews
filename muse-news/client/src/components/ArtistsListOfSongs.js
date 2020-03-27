import React, { useState, useEffect } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";

function ArtistsListOfSongs(props) {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  console.log("-------------------");
  console.log(props.artistID);
  console.log(typeof props.artistID);
  var artistName = String(props.artistID);
  console.log("Post Malone" === artistName);
  var callStr = "/api/songs/getSongsByAnArtist/" + "Dua Lipa";
  const fetchItems = async () => {
    const startIdx = 1;
    const endIdx = 10;
    const data = await fetch(callStr, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const items = await data.json();
    console.log(items);
    setItems(items);
    console.log(items);
    console.log("asdsdfasdf");
  };

  return (
    <div>
      {items.map(item => (
        <p>{item.name}</p>
      ))}
    </div>
  );
}

export default ArtistsListOfSongs;
