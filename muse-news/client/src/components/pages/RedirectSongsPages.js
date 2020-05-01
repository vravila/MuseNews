import React, { useState, useEffect, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

class RedirectPages extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    console.log(props);
  }

  render() {
    console.log(this.props.match.params.sort);
    const values = queryString.parse(this.props.location.search);
    console.log(values.search);
    console.log(values.search === "");
    console.log(values.source);

    var urlString = createURLFromProps(values);

    return (
      <div>
        <h1>Redirection</h1> <Redirect to={urlString} />{" "}
      </div>
    );
  }
}

function createURLFromProps(values) {
  var urlString = "/" + values.source;
  if (values.search === "") {
    console.log("search null");
    urlString += "/splash/none";
  } else {
    var encodedSearch = encodeURIComponent(encodeURIComponent(values.search));
    console.log("encoded url is" + encodedSearch);
    urlString += "/search/" + encodedSearch;
  }

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

  if (values.artistSearch === "") {
    console.log("artist search null");
    urlString += "/none";
  } else {
    var encodedSearch = encodeURIComponent(
      encodeURIComponent(values.artistSearch)
    );
    console.log("encoded url is" + encodedSearch);
    urlString += "/" + encodedSearch;
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

  if (values.minRank === "") {
    console.log("no min Listeners");
    urlString += "/none";
  } else {
    console.log("Min Listeners " + values.minRank);
    urlString += "/" + values.minRank;
  }

  if (values.maxRank === "") {
    console.log("no max Listeners");
    urlString += "/none";
  } else {
    console.log("max Listeners " + values.maxRank);
    urlString += "/" + values.maxRank;
  }

  console.log(values.page);
  console.log(values.page === undefined);

  if (values.page === "" || values.page === undefined || values.page === null) {
    console.log("no valid p age");
    urlString += "/1";
  } else {
    console.log("Page " + values.page);
    urlString += "/" + values.page;
  }

  console.log(urlString);

  return urlString;
}

export default RedirectPages;
