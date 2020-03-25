import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";
import Button from "react-bootstrap/Button";

function Artists() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(
      `https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&limit=3`
    );
    // console.log(process.env.REACT_APP_LASTFM_API_KEY);
    const items = await data.json();
    // console.log(items.artists.artist);
    setItems(items.artists.artist);

    console.log("Starting Node Call...");
    const response = await fetch("/api/testExport", {
      method: "GET"
    });
    console.log(response);
    console.log("Done with Node Call!!!");
  };

  return (
    <div>
      <div class="container-fluid">
        <h1 class="pageHeader">America's Top Artists</h1>
        <h2 class="sectionHeader">Top 3 Artists:</h2>
      </div>
      {items.map(item => (
        <Link to={`/artists/${item.name}`}>
          <div className="row-mt-1">
            <div className="col-3 col-sm-3 mx-auto mb-2">
              <div
                className="card"
                style={{ width: "20rem", height: "30rem", background: "azure" }}
              >
                <img
                  src={temporaryImages(item.name)}
                  alt="Alt"
                  className="card-img-top"
                  style={{ width: "20rem", height: "25rem" }}
                />

                <div className="card-body">
                  {/* <Link to={`/artists/${item.name}`}> */}
                  <h3 className="card-title text-uppecase">{item.name}</h3>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
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

export default Artists;
