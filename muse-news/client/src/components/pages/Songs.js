import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongsCard from "./../SongsCard.js";
import SongsForm from "./../SongsForm.js";

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

  var showNextButton = useState({});
  var showPrevButton = useState({});

  var showPrevButton = true;
  var showNextButton = true;

  if (match.params.page == 1) {
    showPrevButton = false;
  }

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

  //printPassedInParams(passedInParams);

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

  const fetchItems = async () => {
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

    const data = await fetch(apiURL, {
      method: "GET",
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
        <h1 class="pageHeader">America's Top Songs</h1>
        <h2 class="sectionHeader">Top Songs: Page {match.params.page}</h2>
        <SongsForm passedInParams={passedInParams}></SongsForm>
      </div>
      <div style={{ "padding-bottom": "70px" }}>
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
        <hr className="lead"></hr>
      </div>
      {items.map((item) => (
        <SongsCard item={item}></SongsCard>
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

export default Songs;
