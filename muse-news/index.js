
function main() {
  var express = require('express');
  var spotifyController = require('./controllers/spotifyController');
  var newsController = require('./controllers/newsController');
  var bioController = require('./controllers/bioController');
  var app = express();

  //set up template engine for ejs
  app.set('view engine', 'ejs');
  //set up the static  files
  //app.use(express.static(__dirname));
  //fire controller, pass the app as parameter so that it is available in the controller
  spotifyController(app);
  newsController(app);
  bioController(app);

  //ocalhost:300/styles.css
}

main();
