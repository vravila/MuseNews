import React from 'react';
import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NewsContainer from './../NewsContainer';

function News() {

    let {artist} = useParams();
    var terms = artist;
    if(terms === undefined){
        terms = "Billie Eilish";
    }

    return (
        <div className="News">

            <NewsContainer terms={terms} />

        </div>
    );
}
  
export default News;