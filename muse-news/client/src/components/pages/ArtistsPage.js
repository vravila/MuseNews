import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Billie from "./../../imgs/Billie.jpg";
import Abel from "./../../imgs/the_weeknd.jpg";
import Tame from "./../../imgs/tame_impala.jpg";
import Tweets from "./../../components/Tweets.js";
import ArtistsListOfSongs from "./../ArtistsListOfSongs";
function ArtistsPage({ match }) {
  /*const data = fetch("/api/artists/getArtistTweets").then(weeknd => {
    weeknd.json().then(
      weeknd2 => {
        console.log(weeknd2)
      }
    )
  })*/

  let x = "<h1>Hello</h1>";

  useEffect(() => {
    fetchTweets(match.params.id);
    fetchItem();
    //console.log(match);
  }, []);

  const [tweets, setTweets] = useState({});

  const [item, setItem] = useState({
    bio: {},
    stats: {},
    tags: {},
    similar: {},
    image: {
      size: {},
      text: {}
    }
  });

  const fetchTweets = async name => {
    /*const fetchTweets = await fetch("/api/artists/getArtistTweets").then(ret => {
      ret.json().then(ret2 => {
        console.log(ret2);
      })
    })*/

    const fetchTweets = await fetch("/api/artists/getArtistTweets/" + name);
    const tweets = await fetchTweets.json();
    setTweets(tweets);
  };
  console.log(tweets);

  const [songItem, setSongItem] = useState([]);

  const fetchItem = async () => {
    //console.log(match.params);
    const fetchItem = await fetch(
      "/api/artists/getArtistByName/" + match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    const fetchItemSongs = await fetch(
      "/api/songs/getSongsByAnArtist/" + match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    // const fetchItem = await fetch(
    //   `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${match.params.id}&api_key=10b860590d5168c53783ae9728a9b395&format=json`
    // );
    const item = await fetchItem.json();
    setItem(item);
    console.log(item);

    const songItem = await fetchItemSongs.json();
    setSongItem(songItem);
    console.log("Song Item");
    console.log(songItem);
  };
  console.log(item.name);
  //console.log(item);

  return (
    <div>
      <h1>{item.name}</h1>
      <img
        className="center-block"
        src={item.bingImageURL}
        alt=""
        style={{ width: 500, height: 500 }}
      />
      <br />
      <p className="lead" style={{ fontSize: "18px" }}>
        {escapeHREF(item.bio.content)}
      </p>
      <br></br>
      <p className="lead" style={{ fontSize: "15px", color: "red" }}>
        {getOnTour(item.ontour)}
      </p>
      <p className="lead" style={{ fontSize: "15px" }}>
        <strong>Listeners:</strong> {item.stats.listeners}{" "}
      </p>
      <p className="lead" style={{ fontSize: "15px" }}>
        <strong>Play Count:</strong> {item.stats.playcount}{" "}
      </p>
      <p className="lead" style={{ fontSize: "15px" }}>
        <strong>Tags:</strong> {getTags(item.tags.tag)}
      </p>
      <p className="lead" style={{ fontSize: "15px" }}>
        <strong>Similar Artists:</strong> {getTags(item.similar.artist)}
      </p>
      <h4>Top Songs:</h4>
      {songItem.map(songItem => (
        <div name={`song`}>
          <p className="lead" style={{ fontSize: "15px" }}>
            <Link
              id="linkToSong"
              to={`/songspage/${songItem.name}/${item.name}`}
            >
              {songItem.name}
            </Link>
          </p>
        </div>
      ))}
      <h4>Headlines:</h4>
      <p className="lead" style={{ fontSize: "15px" }}>
        <Link to={`/Newsp/${temporaryNewsLink(item.name)}`}>
          <strong>{temporaryNewsLink(item.name)}</strong>
        </Link>
      </p>
      <div class="Tweets">
        <h2>Recent Tweets</h2>

        <div dangerouslySetInnerHTML={{ __html: tweets[0] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[1] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[2] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[3] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[4] }} />
      </div>
    </div>
    // <div>
    //   <h1>Artists Page!!!</h1>
    //   <h4>Drake</h4>
    //   <h4>The Weeknd</h4>
    //   <h4>Coldplay</h4>
    // </div>
  );
}

function getTags(tags) {
  if (tags) {
    var str = "";
    for (var i = 0; i < tags.length; i++) {
      str += tags[i].name;
      if (i != tags.length - 1) {
        str += ", ";
      }
    }
    return str;
  }
  return "";
}

function getOnTour(ontour) {
  if (ontour == 0) {
    return "Not Currently On Tour";
  }
  return "Currently On Tour";
}

function getTopSongs(name) {
  if (name) {
    //console.log(name);
    if (name === "Billie Eilish") {
      return "bad guy";
    } else if (name === "The Weeknd") {
      return "Blinding Lights";
    } else if (name === "Tame Impala") {
      return "The Less I Know The Better";
    } else {
      return "";
    }
  }
}

function temporaryImages(name) {
  if (name) {
    //console.log(name);
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

function temporaryNewsLink(name) {
  if (name) {
    //console.log(name);
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
  //console.log(typeof content);
  //console.log(content);
  if (content) {
    return content.substring(0, content.indexOf("<a href"));
  }
  //   content.indexOf("k");
  //   return content.substring(0, content.indexOf("<a href"));
  return content;
}

export default ArtistsPage;
