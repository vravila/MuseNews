import React from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from './../Article.js';
import NewsImg from "./../../imgs/newsImage.jpg";


function NewsPage() {
  let { terms,index } = useParams();
  return (
    <div>
      <Article index={index} terms={terms}/>
      {/*
      <body>
        <div style={{ margin: 20 }}>
          <h1>{title}</h1>
          <h3>By: {author}</h3>
          <h3>{date}</h3>
          <p style={{ fontSize: 18 }}>
            <u>{text}</u>
          </p>
          <img
            className="center-block"
            src={NewsImg}
            alt=""
            style={{ width: 500, height: 500 }}
          />
          <br />
          <p className="lead" style={{ fontSize: 16 }}>
            {content}
            <a href={url}> Read More. </a>
          </p>
          <p style={{ fontSize: 14 }}>
            See more about {artist} <Link to={`/artists/${artist}`}>here</Link>.
          </p>
          <p style={{ fontSize: 14 }}>
            See more about {song}{" "}
            <Link to={`/songspage/${artist}/${song}`}>here</Link>.
          </p>
        </div>
      </body>
      */}
    </div>
  );
}

export default NewsPage;
