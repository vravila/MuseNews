const fetch = require("node-fetch");
// const readline = require("readline");
function fillArtists() {
  const data = fetch(
    `https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=10b860590d5168c53783ae9728a9b395&limit=5`
  );
  // console.log(process.env.REACT_APP_LASTFM_API_KEY);
  const items = data.json();
  console.log(items);
}

fillArtists();
