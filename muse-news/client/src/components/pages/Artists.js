import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";

function Artists({ match }) {
  useEffect(() => {
    fetchItems();
  }, []);

  const DEVELOPMENT_SERVER = "http://localhost:5000";

  const ENTRIES_PER_PAGE = 10;
  const DATABASE_LIMIT = 200;
  var LAST_PAGE = Math.ceil(DATABASE_LIMIT / ENTRIES_PER_PAGE);
  const [items, setItems] = useState([]);
  const passedInParams = useState({});
  const sourceName = "artists";

  var showNextButton = useState({});
  var showPrevButton = useState({});
  showPrevButton = true;
  showNextButton = true;

  if (match.params.page == 1) {
    showPrevButton = false;
  }

  passedInParams.mode = passedInParams.mode = match.params.mode;
  passedInParams.searchterms = match.params.searchterms;
  passedInParams.sort = match.params.sort;
  passedInParams.ontour = match.params.ontour;
  passedInParams.minPlayCount = match.params.minPlayCount;
  passedInParams.maxPlayCount = match.params.maxPlayCount;
  passedInParams.minListeners = match.params.minListeners;
  passedInParams.maxListeners = match.params.maxListeners;
  passedInParams.page = match.params.page;

  // printParams(match);
  printPassedInParams(passedInParams);

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

  const fetchItems = async () => {
    const startIdx = match.params.page * 10 - 10 + 1;
    const endIdx = match.params.page * 10;

    const apiURL =
      "/api/artists/queryArtists/" +
      match.params.searchterms +
      "/" +
      match.params.sort +
      "/" +
      match.params.ontour +
      "/" +
      match.params.minPlayCount +
      "/" +
      match.params.maxPlayCount +
      "/" +
      match.params.minListeners +
      "/" +
      match.params.maxListeners +
      "/" +
      match.params.page;
    console.log("URL: " + apiURL);

    const data = await fetch(apiURL, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
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
        <h1 class="pageHeader">America's Top Artists</h1>
        <h2 class="sectionHeader">Top Artists: Page {match.params.page}</h2>
        <form action="/redirectPages" className="multi-range-field my-5 pb-5">
          <label id="searchLabel" className="col-lg-6">
            <h3>Search Artists:</h3>
            <input
              type="text"
              id="search"
              name="search"
              defaultValue={passedInParams.searchterms}
              className="form-control form-control-lg"
            ></input>
          </label>
          <label id="sortLabel" className="col-lg-6">
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
                Name Ascending
              </option>
              <option
                value="nameDesc"
                selected={passedInParams.sort === "nameDesc" ? "selected" : ""}
              >
                Name Descending
              </option>
            </select>
          </label>
          <br></br>
          <label className="col-sm-1">
            <h3>Filters:</h3>
          </label>
          <label id="ontourLabel" className="col-md-2">
            Currently on Tour: <t></t>
            <input
              id="ontour"
              name="ontour"
              type="checkbox"
              defaultChecked={passedInParams.ontour === "true" ? "true" : ""}
            />
          </label>
          <br></br>
          <label id="playCountLabel" className="col-md-3">
            Play Count:
            <input
              type="number"
              id="minPlayCount"
              name="minPlayCount"
              min="0"
              max="100882739"
              defaultValue={passedInParams.minPlayCount}
            ></input>
            to
            <input
              type="number"
              id="maxPlayCount"
              name="maxPlayCount"
              min="0"
              max="100882739"
              defaultValue={passedInParams.maxPlayCount}
            ></input>
          </label>
          <br></br>
          <label id="listenersLabel" className="col-md-3">
            Listeners:
            <input
              type="number"
              id="minListeners"
              name="minListeners"
              min="0"
              max="1473588"
              defaultValue={passedInParams.minListeners}
            ></input>
            to
            <input
              type="number"
              id="maxListeners"
              name="maxListeners"
              min="0"
              max="1473588"
              defaultValue={passedInParams.maxListeners}
            ></input>
          </label>
          <label>
            <input
              type="hidden"
              id="source"
              name="source"
              value="artists"
              class="form-control form-control-sm"
            ></input>
          </label>
          <br></br>
          <label id="artistSubmitLabel" className="col-md-3">
            <input
              id="artistSubmit"
              type="submit"
              class="btn btn-success form-control form-control-md"
              value="Submit"
            ></input>
          </label>
        </form>
      </div>
      <div style={{ "padding-bottom": "70px" }}>
        <Link
          id="prevButton"
          className={
            showPrevButton
              ? "fa float-left h3 font-weight-light text-primary"
              : "fa hidden float-left h3 font-weight-light text-primary"
          }
          to={`/redirectPages?source=artists&search=${
            passedInParams.searchterms
          }&sort=${passedInParams.sort}&ontour=${
            passedInParams.ontour === "true" ? "on" : ""
          }&minPlayCount=${passedInParams.minPlayCount}&maxPlayCount=${
            passedInParams.maxPlayCount
          }&minListeners=${passedInParams.minListeners}&maxListeners=${
            passedInParams.maxListeners
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
          to={`/redirectPages?source=artists&search=${
            passedInParams.searchterms
          }&sort=${passedInParams.sort}&ontour=${
            passedInParams.ontour === "true" ? "on" : ""
          }&minPlayCount=${passedInParams.minPlayCount}&maxPlayCount=${
            passedInParams.maxPlayCount
          }&minListeners=${passedInParams.minListeners}&maxListeners=${
            passedInParams.maxListeners
          }&page=${nextPage(match.params.page, LAST_PAGE)}`}
        >
          Next Page ({parseInt(match.params.page) + 1})
        </Link>
        <hr className="lead"></hr>
      </div>
      {items.map((item) => (
        <Link id="linkToArtistsPage" to={`/artistspage/${item.name}`}>
          <div className="row-mt-1">
            <div className="col-3 col-sm-3 mx-auto mb-2">
              <div
                className="card center-block bg-dark text-white"
                style={{ width: "20rem", height: "35rem" }}
              >
                <img
                  src={item.bingImageURL}
                  alt="Image not Found"
                  className="card-img-top"
                  style={{ width: "20rem", height: "25rem" }}
                />

                <div className="card-body">
                  <h3 id="artistName" className="card-title text-uppecase">
                    {item.name}
                  </h3>
                  <h5 className="card-title text-uppecase">
                    Rank: {item.rank}
                  </h5>
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

export default Artists;
