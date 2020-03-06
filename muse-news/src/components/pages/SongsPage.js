import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../App.js";
import Billie from "../../imgs/Billie.jpg";
import Tame from "../../imgs/Tame.jpg";
import weeknd from "../../imgs/weeknd.jpg";
import { Link } from "react-router-dom";

function SongsPage() {
  let { name, song } = useParams();

  const img = getImage(name);

  useEffect(() => {
    fetchItem();
    // console.log(match);
  }, []);

  const [item, setItem] = useState({
    wiki: {},
    toptags: {}
  });

  const fetchItem = async () => {
    console.log(song);
    const fetchItem = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${name}&track=${song}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
    );
    const item = await fetchItem.json();
    setItem(item.track);
    console.log(item);
  };

  return (
    <div>
      <div class="container-fluid">
        <h1>
          <strong>{song}</strong>
        </h1>
        <h2>
          <strong>By</strong>{" "}
          <Link to={`../../../artists/${name}`}>{name}</Link>
        </h2>
        <img
          src={img}
          className="center-block"
          alt="albumArt 1"
          style={{ width: 500, height: 500 }}
        ></img>
        <p className="lead" style={{ fontSize: "18px" }}>
          {escapeHREF(item.wiki.content)}
        </p>
        <br></br>
        <p className="lead" style={{ fontSize: "15px" }}>
          <strong>Listeners:</strong> {item.listeners}{" "}
        </p>
        <p className="lead" style={{ fontSize: "15px" }}>
          <strong>Play Count:</strong> {item.playcount}{" "}
        </p>
        <p className="lead" style={{ fontSize: "15px" }}>
          <strong>Tags:</strong> {getTags(item.toptags.tag)}
        </p>
        <h4>Headlines:</h4>
        <p className="lead" style={{ fontSize: "15px" }}>
          <Link to={`/Newsp/${temporaryNewsLink(name)}`}>
            <strong>{temporaryNewsLink(name)}</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

function getImage(name) {
  var img = document.createElement("img");

  if (name === "Billie Eilish") {
    return Billie;
  } else if (name === "Tame Impala") {
    return Tame;
  } else if (name === "The Weeknd") {
    return weeknd;
  }
  return "fail";
}

function temporaryNewsLink(name) {
  if (name) {
    console.log(name);
    if (name === "The Weeknd") {
      return "Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)";
    } else if (name === "Billie Eilish") {
      return "Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner";
    } else if (name === "Tame Impala") {
      return "Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson";
    } else {
      return "";
    }
  }
}

function escapeHREF(content) {
  console.log(typeof content);
  console.log(content);
  if (content) {
    return content.substring(0, content.indexOf("<a href"));
  }
  //   content.indexOf("k");
  //   return content.substring(0, content.indexOf("<a href"));
  return content;
}

function getTags(tags) {
  if (tags) {
    var str = "";
    for (var i = 0; i < tags.length; i++) {
      str += tags[i].name;
      if (i !== tags.length - 1) {
        str += ", ";
      }
    }
    return str;
  }
  return "";
}

export default SongsPage;
