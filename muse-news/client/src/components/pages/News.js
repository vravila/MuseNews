import React from 'react';
import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NewsContainer from './../NewsContainer';

function News() {

    return (
        <div className="News">

            <NewsContainer />

        </div>
    );
}
  
export default News;