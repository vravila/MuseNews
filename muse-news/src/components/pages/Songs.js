import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../App.js';
import '../controllers/spotifyController.js';

var spotifyController = require('../controllers/spotifyController.js')
function Songs() {

  let eilish;
  let tame;
  let weeknd;

  useEffect(() => {
    fetchItems();
  }, []);

  var spotifyController = require('./../controllers/spotifyController');

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    eilish = await spotifyController("2Fxmhks0bxGSBdJ92vM42m");
    tame = await spotifyController("6K4t31amVTZDgR3sKmwUJJ");
    weeknd = await spotifyController("0sf12qNH5qcw8qpgymFOqD");
  };

    return(
    <div>
        <div class="container-fluid">
            <h1 class="pageHeader">America's Top Charts</h1>
            <h2 class="sectionHeader">Top 5 Songs</h2>
        </div>
        <div class="row pt-3">
            <div class="col-sm-2" align="center">Album</div>
            <div class="col-sm-2" align="center">Song Title</div>
            <div class="col-sm-2" align="center">Artist</div>
        </div>
        <div class="row pt-3">
            <div class="col-sm-2 my-auto" align="center">
                <div class="d-inline-block">
                    <h4 class="p-3">1</h4>
                </div>
                <div class="d-inline-block">
                    <img src={require('./../../newsImage.jpg')} class="img-thumbnail" alt="albumArt 1" style={{width:80, height:80}}></img>
                </div>
            </div>
    <div class="col-sm-2 my-auto" align="center"><a href={`/songspage/`}></a></div>
            <div class="col-sm-2 my-auto" align="center"><a href="/artists/Billie%20Eilish">Billie Eilish</a></div>
        </div>
        <div class="row pt-3">
            <div class="col-sm-2 my-auto" align="center">
                <div class="d-inline-block">
                    <h4 class="p-3">2</h4>
                </div>
                <div class="d-inline-block">
                    <img src={require('./../../newsImage.jpg')} class="img-thumbnail" alt="albumArt 1" style={{width:80, height:80}}></img>
                </div>
            </div>
            <div class="col-sm-2 my-auto" align="center"><a href="/songspage/">The Less I Know The Better</a></div>
            <div class="col-sm-2 my-auto" align="center"><a href="/artists/Tame%20Impala">Tame Impala</a></div>
        </div>
        <div class="row pt-3">
            <div class="col-sm-2 my-auto" align="center">
                <div class="d-inline-block">
                    <h4 class="p-3">3</h4>
                </div>
                <div class="d-inline-block">
                    <img src={require('./../../newsImage.jpg')} class="img-thumbnail" alt="albumArt 1" style={{width:80, height:80}}></img>
                </div>
            </div>
            <div class="col-sm-2 my-auto" align="center"><a href="/songspage">Blinding Lights</a></div>
            <div class="col-sm-2 my-auto" align="center"><a href="/artists/The%20Weeknd">The Weekend</a></div>
        </div>
    </div>
    );

}

export default Songs;
