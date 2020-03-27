import React, { useState, useEffect } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";
import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";
import AltSinging from "./../../imgs/alt_singing.jpg";
import Button from "react-bootstrap/Button";

function Songs({ match }) {
  useEffect(() => {
    fetchItems();
  }, []);

  const DEVELOPMENT_SERVER = "http://localhost:5000";

  const ENTRIES_PER_PAGE = 10;
  const DATABASE_LIMIT = 300;
  const LAST_PAGE = Math.ceil(DATABASE_LIMIT / ENTRIES_PER_PAGE);
  const [items, setItems] = useState([]);
  const sourceName = "songs";

  var showPrevButton = true;
  var showNextButton = true;

  if (match.params.page == 1) {
    showPrevButton = false;
  }
  if (match.params.page == LAST_PAGE) {
    showNextButton = false;
  }
  // console.log("PAGE!");
  // console.log(match.params.page);
  // console.log("END PAGE!");
  const fetchItems = async () => {
    const startIdx = match.params.page * 10 - 10 + 1;
    const endIdx = match.params.page * 10;
    const data = await fetch(
      "/api/songs/getSongsByRankRanges/" + startIdx + "/" + endIdx,
      {
        method: "GET",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": "true",
          // "Access-Control-Allow-Origin": "http://localhost:5001",
          Accept: "application/json"
        }
      }
    );
    const items = await data.json();
    console.log(items);
    setItems(items);
  };

  return (
    <div>
      <div class="container-fluid">
        <h1 class="pageHeader">America's Top Songs</h1>
        <h2 class="sectionHeader">
          Top Songs: Page {match.params.page} out of {LAST_PAGE}
        </h2>
      </div>
      <div class="container-fluid">
        <h2 class="sectionHeader">
          <form>
            <label>
              Song Name:
              <input type="text" name="name"/>
            </label>
              <Button onClick="searchSong(name)">Submit</Button>
          </form>
        </h2>
      </div>
`      
      {/* <Button onClick={updateDB}>Update MongoDB</Button> */}
      {/* <Button onClick={push(`/songs/` + prevPage(match.params.page))}>
        {" "}
        PREV{" "}
      </Button> */}
      <div style={{ "padding-bottom": "70px" }}>
        {/* <table> */}
        {/* <tr> */}
        {/* <tc> */}
        <Link
          className={
            showPrevButton
              ? "fa float-left h3 font-weight-light text-primary"
              : "fa hidden float-left h3 font-weight-light text-primary"
          }
          to={`/redirectPages/${sourceName}/${prevPage(match.params.page)}`}
        >
          Previous Page ({match.params.page - 1})
        </Link>
        <Link
          className={
            showNextButton
              ? "fa float-right h3 font-weight-light text-primary"
              : "fa hidden float-right h3 font-weight-light text-primary"
          }
          to={`/redirectPages/songs/` + nextPage(match.params.page, LAST_PAGE)}
        >
          Next Page ({parseInt(match.params.page) + 1})
        </Link>
        {/* </tc> */}
        {/* </tr> */}
        {/* </table> */}
        <hr className="lead"></hr>
      </div>
      {items.map(item => (
        <Link to={`/songspage/${item.name}/${item.artist.name}`}>
          <div className="row-mt-1">
            <div className="col-3 col-sm-3 mx-auto mb-2">
              <div
                className="card center-block"
                style={{ width: "20rem", height: "30rem", background: "azure" }}
              >
                <img
                  src={item.bingImageURL}
                  alt="Image not Found"
                  // onError="this.src='../../imgs/alt_singing.jpg'"
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

function prevPage(currPage) {
  if (currPage == 1) {
    return 1;
  }
  return parseInt(currPage) - 1;
}

function nextPage(currPage, lastPage) {
  if (currPage == lastPage) {
    return lastPage;
  }
  return parseInt(currPage) + 1;
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

function searchSong(){

}

export default Songs;
