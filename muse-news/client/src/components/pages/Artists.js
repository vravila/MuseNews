import React, { useState, useEffect } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";
import ArtistsCard from "./../ArtistsCard.js";
import ArtistsForm from "./../ArtistsForm.js";

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

    const data = await fetch(apiURL, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const items = await data.json();
    setItems(items);
  };

  if (items.length < ENTRIES_PER_PAGE) {
    showNextButton = false;
    LAST_PAGE = match.params.page;
  }

  return (
    <div>
      <div class="container-fluid">
        <h1 class="pageHeader">America's Top Artists</h1>
        <h2 class="sectionHeader">Top Artists: Page {match.params.page}</h2>
        <ArtistsForm passedInParams={passedInParams}></ArtistsForm>
      </div>
      <div style={{ "padding-bottom": "70px" }}>
        <Link
          id="prevButton"
          className={
            showPrevButton
              ? "fa float-left h3 font-weight-light text-primary"
              : "fa hidden float-left h3 font-weight-light text-primary"
          }
          to={`/redirectArtistsPages?source=artists&search=${
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
          to={`/redirectArtistsPages?source=artists&search=${
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
        <ArtistsCard item={item}></ArtistsCard>
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

export default Artists;
