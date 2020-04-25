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
  var LAST_PAGE = Math.ceil(DATABASE_LIMIT / ENTRIES_PER_PAGE);
  const [items, setItems] = useState([]);
  const passedInParams = useState({});
  const sourceName = "songs";

  var showNextButton = useState({});
  var showPrevButton = useState({});

  var showPrevButton = true;
  var showNextButton = true;

  if (match.params.page == 1) {
    showPrevButton = false;
  }
  // if (match.params.page == LAST_PAGE) {
  //   showNextButton = false;
  // }

  passedInParams.mode = match.params.mode;
  passedInParams.searchterms = match.params.searchterms;
  passedInParams.sort = match.params.sort;
  passedInParams.artistSearch = match.params.artistSearch;
  passedInParams.minPlayCount = match.params.minPlayCount;
  passedInParams.maxPlayCount = match.params.maxPlayCount;
  passedInParams.minListeners = match.params.minListeners;
  passedInParams.maxListeners = match.params.maxListeners;
  passedInParams.minRank = match.params.minRank;
  passedInParams.maxRank = match.params.maxRank;
  passedInParams.page = match.params.page;

  // printParams(match);
  printPassedInParams(passedInParams);

  console.log("******************************");

  if (passedInParams.searchterms === "none") {
    passedInParams.searchterms = "";
  }

  if (passedInParams.minPlayCount === "none") {
    passedInParams.minPlayCount = "";
  }

  if (passedInParams.maxPlayCount === "none") {
    passedInParams.maxPlayCount = "";
  }

  if (passedInParams.minListeners === "none") {
    passedInParams.minListeners = "";
  }

  if (passedInParams.maxListeners === "none") {
    passedInParams.maxListeners = "";
  }

  if (passedInParams.minRank === "none") {
    passedInParams.minRank = "";
  }

  if (passedInParams.maxRank === "none") {
    passedInParams.maxRank = "";
  }

  if (passedInParams.artistSearch === "none") {
    passedInParams.artistSearch = "";
  }
  // console.log("PAGE!");
  // console.log(match.params.page);
  // console.log("END PAGE!");
  const fetchItems = async () => {
    const startIdx = match.params.page * 10 - 10 + 1;
    const endIdx = match.params.page * 10;

    const apiURL =
      "/api/songs/querySongs/" +
      match.params.searchterms +
      "/" +
      match.params.sort +
      "/" +
      match.params.artistSearch +
      "/" +
      match.params.minPlayCount +
      "/" +
      match.params.maxPlayCount +
      "/" +
      match.params.minListeners +
      "/" +
      match.params.maxListeners +
      "/" +
      match.params.minRank +
      "/" +
      match.params.maxRank +
      "/" +
      match.params.page;
    console.log("URL: " + apiURL);

    const data = await fetch(apiURL, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Origin": "http://localhost:5001",
        Accept: "application/json",
      },
    });
    const items = await data.json();
    console.log(items);
    setItems(items);
  };

  if (items.length < ENTRIES_PER_PAGE) {
    console.log("LAST PAGE");
    showNextButton = false;
    LAST_PAGE = match.params.page;
  } else {
    console.log("NOT LAST PAGE");
  }

  return (
    <div>
      <div class="container-fluid">
        <h1 class="pageHeader">America's Top Songs</h1>
        <h2 class="sectionHeader">Top Songs: Page {match.params.page}</h2>
        <form
          action="/redirectSongsPages"
          className="multi-range-field my-5 pb-5"
        >
          <label className="col-lg-6">
            <h3>Search Songs:</h3>
            <input
              type="text"
              id="search"
              name="search"
              defaultValue={passedInParams.searchterms}
              className="form-control form-control-lg"
            ></input>
          </label>
          <label className="col-lg-6">
            <h3>Sort By:</h3>
            <select
              className="form-control form-control-lg"
              id="sort"
              name="sort"
            >
              <option
                value="rank"
                selected={passedInParams.sort === "rank" ? "selected" : ""}
              >
                Rank
              </option>
              <option
                value="nameAsc"
                selected={passedInParams.sort === "nameAsc" ? "selected" : ""}
              >
                Song Title Ascending
              </option>
              <option
                value="nameDesc"
                selected={passedInParams.sort === "nameDesc" ? "selected" : ""}
              >
                Song Title Descending
              </option>
            </select>
          </label>
          <br></br>
          <label className="col-sm-1">
            {/* <br></br> */}
            <h3>Filters:</h3>
            {/* <br></br> */}
          </label>
          {/* <br></br> */}
          <label className="col-md-2">
            Artists:
            <input
              type="text"
              id="artistSearch"
              name="artistSearch"
              defaultValue={passedInParams.artistSearch}
              // className="col-md-4"
            ></input>
          </label>
          {/* <br></br> */}
          <label className="col-md-2">
            Play Count:
            <input
              type="number"
              id="minPlayCount"
              name="minPlayCount"
              min="0"
              max="25598881"
              defaultValue={passedInParams.minPlayCount}
              //class="form-control form-control-sm"
            ></input>
            to
            <input
              type="number"
              id="maxPlayCount"
              name="maxPlayCount"
              min="0"
              max="25598881"
              defaultValue={passedInParams.maxPlayCount}
              //class="form-control form-control-sm"
            ></input>
          </label>
          {/* <br></br> */}
          <label className="col-md-2">
            Listeners:
            <input
              type="number"
              id="minListeners"
              name="minListeners"
              min="0"
              max="2144166"
              defaultValue={passedInParams.minListeners}
              //class="form-control form-control-sm"
            ></input>
            to
            <input
              type="number"
              id="maxListeners"
              name="maxListeners"
              min="0"
              max="2144166"
              defaultValue={passedInParams.maxListeners}
              //class="form-control form-control-sm"
            ></input>
          </label>
          <br></br>
          <label className="col-md-2">
            Rank:
            <input
              type="number"
              id="minRank"
              name="minRank"
              min="1"
              max="300"
              defaultValue={passedInParams.minRank}
              //class="form-control form-control-sm"
            ></input>
            to
            <input
              type="number"
              id="maxRank"
              name="maxRank"
              min="1"
              max="300"
              defaultValue={passedInParams.maxRank}
              //class="form-control form-control-sm"
            ></input>
          </label>
          <label>
            <input
              type="hidden"
              id="source"
              name="source"
              value="songs"
              class="form-control form-control-sm"
            ></input>
          </label>
          <label className="col-md-3">
            <input
              id="songSubmit"
              type="submit"
              class="btn btn-success form-control form-control-md"
              value="Submit"
            ></input>
          </label>
        </form>
      </div>
      {/* <div class="container-fluid">
        <h2 class="sectionHeader">
          <form>
            <label>
              Song Name:
              <input type="text" name="name" />
            </label>
            <Button onClick="searchSong(name)">Submit</Button>
          </form>
        </h2>
      </div> */}
      `{/* <Button onClick={updateDB}>Update MongoDB</Button> */}
      {/* <Button onClick={push(`/songs/` + prevPage(match.params.page))}>
        {" "}
        PREV{" "}
      </Button> */}
      <div style={{ "padding-bottom": "70px" }}>
        {/* <table> */}
        {/* <tr> */}
        {/* <tc> */}
        <Link
          id="prevButton"
          className={
            showPrevButton
              ? "fa float-left h3 font-weight-light text-primary"
              : "fa hidden float-left h3 font-weight-light text-primary"
          }
          to={`/redirectSongsPages?source=songs&search=${
            passedInParams.searchterms
          }&sort=${passedInParams.sort}&artistSearch=${
            passedInParams.artistSearch
          }&minPlayCount=${passedInParams.minPlayCount}&maxPlayCount=${
            passedInParams.maxPlayCount
          }&minListeners=${passedInParams.minListeners}&maxListeners=${
            passedInParams.maxListeners
          }&minRank=${passedInParams.minRank}&maxRank=${
            passedInParams.maxRank
          }&page=${prevPage(match.params.page)}`}
        >
          Previous Page ({match.params.page - 1})
        </Link>
        <Link
          id="nextButton"
          className={
            showNextButton
              ? "fa float-right h3 font-weight-light text-primary"
              : "fa hidden float-right h3 font-weight-light text-primary"
          }
          to={`/redirectSongsPages?source=songs&search=${
            passedInParams.searchterms
          }&sort=${passedInParams.sort}&artistSearch=${
            passedInParams.artistSearch
          }&minPlayCount=${passedInParams.minPlayCount}&maxPlayCount=${
            passedInParams.maxPlayCount
          }&minListeners=${passedInParams.minListeners}&maxListeners=${
            passedInParams.maxListeners
          }&minRank=${passedInParams.minRank}&maxRank=${
            passedInParams.maxRank
          }&page=${nextPage(match.params.page, LAST_PAGE)}`}
        >
          Next Page ({parseInt(match.params.page) + 1})
        </Link>
        {/* </tc> */}
        {/* </tr> */}
        {/* </table> */}
        <hr className="lead"></hr>
      </div>
      {items.map((item) => (
        <Link
          id="linkToSongsPage"
          to={`/songspage/${item.name}/${item.artist.name}`}
        >
          <div className="row-mt-1">
            <div className="col-3 col-sm-3 mx-auto mb-2">
              <div
                className="card center-block bg-dark text-white"
                style={{ width: "20rem", height: "35rem" }}
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
                  <h3 id="songName" className="card-title text-uppecase">
                    {item.name}
                  </h3>
                  <h5 className="card-title text-uppecase">
                    Rank: {item.rank}
                  </h5>
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

function printPassedInParams(match) {
  console.log("Version 2");
  console.log("Mode: " + match.mode);
  console.log("Search Terms: " + match.searchterms);
  console.log("Sort by : " + match.sort);
  console.log("On tour:" + match.ontour);
  console.log("Min Play Count : " + match.minPlayCount);
  console.log("Max Play Count : " + match.maxPlayCount);
  console.log("Min Listeners : " + match.minListeners);
  console.log("Max Listeners : " + match.maxListeners);
  console.log("Page: " + match.page);
}

// function searchSong(name) {
//   var item = items.get(name);
//   <Link
//     id="linkToSongsPage"
//     to={`/songspage/${item.name}/${item.artist.name}`}
//   ></Link>;
// }

export default Songs;
