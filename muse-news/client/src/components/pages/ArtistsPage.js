import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ArtistsPage({ match }) {
  useEffect(() => {
    fetchTweets(match.params.id);
    fetchItem();
  }, []);

  const [tweets, setTweets] = useState({});
  const [songItem, setSongItem] = useState([]);

  const [item, setItem] = useState({
    bio: {},
    stats: {},
    tags: {},
    similar: {},
    image: {
      size: {},
      text: {},
    },
  });
  //--------------------------------------------
  const fetchTweets = async (name) => {
    const fetchTweets = await fetch("/api/artists/getArtistTweets/" + name);
    const tweets = await fetchTweets.json();
    setTweets(tweets);
  };

  const fetchItem = async () => {
    const fetchItem = await fetch(
      "/api/artists/getArtistByName/" + match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const fetchItemSongs = await fetch(
      "/api/songs/getSongsByAnArtist/" + match.params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const item = await fetchItem.json();
    setItem(item);

    const songItem = await fetchItemSongs.json();
    setSongItem(songItem);
  };

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
      {songItem.map((songItem) => (
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
      <h4>
        See the latest headlines about {item.name}{" "}
        <Link to={`/Newsa/${item.name}`}>here</Link>
      </h4>
      <div class="Tweets">
        <h2>Recent Tweets</h2>

        <div dangerouslySetInnerHTML={{ __html: tweets[0] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[1] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[2] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[3] }} />
        <div dangerouslySetInnerHTML={{ __html: tweets[4] }} />
      </div>
    </div>
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

function escapeHREF(content) {
  if (content) {
    return content.substring(0, content.indexOf("<a href"));
  }
  return content;
}

export default ArtistsPage;
