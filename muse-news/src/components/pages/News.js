import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsGrid from './../NewsGrid';
import Article from './../Article';


function News() {

    // const NewsAPI = require('newsapi');
    // const newsapi = new NewsAPI('29f29f05d76f4b6e935185addf68431a');
    // // To query /v2/top-headlines
    // // All options passed to topHeadlines are optional, but you need to include at least one of them
    // newsapi.v2.topHeadlines({
    // sources: 'bbc-news,the-verge',
    // q: 'bitcoin',
    // category: 'business',
    // language: 'en',
    // country: 'us'
    // }).then(response => {
    // console.log(response);
    // /*
    //     {
    //     status: "ok",
    //     articles: [...]
    //     }
    // */
    // });

    return (
        <div className="News">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous"
            />

            <NewsGrid />
      </div>
    );
}
  
export default News;