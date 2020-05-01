import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

class RedirectArtistsPages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const values = queryString.parse(this.props.location.search);

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
    urlString += "/splash/none";
  } else {
    var encodedSearch = encodeURIComponent(encodeURIComponent(values.search));
    urlString += "/search/" + encodedSearch;
  }

  if (values.sort === "rank") {
    urlString += "/rank";
  } else if (values.sort === "nameAsc") {
    urlString += "/nameAsc";
  } else if (values.sort === "nameDesc") {
    urlString += "/nameDesc";
  } else {
    urlString += "/rank";
  }

  console.log(values.ontour);
  if (values.ontour) {
    urlString += "/true";
  } else {
    urlString += "/false";
  }

  if (values.minPlayCount === "") {
    urlString += "/none";
  } else {
    urlString += "/" + values.minPlayCount;
  }

  if (values.maxPlayCount === "") {
    urlString += "/none";
  } else {
    urlString += "/" + values.maxPlayCount;
  }

  if (values.minListeners === "") {
    urlString += "/none";
  } else {
    urlString += "/" + values.minListeners;
  }

  if (values.maxListeners === "") {
    urlString += "/none";
  } else {
    urlString += "/" + values.maxListeners;
  }

  if (values.page === "" || values.page === undefined || values.page === null) {
    urlString += "/1";
  } else {
    urlString += "/" + values.page;
  }

  return urlString;
}

export default RedirectArtistsPages;
