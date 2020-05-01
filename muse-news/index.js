const express = require("express"); //returns a function
const app = express();
const path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////////COMMENT THIS OUT IN PRODUCTION, KEEP IT IN FOR DEVELOPMENT SO THAT CALLS TO THE LOCAL PROXY WORK. RUN SERVER ON localhost:5000 and Front end on anything else
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//////////////////

const artistsRoutes = require("./routes/artistsRoutes.js");
const songsRoutes = require("./routes/songsRoutes.js");
const newsRoutes = require("./routes/newsRoutes.js");

app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api/artists", artistsRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/news", newsRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// PORT: use process obj
const port = process.env.PORT || 5000; //use 3000 if no PORT
var server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
