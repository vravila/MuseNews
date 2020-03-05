var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '31c483867b244b47965bf54c1e9aa7c1',
  clientSecret: '217bf9c707e745e48cab43245857d471',
});

module.exports = function(id) {
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      findSong(id);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
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
      //console.log("song info: \n\n");

      return songInfo;

    }
  )



}
