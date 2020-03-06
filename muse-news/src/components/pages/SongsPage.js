import React from 'react';
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SongArticle from './../SongArticle';
import './../../App.js';

function SongsPage() {

    let{name,song,img} = useParams();

    return(
        <div>

        <h1>{name}</h1>
        <SongArticle name={name} song={song} img={img}/>

        </div>
    );

}

export default SongsPage;