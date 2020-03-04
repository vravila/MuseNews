var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '31c483867b244b47965bf54c1e9aa7c1',
  clientSecret: '217bf9c707e745e48cab43245857d471',
});

module.exports = function(app) {
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      getAlbums();
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
}

//gets an artists' album
function getAlbums() {
  spotifyApi.getArtistAlbums('246dkjvS1zLTtiykXe5h60').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
  );
}
