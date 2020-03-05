import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../App.js';

function SongsPage() {

    return(
    <div class="container-fluid">
        <h1>Blinding Light</h1>
        <h2>By The Weekend</h2>
        <h2><img src={require('./../../newsImage.jpg')} class="img-rounded" alt="albumArt 1" style={{width:400, height:400}}></img></h2>
      </div>
    );

}

export default SongsPage;