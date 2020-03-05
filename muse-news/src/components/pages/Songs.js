import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../App.js';

function Songs() {

    return(
    <div>
        <div class="container-fluid">
            <h1 class="pageHeader">America's Top Charts</h1>
            <h2 class="sectionHeader">Top 5 Songs</h2>
        </div>
        <div class="row pt-3">
            <div class="col-sm-2" align="center">Album</div>
            <div class="col-sm-2">Song Title</div>
            <div class="col-sm-2">Artist</div>
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
            <div class="col-sm-2 my-auto"><a href="/songspage">Blinding Light</a></div>
            <div class="col-sm-2 my-auto"><a href="/artists/:id">The Weekend</a></div>
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
            <div class="col-sm-2 my-auto"><a href="/songspage">Blinding Light</a></div>
            <div class="col-sm-2 my-auto"><a href="/artists/:id">The Weekend</a></div>
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
            <div class="col-sm-2 my-auto"><a href="/songspage">Blinding Light</a></div>
            <div class="col-sm-2 my-auto"><a href="/artists/:id">The Weekend</a></div>
        </div>
    </div>
    );

}

export default Songs;