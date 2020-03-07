import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../App.js';
import '../controllers/spotifyController.js';

//var spotifyController = require('../controllers/spotifyController.js')

var spotifyController = require('./../controllers/spotifyController');
var request = require('request'); // "Request" library


function Songs() {
  useEffect(()=> {
    getAccessCode();
    getEilish();
    getTame();
    getWeeknd();
  }, [])

  const [accesstoken, setAccessToken] = useState(
    {}
  );

  const [eilish, setEilish] = useState(
    {
    }
  );

  const [eilishName, setEilishName] = useState(
    {
    }
  );

  const [eilishImg, setEilishImg] = useState(
  {

  });

  const [tame, setTame] = useState(
    {
    }
  );

  const [tameName, setTameName] = useState(
    {
    }
  );

  const [tameImg, setTameImg] = useState(
  {

  });

  const [weeknd, setWeeknd] = useState(
    {
    }
  );

  const [weekndName, setWeekndName] = useState(
    {
    }
  );

  const [weekndImg, setWeekndImg] = useState(
  {

  });




const getAccessCode = async () => {
  var client_id = '31c483867b244b47965bf54c1e9aa7c1'; // Your client id
  var client_secret = '217bf9c707e745e48cab43245857d471';

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  //return authOptions;
  await request.post(authOptions, function(error, response, body) {
    setAccessToken(body);
    console.log(body.access_token);
    console.log(accesstoken)

  })


}

const getEilish = async () => {

  console.log(accesstoken)


  await fetch(
      `https://api.spotify.com/v1/tracks/2Fxmhks0bxGSBdJ92vM42m`,
      {
        method: "GET",
        headers: {
          Authorization: 'Bearer ${accesstoken}'
        }
      }).then(response=>response.json()).then(
        data=>  {
          setEilish(data);
          setEilishName(data.artists[0]);
          setEilishImg(data.album.images[0]);
        }
      )
    }

    const getTame = async () => {


      await fetch(
          `https://api.spotify.com/v1/tracks/6K4t31amVTZDgR3sKmwUJJ`,
          {
            method: "GET",
            headers: {
              Authorization: 'Bearer ${accesstoken}'
            }
          }).then(response=>response.json()).then(
            data=>  {
              setTame(data);
              setTameName(data.artists[0]);
              setTameImg(data.album.images[0]);
            }
          )
        }

        const getWeeknd = async () => {


          await fetch(
              `https://api.spotify.com/v1/tracks/0sf12qNH5qcw8qpgymFOqD`,
              {
                method: "GET",
                headers: {
                  Authorization: 'Bearer ${accesstoken}'
                }
              }).then(response=>response.json()).then(
                data=>  {
                  setWeeknd(data);
                  setWeekndName(data.artists[0]);
                  setWeekndImg(data.album.images[0]);
                }
              )
            }
  return (
    <div>
      <div class="container-fluid">
        <h1 class="pageHeader">America's Top Charts</h1>
        <h2 class="sectionHeader">Top 3 Songs</h2>
      </div>
      <div class="row pt-3">
        <div class="col-sm-2" align="center">
          Album
        </div>
        <div class="col-sm-2" align="center">
          Song Title
        </div>
        <div class="col-sm-2" align="center">
          Artist
        </div>
        <div class="col-sm-2" align="center">
          News Links
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-sm-2 my-auto" align="center">
          <div class="d-inline-block">
            <h4 class="p-3">1</h4>
          </div>
          <div class="d-inline-block">
            <img
              src={eilishImg.url}
              class="img-thumbnail"
              alt="albumArt 1"
              style={{ width: 80, height: 80 }}
            ></img>
          </div>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href={`/songspage/${eilishName.name}/${eilish.name}`}>{eilish.name}</a>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href="/artists/Billie%20Eilish">{eilishName.name}</a>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href="/Newsp/Here’s Billie Eilish’s ‘Bad Guy’ in the style of Arctic Monkeys’ Alex Turner">
            See News on {eilishName.name}
          </a>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-sm-2 my-auto" align="center">
          <div class="d-inline-block">
            <h4 class="p-3">2</h4>
          </div>
          <div class="d-inline-block">
            <img
              src={tameImg.url}
              class="img-thumbnail"
              alt="albumArt 1"
              style={{ width: 80, height: 80 }}
            ></img>
          </div>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href={`/songspage/${tameName.name}/${tame.name}`}>{tame.name}</a>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href="/artists/Tame%20Impala">{tameName.name}</a>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href="/Newsp/Tame Impala’s Kevin Parker says he tried to give ‘The Less I Know The Better’ to Mark Ronson">
            See News on {tameName.name}
          </a>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-sm-2 my-auto" align="center">
          <div class="d-inline-block">
            <h4 class="p-3">3</h4>
          </div>
          <div class="d-inline-block">
            <img
              src={weekndImg.url}
              class="img-thumbnail"
              alt="albumArt 1"
              style={{ width: 80, height: 80 }}
            ></img>
          </div>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href={`/songspage/${weekndName.name}/${weeknd.name}`}>{weeknd.name}</a>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href="/artists/The%20Weeknd">{weekndName.name}</a>
        </div>
        <div class="col-sm-2 my-auto" align="center">
          <a href="/Newsp/Watch Behind-the-Scenes Video From The Weeknd’s ‘Blinding Lights’ (EXCLUSIVE)">
            See News on {weekndName.name}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Songs;
