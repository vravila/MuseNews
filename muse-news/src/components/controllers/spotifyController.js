var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '31c483867b244b47965bf54c1e9aa7c1',
  clientSecret: '217bf9c707e745e48cab43245857d471',
});

module.exports = function(id) {
  var request = require('request'); // "Request" library

  var client_id = '31c483867b244b47965bf54c1e9aa7c1'; // Your client id
  var client_secret = '217bf9c707e745e48cab43245857d471'; // Your secret

  // your application requests authorization
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

  request.post(authOptions, function(error, response, body) {

    //console.log(response);
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;

      spotifyApi.setAccessToken(token);
      findSong(id);
    }
  });


}

//gets an artists' album
function getArtist() {
  spotifyApi.getArtistAlbums('246dkjvS1zLTtiykXe5h60').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
  );
}


function findSong(id) {

  var songInfo = new Map();
  spotifyApi.getTrack(id).then(
    function(data) {
      //console.log(data);

      //console.log(data.body.album.images[0].url);

      songInfo.set("name", data.body.name);
      songInfo.set("artist", data.body.artists[0].name);
      songInfo.set("img", data.body.album.images[0].url);
      //console.log(songInfo);

      return songInfo;

    }
  )



}