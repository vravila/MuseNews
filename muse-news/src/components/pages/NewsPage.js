import React from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function updateState(title) {
  var text, author, date, url, artist, song, content;
  if (
    title ===
    "Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner"
  ) {
    //title = 'Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner';
    text = "He likes when you get mardy";
    author = "Matthew Neale";
    date = "3rd March 2020";
    url =
      "https://www.nme.com/news/music/billie-eilish-bad-guy-alex-turner-style-2619882?amp";
    artist = "Billie Eilish";
    song = "bad guy";
    content =
      "The track, taken from Eilish’s acclaimed debut album ‘When We All Fall Asleep Where Do We Go?’, has attracted scores of covers from famous international acts as well as fans imitating them. Now, YouTube user Daniel Fox has reimagined the song in the style of Alex Turner – though it’s more akin to the singer’s crooning solo work than some of his band’s livelier material. Listen to the track, featuring an impressive impression of Turner, below. [...]";
  } else if (
    title ===
    "Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson"
  ) {
    //title = "Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson";
    text = "I don’t know if he knows how successful it is…";
    author = "Patrick Clarke";
    date = "20th January 2020";
    url =
      "https://www.nme.com/news/music/tame-impala-kevin-parker-the-less-i-know-the-better-to-mark-ronson-2599062";
    artist = "Tame Impala";
    song = "The Less I Know The Better";
    content =
      "‘The Less I Know The Better’, which has over 453 million plays on Spotify (more than any other song by Parker’s psych project), was released on Tame Impala’s 2015 album ‘Currents’. In a new interview with GQ Australia, Parker has now revealed that at first he intended to give the song to Ronson — before then having a change of heart. “I gave it to Mark Ronson for his album, but I took it back. I was putting off telling him that I wanted to use it for me,” Parker said. [...]";
  } else {
    //title = "Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)";
    text =
      "What’s not in the Anton Tammi-directed video, or perhaps not obvious, are the following little-known facts";
    author = "Jem Aswad";
    date = "28th February 2020";
    url =
      "https://variety.com/2020/music/news/the-weeknd-blinding-lights-behind-the-scenes-video-exclusive-1203518570/";
    artist = "The Weeknd";
    song = "Blinding Lights";
    content =
      "The Weeknd’s “Blinding Lights” video, from his forthcoming album “After Hours,” is like a mini-action movie, so it’s fitting that there’s a behind-the-scenes video that pulls back the curtain on how the clip was made — and that’s exactly what you get below, complete with a fight scene and car chase. What’s not in the Anton Tammi-directed video, or perhaps not obvious, are the following little-known facts [...]";
  }
  return { text, author, date, url, artist, song, content };
}

function NewsPage() {
  let { title } = useParams();
  var { text, author, date, url, artist, song, content } = updateState(title);
  return (
    <div>
      <body>
        <div style={{ margin: 20 }}>
          <h1>{title}</h1>
          <h3>By: {author}</h3>
          <h3>{date}</h3>
          <p style={{ fontSize: 18 }}>{text}</p>
          <br />
          <p style={{ fontSize: 18 }}>
            {content}
            <a href={url}> Read More. </a>
          </p>
          <p style={{ fontSize: 16 }}>
            See more about {artist} <Link to={`/artists/${artist}`}>here</Link>.
          </p>
          <p style={{ fontSize: 16 }}>
            See more about {song}{" "}
            <Link to={`/songspage/${artist}/${song}`}>here</Link>.
          </p>
        </div>
      </body>
    </div>
  );
}

export default NewsPage;
