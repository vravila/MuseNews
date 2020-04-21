import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";
import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";
import AltSinging from "./../../imgs/alt_singing.jpg";
import Button from "react-bootstrap/Button";
import { push } from "react-router-redux";

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

  // var showPrevButton = true;
  // var showNextButton = true;

  if (match.params.page == 1) {
    showPrevButton = false;
  }
  // if (match.params.page == LAST_PAGE) {
  //   showNextButton = false;
  // }

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

  // console.log("PAGE!");
  // console.log(match.params.page);
  // console.log("END PAGE!");
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

    // const data = await fetch(
    //   "/api/artists/getArtistByRankRanges/" + startIdx + "/" + endIdx,
    //   {
    //     method: "GET",
    //     // mode: "no-cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   }
    // );
    const data = await fetch(apiURL, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const items = await data.json();
    console.log(items);

    // console.log(items.artists.artist);
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
          <label>
            Search Artists:
            <input
              type="text"
              id="search"
              name="search"
              defaultValue={passedInParams.searchterms}
            ></input>
          </label>
          <label>
            Sort By:
            <select id="sort" name="sort">
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
          Filters:<br></br>
          <label>
            Currently on Tour:
            <input
              name="ontour"
              type="checkbox"
              defaultChecked={passedInParams.ontour === "true" ? "true" : ""}
            />
          </label>
          <br></br>
          <label>
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
          <label>
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
            ></input>
          </label>
          <input type="submit" value="Submit"></input>
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
        {/* </tc> */}
        {/* </tr> */}
        {/* </table> */}
        <hr className="lead"></hr>
      </div>
      {items.map(item => (
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
                  // onError="this.src='../../imgs/alt_singing.jpg'"
                  className="card-img-top"
                  style={{ width: "20rem", height: "25rem" }}
                />

                <div className="card-body">
                  {/* <Link to={`/artists/${item.name}`}> */}
                  <h3 className="card-title text-uppecase">{item.name}</h3>
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
  ReactDOM.render(fetchItems, document.getElementById("root"));
}

// function formSubmit() {
//   console.log("submit form");
//   push("/home"); // navigate to some route
// }

// function callAPI() {
//   console.log("Hi");
//   return (
//     <div>
//       <h1>Test</h1>
//     </div>
//   );
// }

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

function printParams(match) {
  console.log("Mode: " + match.params.mode);
  console.log("Search Terms: " + match.params.searchterms);
  console.log("Sort by : " + match.params.sort);
  console.log("On tour:" + match.params.ontour);
  console.log("Min Play Count : " + match.params.minPlayCount);
  console.log("Max Play Count : " + match.params.maxPlayCount);
  console.log("Min Listeners : " + match.params.minListeners);
  console.log("Max Listeners : " + match.params.maxListeners);
  console.log("Page: " + match.params.page);
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
