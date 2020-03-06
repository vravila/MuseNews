import React from 'react';
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SongArticle from './../SongArticle';
import './../../App.js';

function SongsPage() {

    let{name,song,img} = useParams();

    return(
        <div>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />

        <SongArticle name={name} song={song} img={img}/>

        </div>
    );

}

export default SongsPage;