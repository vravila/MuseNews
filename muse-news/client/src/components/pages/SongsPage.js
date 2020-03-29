import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../App.js";
import Billie from "../../imgs/Billie.jpg";
import Tame from "../../imgs/Tame.jpg";
import weeknd from "../../imgs/weeknd.jpg";
import { Link } from "react-router-dom";

function SongsPage() {
  let { song, artist } = useParams();

  const img = getImage(artist);
  var artistLink = "/wtf";

  let track = song + " " + artist;

  useEffect(() => {
    fetchTweets(track);
    fetchItem();
    // console.log(match);
  }, []);

  const[tweets, setTweets] = useState(
    {}
  );

  const [item, setItem] = useState({
    wiki: {},
    toptags: {}
  });

  const [linkItem, setLinkItem] = useState({});

  const fetchTweets = async (name) => {
    /*const fetchTweets = await fetch("/api/artists/getArtistTweets").then(ret => {
      ret.json().then(ret2 => {
        console.log(ret2);
      })
    })*/

    const fetchTweets = await fetch("/api/artists/getArtistTweets/"+name)
    const tweets = await fetchTweets.json();
    setTweets(tweets);

  }
  console.log(tweets);
  const fetchItem = async () => {
    console.log(song);
    console.log(artist);
    // const fetchItem = await fetch(
    //   `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${name}&track=${song}&api_key=10b860590d5168c53783ae9728a9b395&format=json`
    // );
    // const item = await fetchItem.json();
    // setItem(item.track);
    // console.log(item);

    const fetchItem = await fetch(
      "/api/songs/getSongByNameAndArtist/" + song + "/" + artist,
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
    console.log("Done with fetch");
    console.log(item);

    artistLink = await getArtistLink(artist);

    const artistLinkItem = await fetch(
      "/api/artists/getArtistByName/" + artist,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    const linkItem = await artistLinkItem.json();
    setLinkItem(linkItem);
    console.log("LinkItem");
    console.log(linkItem);
    if (linkItem == null) {
      console.log("Artists DOES NOT Exist");
      artistLink = "/artistDNE";
    } else {
      console.log("Artists Exists");
      artistLink = "/artistspage/" + artist;
    }

    // if (artistLinkItem == null) {
    //   console.log("Artists DOES NOT Exist");
    //   artistLink = "/artistDNE";
    // } else {
    //   console.log("Artists Exists");
    //   artistLink = "/artistspage/" + artist;
    // }
    // console.log(artistLink);
  };

  return (
    <div>
      <div class="container-fluid">
        <h1>
          <strong>{song}</strong>
        </h1>
        <h2 id="borderArtistLink">
          <strong>By</strong>{" "}
          {/* <Link to={`../../../artistspage/${artist}`}>{artist}</Link> */}
          {/* <a href=>V2 {artist} ]]]</a> */}
          <Link id="artistLink" to={link(linkItem, artist)}>
            {artist}
          </Link>
          {/* {getArtistLink(artist)} */}
        </h2>
        <h2>Rank on Charts: {item.rank}</h2>
        <img
          src={item.bingImageURL}
          className="center-block"
          alt="No Image for Song Art"
          style={{ width: 500, height: 500 }}
        ></img>
        <p className="lead" style={{ fontSize: "18px" }}>
          {/* {item.wiki.content} */}
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
          <Link to={`/Newsp/${temporaryNewsLink(artist)}`}>
            <strong>{temporaryNewsLink(artist)}</strong>
          </Link>
        </p>
        <div class = "Tweets">
          <h2>Recent Tweets</h2>

          <div dangerouslySetInnerHTML={{ __html: tweets[0] }} />
          <div dangerouslySetInnerHTML={{ __html: tweets[1] }} />
          <div dangerouslySetInnerHTML={{ __html: tweets[2] }} />
          <div dangerouslySetInnerHTML={{ __html: tweets[3] }} />
          <div dangerouslySetInnerHTML={{ __html: tweets[4] }} />
        </div>
      </div>
    </div>
  );
}

function link(linkItem, name) {
  if (linkItem == null) {
    console.log("Artists DOES NOT Exist");
    return "/artistDNE";
  }
  console.log("Artists Exists");
  var retstr = "../../../artistspage/" + name;
  console.log(retstr);
  return retstr;
}

async function getArtistLink(name) {
  const fetchItem = await fetch("/api/artists/getArtistByName/" + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  if (fetchItem == null) {
    console.log("Artists DOES NOT Exist");
    return "/artistDNE";
  }
  console.log("Artists Exists");
  var retstr = "../../../artistspage/" + name;
  console.log(retstr);
  return retstr;
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
  if (content === "No Wiki for this Song!") {
    return content;
  }
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
