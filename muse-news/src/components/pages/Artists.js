import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";

function Artists() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(
      `http://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&limit=3`
    );
    // console.log(process.env.REACT_APP_LASTFM_API_KEY);
    const items = await data.json();
    // console.log(items.artists.artist);
    setItems(items.artists.artist);
  };

  return (
    <div>
      <div class="container-fluid">
        <h1 class="pageHeader">America's Top Artists</h1>
        <h2 class="sectionHeader">Top 3 Artists</h2>
      </div>

      {/* <div class="album text-muted">
        <div class="container">
          <div class="row">
            <div class="card">
              <img
                src={Billie}
                alt="Card image cap"
                style={{ width: 100, height: 100 }}
              />
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280/thumb" alt="Card image cap" />
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div> */}

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
