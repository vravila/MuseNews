import React from 'react';
import {useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SongArticle from './../SongArticle';
import './../../App.js';
import Billie from "../../imgs/Billie.jpg";
import Tame from "../../imgs/Tame.jpg";
import weeknd from "../../imgs/weeknd.jpg";

function SongsPage() {

    let{name,song,img} = useParams();

    img = getImage(name);

    return(
        <div>

            <div class="container-fluid">
                <h1>{song}</h1>
                <h2>By {name}</h2>
                <img src={img} class="img-thumbnail" alt="albumArt 1" style={{width:80, height:80}}></img>
            </div>

        </div>
    );

}

function getImage(name){
    var img = document.createElement("img");

    if(name == "Billie Eilish"){
        return(Billie);
    }
    else if(name == "Tame Impala"){
        return(Tame);
    }
    else if(name == "The Weeknd"){
        return(weeknd);
    }
    return("fail");

}

export default SongsPage;