import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsArticle from './components/NewsArticle';
import Navigation from './components/Navigation';

function NewsPage() {

    return (
        <div className="News">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous"
            />
  
            <Navigation />

            <NewsArticle />
  
        <header className="News-header">
          <p>
            Muse News
          </p>
        </header>
      </div>
    );
  }
  
  export default NewsPage;