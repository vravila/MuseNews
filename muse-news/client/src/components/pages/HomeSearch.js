import React, { useState, useEffect, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";
import Button from "react-bootstrap/Button";
import queryString from "query-string";

// function RedirectPages({ match }) {
//   {
//     // console.log(match.params.source);
//     // console.log(match.params.page);
//     console.log("hi");
//     console.log(match.params);

//   }
//   return (
//     <div>
//       <h1>Redirection</h1>
//       {/* <Redirect to={"/" + match.params.source + "/" + match.params.page} /> */}
//     </div>
//   );
// }

class HomeSearch extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    console.log(props);
  }

  render() {
    console.log(this.props.match.params.sort);
    const values = queryString.parse(this.props.location.search);
    console.log(this.props.location);
    console.log(values.search);
    console.log(values.search === "");
    console.log(values.source);
    var urlString = "";
    if (values.searchtype == "Search Artist") {
      urlString = "/artists/search/"+encodeURIComponent(encodeURIComponent(values.search))+"/rank/false/none/none/none/none/1"
    } else if (values.searchtype == "Search Song")
    {
      urlString = "/songs/search/"+encodeURIComponent(encodeURIComponent(values.search))+"/rank/none/none/none/none/none/none/none/1"
    }
    else {
      urlString = "/news"
    }
    /*

    if (values.sort === "rank") {
      urlString += "/rank";
    } else if (values.sort === "nameAsc") {
      urlString += "/nameAsc";
    } else if (values.sort === "nameDesc") {
      urlString += "/nameDesc";
    } else {
      console.log("Illegal sort");
      urlString += "/rank";
    }

    console.log(values.ontour);
    if (values.ontour) {
      console.log("on tour");
      urlString += "/true";
    } else {
      console.log("not on tour");
      urlString += "/false";
    }

    console.log(values.minPlayCount);
    console.log(typeof values.minPlayCount);

    if (values.minPlayCount === "") {
      console.log("no min play count");
      urlString += "/none";
    } else {
      console.log("Min Play count " + values.minPlayCount);
      urlString += "/" + values.minPlayCount;
    }

    if (values.maxPlayCount === "") {
      console.log("no max play count");
      urlString += "/none";
    } else {
      console.log("max Play count " + values.maxPlayCount);
      urlString += "/" + values.maxPlayCount;
    }

    /////

    if (values.minListeners === "") {
      console.log("no min Listeners");
      urlString += "/none";
    } else {
      console.log("Min Listeners " + values.minListeners);
      urlString += "/" + values.minListeners;
    }

    if (values.maxListeners === "") {
      console.log("no max Listeners");
      urlString += "/none";
    } else {
      console.log("max Listeners " + values.maxListeners);
      urlString += "/" + values.maxListeners;
    }

    console.log(values.page);
    console.log(values.page === undefined);

    if (
      values.page === "" ||
      values.page === undefined ||
      values.page === null
    ) {
      console.log("no valid p age");
      urlString += "/1";
    } else {
      console.log("Page " + values.page);
      urlString += "/" + values.page;
    }

    console.log(urlString);
*/
    return (
      <div>
        <h1>Redirection</h1>{" "}
        {/* <Redirect to={"/" + match.params.source + "/" + match.params.page} />{" "} */}
        <Redirect to={urlString} />{" "}
      </div>
    );
  }
}

export default HomeSearch;
