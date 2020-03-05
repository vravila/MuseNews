import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsGrid from './components/NewsGrid';
import Navigation from './components/Navigation';

function NewsModel() {

    return (
        <div className="News">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossorigin="anonymous"
            />
  
            <Navigation />

            <NewsGrid />
  
        <header className="News-header">
          <p>
            Muse News
          </p>
        </header>
      </div>
    );
  }
  
  export default NewsModel;