import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";
import Button from "react-bootstrap/Button";

function RedirectPages({ match }) {
  {
    console.log(match.params.source);
    console.log(match.params.page);
  }
  return (
    <div>
      <h1>Redirection</h1>
      <Redirect to={"/" + match.params.source + "/" + match.params.page} />
    </div>
  );
}

export default RedirectPages;
