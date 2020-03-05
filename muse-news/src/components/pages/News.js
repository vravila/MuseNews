import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsGrid from './../NewsGrid';


function News() {

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