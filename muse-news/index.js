const express = require("express"); //ret a funx
const app = express();
const path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////////COMMENT THIS OUT IN PRODUCTION, KEEP IT IN FOR DEVELOPMENT SO THAT CALLS TO THE LOCAL PROXY WORK. RUN SERVER ON localhost:5000 and Front end on anything else
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
//////////////////

const artistsRoutes = require("./routes/artistsRoutes.js");

// app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, "/client/build")));

app.use("/api/artists", artistsRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// PORT: use process obj
const port = process.env.PORT || 5000; //use 3000 if no PORT
// const port = 5000;
// console.log(
//   "ENV: " + process.env.PORT + " TEST: " + process.env.REACT_APP_LASTFM_API_KEY
// );
app.listen(port, () => console.log(`Listening on port ${port}`));
