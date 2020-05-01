import React, { useState, useEffect, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

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
      urlString =
        "/artists/search/" +
        encodeURIComponent(encodeURIComponent(values.search)) +
        "/rank/false/none/none/none/none/1";
    } else if (values.searchtype == "Search Song") {
      urlString =
        "/songs/search/" +
        encodeURIComponent(encodeURIComponent(values.search)) +
        "/rank/none/none/none/none/none/none/none/1";
    } else {
      urlString =
        "/Newsa/" + encodeURIComponent(encodeURIComponent(values.search));
    }

    return (
      <div>
        <h1>Redirection</h1> <Redirect to={urlString} />{" "}
      </div>
    );
  }
}

export default HomeSearch;
